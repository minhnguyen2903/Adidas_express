const { Sequelize } = require("sequelize");


const sequelize = new Sequelize("mydb01", "admin", "zxd9s7as", {
    host: "mysql-57321-0.cloudclusters.net",
    port: "11677",
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