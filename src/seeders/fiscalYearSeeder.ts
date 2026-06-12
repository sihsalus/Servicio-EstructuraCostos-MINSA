import { CreateFiscalYearInput } from "@/interfaces/FiscalYearInterface";
import FiscalYearService from "@/services/FiscalYearService";
import ScrapingService from "@/services/ScrapingService";

export const seedFiscalYears = async() =>{
    try{
        console.info("Iniciando el sembrado (Seeding) de valores UIT");

        const uitHistory = await ScrapingService.scrapeSunatIndexUITs();

        for (const uitInf of uitHistory) {
            await FiscalYearService.createFiscalYear(uitInf);
        }
        console.info(" Sembrado de Años UIT completado con éxito.");
    }catch(error){
        console.error("Falló el proceso de seeding de UITs:", error);
    }
}