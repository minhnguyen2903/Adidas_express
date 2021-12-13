const { Sequelize } = require("sequelize");


const sequelize = new Sequelize("mydb01", "admin", "wzKDX8Y5", {
    host: "mysql-61911-0.cloudclusters.net",
    port: "16632",
    dialect: "mysql",
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const DBConnectTesting = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
DBConnectTesting();


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    connectTesting: DBConnectTesting
}