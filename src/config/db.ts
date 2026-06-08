import { Sequelize,Dialect } from "sequelize";

const dbName = process.env.DB_NAME || "cost_structure_db";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "5432";
const dbDialect = (process.env.DB_DIALECT || "postgres") as Dialect;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: dbDialect,
    logging: false, 
});

export default sequelize;