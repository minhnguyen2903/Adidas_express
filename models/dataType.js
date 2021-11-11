const db = require("../models/database");
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
        unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birth: DataTypes.DATEONLY,
    phoneNumber: DataTypes.STRING,
    location: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

const Province = db.sequelize.define("province", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    _name: DataTypes.STRING,
    _code: DataTypes.STRING,
});

const District = db.sequelize.define("district", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    _name: DataTypes.STRING,
    _prefix: DataTypes.STRING,
    _province_id: DataTypes.INTEGER,
});

const Ward = db.sequelize.define("ward", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    _name: DataTypes.STRING,
    _prefix: DataTypes.STRING,
    _province_id: DataTypes.INTEGER,
    _district_id: DataTypes.INTEGER,
});

const Orders = db.sequelize.define("orders", {
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    location: DataTypes.STRING,
});

const WishLists = db.sequelize.define("wishlists", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: "email",
        }
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Products,
            key: "productId"
        }
    }
})

const Carts = db.sequelize.define("carts", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: "email",
        }
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Products,
            key: "productId"
        }
    },
    number: DataTypes.INTEGER,
    size: DataTypes.STRING
})

const OrderProducts = db.sequelize.define("orderProducts", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Orders,
            key: "orderId",
        }
    },
    unit: DataTypes.INTEGER,
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = {
    Products: Products,
    Users: Users,
    Province: Province,
    District: District,
    Ward: Ward,
    WishLists: WishLists,
    Carts: Carts,
    Orders: Orders,
    OrderProducts: OrderProducts,
};
