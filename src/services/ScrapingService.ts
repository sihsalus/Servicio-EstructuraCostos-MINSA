import axios from 'axios';
import * as cheerio from 'cheerio';
import CustomError from '@/utils/CustomError';
import CostStructureConst from '@/const/CostStructureConst';
import { CreateFiscalYearInput } from '@/interfaces/FiscalYearInterface';
class ScrapingService {
    //asumo que SUNAT se renderiza desde sv XD
    static async scrapeNextSunatIndexUIT()  { 
        try{
           const { data : html} = await axios.get(CostStructureConst.SUNAT_ABOUT.URL_SUNAT_UIT); 
           const $ = cheerio.load(html);

           const rows = $('table tbody tr');
           const newFiscalYear : CreateFiscalYearInput ={
            fiscalYear:0,
            uitValue:0,
            legalBase:""
           };
           
           rows.each((i,row) =>{
                if(i == 1) {
                    $(row).find('th, td').each((j,cell) =>{
                        const cellText = $(cell).text().trim();
                        this.readDataTableSunatIndexUIT(newFiscalYear,cellText,j);
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

    static async scrapeSunatIndexUITs(){
        try{
           const { data : html} = await axios.get(CostStructureConst.SUNAT_ABOUT.URL_SUNAT_UIT); 
           const $ = cheerio.load(html);

           const rows = $('table tbody tr');
           const dataTable : CreateFiscalYearInput[] = []
           let reachedMinYear = false;
           rows.each((i,row) => {
                if(i > 0 && !reachedMinYear){
                    const fiscalYear : CreateFiscalYearInput = {
                        fiscalYear:0,
                        uitValue:0,
                        legalBase:""
                    }; 

                    $(row).find('th, td').each((j,cell) =>{
                        const cellText = $(cell).text().trim();
                        
                        if(cellText === String(CostStructureConst.SUNAT_ABOUT.MIN_YEAR_UIT)){
                            reachedMinYear = true
                        }

                        ScrapingService.readDataTableSunatIndexUIT(fiscalYear,cellText,j);
                    });
                    
                    if(fiscalYear.fiscalYear > 0){
                        dataTable.push(fiscalYear);
                    }

                    if(reachedMinYear) {
                        return false;
                    }
                }
           });

           return dataTable;
        
        }catch(error){
            if (error instanceof CustomError) throw error;

            throw new CustomError(
                `Error al realizar web scraping en SUNAT: ${error instanceof Error ? error.message : 'Error desconocido'}`, 
                500
            );
        }
    }
    private static readDataTableSunatIndexUIT(fiscalYear: CreateFiscalYearInput,cellText: string,j:number,){
        const cleanText = cellText.replace(/\s+/g, ' ').trim();

        switch(j){
            case 0:
                const cleanYear = cleanText.replace(/[^0-9]/g, '');
                fiscalYear.fiscalYear = parseInt(cleanYear, 10);
                break;
            case 1:
                const cleanValue = cleanText.replace(/[^0-9]/g, '');
                fiscalYear.uitValue = parseInt(cleanValue, 10);
                break;
            case 2:
                fiscalYear.legalBase = cleanText
                break;
        }
    }
}

export default ScrapingService;