const db = require("../models/database")
const { DataTypes } = require("sequelize");

const Products = db.sequelize.define("products", {
    productId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    units: DataTypes.INTEGER,
    color: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    category: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

const Users = db.sequelize.define("users", {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birth: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
})

module.exports = {
    Products: Products,
    Users: Users
};