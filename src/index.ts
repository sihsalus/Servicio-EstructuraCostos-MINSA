import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from '@/config/db';
import { syncronizeDataTables } from '@/config/synchronize';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const SV_HOST = process.env.SV_HOST || 'http://localhost';
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor EC MINSA funcionando');
} );


const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("====================================================");
    console.log("¡Conexión exitosa a la Base de Datos de Costos MINSA!");
    console.log("====================================================");

    console.log("Sincronizando modelos con PostgreSQL...");
    await syncronizeDataTables();

    app.listen(PORT, () => {
      console.log(`Server is running on ${SV_HOST}:${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp();