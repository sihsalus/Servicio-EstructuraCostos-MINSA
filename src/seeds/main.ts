import sequelize from "../config/db";
import { runAllSeeders } from "./run"; 
const executeStandaloneSeeder = async () => {
    try {
        
        await sequelize.authenticate();
        console.log("Conexión establecida con PostgreSQL en Docker.");

        await runAllSeeders();
        await sequelize.close();
        console.log("Conexión de Base de Datos cerrada. Proceso terminado.");
        process.exit(0);
    } catch (error) {
        console.error("Falló la ejecución del comando de seeding:", error);
        process.exit(1);
    }
};

executeStandaloneSeeder();