import axios from 'axios';
import * as cheerio from 'cheerio';
import {FiscalYear } from '@/interfaces/FiscalYearInterface';
import CustomError from '@/utils/CustomError';
class ScrapingService {
    public static URL_SUNAT_UIT = "https://www.sunat.gob.pe/indicestasas/uit.html";
    //asumo que SUNAT se renderiza desde sv XD
    static async scrapeNextSunatIndexUIT()  { 
        try{
           const { data : html} = await axios.get(this.URL_SUNAT_UIT); 
           const $ = cheerio.load(html);

           const rows = $('table tbody tr');
           const newFiscalYear : FiscalYear ={
            fiscalYear:0,
            uitValue:0,
            legalBase:""
           };
           
           rows.each((i,row) =>{
                if(i == 1) {
                    $(row).find('th, td').each((j,cell) =>{
                        const cellText = $(cell).text().trim();
                        switch(j){
                            case 0:
                                newFiscalYear.fiscalYear = parseInt(cellText,10);
                                break;
                            case 1:
                                const cleanValue = cellText.replace(/[^0-9]/g, '');
                                newFiscalYear.uitValue = parseInt(cleanValue, 10);
                                break;
                            case 2:
                                newFiscalYear.legalBase = $(cell).text().trim();
                                break;
                        }
                    });

                    return false;
                }
           })

           if(newFiscalYear.fiscalYear == 0){
             throw new CustomError("No se pudo extraer el formato esperado de la tabla de SUNAT.", 502);
           }

           return newFiscalYear;
        }catch(error){
            if (error instanceof CustomError) throw error;

            throw new CustomError(
                `Error al realizar web scraping en SUNAT: ${error instanceof Error ? error.message : 'Error desconocido'}`, 
                500
            );
        }

    }
}

export default ScrapingService;