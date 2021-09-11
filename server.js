const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");
const fs = require("fs");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fileUpload = require("express-fileupload");
const db = require("./models/database");
const dataType = require("./models/dataType");
const Filter = require("./services/filter");
const { QueryTypes, DataTypes, Op } = require("sequelize");
const PORT = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static("upload"));

("use strict");

db.sequelize;
db.connectTesting;

app.get("/", (req, res) => {
    console.log(process.env.CLIENT_REDIRECT);
    res.json({ message: "Welcome to server" });
});

app.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        console.log("------------1-----------------");

        const oldUser = await dataType.Users.findOne({
            where: { email: email },
        });
        console.log("------------2-----------------", encryptedPassword);

        if (!oldUser) {
            return res.status(400).json({ message: "Invalid User" });
        } else {
            const validPassword = await bcrypt.compare(
                password,
                oldUser.password
            );
            console.log(validPassword);
            if (validPassword) {
                const token = jwt.sign(
                    { email: email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                console.log("------------4-----------------");
                res.status(200).json(token);
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        }
        console.log("------------3-----------------");
    } catch (err) {
        throw err;
    }
});

app.post("/register", async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { firstName, lastName, birth, email, password } = req.body;
        // Validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await dataType.Users.findOne({
            where: { email: email },
        });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);
        // Create user in our database
        const user = await dataType.Users.create({
            firstName,
            lastName,
            birth,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            createAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
        });
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        // return new user
        res.status(201).json(user.token);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

app.get("/api/search", async (req, res) => {
    try {
        const queryKey = Filter(req.query);
        const data = await dataType.Products.findAll({
            where: {
                title: {
                    [Op.like]: queryKey.title,
                },
                subtitle: {
                    [Op.like]: queryKey.subtitle,
                },
                category: {
                    [Op.like]: queryKey.category,
                },
                color: {
                    [Op.like]: queryKey.color,
                },
            },
        });
        data.forEach((object) => {
            object.image = `${process.env.EXPRESS_PORT}/${object.image}`;
        });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/all-products", async (req, res) => {
    try {
        const data = await db.sequelize.query("SELECT * FROM `products`", {
            type: QueryTypes.SELECT,
        });
        data.forEach((object) => {
            object.image = `${process.env.EXPRESS_PORT}/${object.image}`;
            const date = new Date(object.createdAt);
            if (Date.now() - date.getTime() < 3418794449) {
                object.badgeText = "New";
            }
        });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/products", async (req, res) => {
    try {
        let offset = req.query.page;
        let limit = req.query.limit;
        if (offset === undefined || parseInt(offset) === NaN) {
            offset = 1;
        }
        if (limit === undefined || parseInt(limit) === NaN) {
            limit = 10;
        }
        const data = await db.sequelize.query(
            `SELECT * FROM products limit ${parseInt(limit)} offset ${
                10 * (parseInt(offset) - 1)
            }`,
            { type: QueryTypes.SELECT }
        );
        data.forEach((object) => {
            object.image = `${process.env.EXPRESS_PORT}/${object.image}`;
            const date = new Date(object.createdAt);
            if (Date.now() - date.getTime() < 3418794449) {
                object.badgeText = "New";
            }
        });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/detail/:productId", async (req, res) => {
    try {
        const data = await dataType.Products.findAll({
            where: { productId: req.params.productId },
        });
        data.forEach((object) => {
            object.image = `${process.env.EXPRESS_PORT}/${object.image}`;
            const date = new Date(object.createdAt);
            if (Date.now() - date.getTime() < 3418794449) {
                object.badgeText = "New";
            }
        });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port:`, process.env.PORT || PORT);
});
