import CostStructureConst from "@/const/CostStructureConst";
import { CreateFiscalYearInput, CreateFiscalYearSchema } from "@/interfaces/FiscalYearInterface";
import FiscalYearConfigModel from "@/models/FiscalYearModel";
import CustomError from "@/utils/CustomError";

class FiscalYearService {

    static async getByYear(year: number) {

        const fiscalYear = await FiscalYearConfigModel.findOne({
            where:{ fiscal_year: year}
        })

        return fiscalYear;
    }

    static async createFiscalYear(data: CreateFiscalYearInput ){

        const dataParse =  CreateFiscalYearSchema.safeParse(data);

        if(!dataParse.success){
            throw new CustomError("Formato de insumo inválido", 400);
        }

        const { fiscalYear, uitValue, createdBy,legalBase  } = dataParse.data;

        const existing = await FiscalYearConfigModel.findOne({
            where:{
                fiscal_year: fiscalYear,
                legal_base: legalBase
            }
        })

        const newFiscalYear =  await FiscalYearConfigModel.create({
            fiscal_year: fiscalYear,
            uit_value: uitValue,
            legal_base: legalBase,
            created_by: createdBy ?? CostStructureConst.DEFAULT_USER_SYSTEM
        });

        return newFiscalYear;
    }


}

export default FiscalYearService;
