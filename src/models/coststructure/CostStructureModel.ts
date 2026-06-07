import CostStructureConst from "@/const/CostStructureConst";
import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";

class CostStructureModel extends EntityModel {
    private medicalProcedureId!: number;
    private fiscalYear!: number;
    private totalTimeMinutes!: number;
    private totalStandarCost!: number;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            medical_procedure_id: { type: DataTypes.INTEGER, allowNull: false,
                references: {
                    model: CostStructureConst.MEDICAL_PROCEDURE_BD_TABLE,
                    key: 'id'
                }
             },
            fiscal_year: { type: DataTypes.INTEGER, allowNull: false },
            total_time_minutes: { type: DataTypes.INTEGER, allowNull: false },
            total_standar_cost: { type: DataTypes.DECIMAL(18, 6), allowNull: false }
        };
    }

    public getMedicalProcedureId(): number {
        return this.medicalProcedureId;
    }

    public setMedicalProcedureId(medicalProcedureId: number): void {
        this.medicalProcedureId = medicalProcedureId;
    }

    public getFiscalYear(): number {
        return this.fiscalYear;
    }

    public setFiscalYear(fiscalYear: number): void {
        this.fiscalYear = fiscalYear;
    }

    public getTotalTimeMinutes(): number {
        return this.totalTimeMinutes;
    }

    public setTotalTimeMinutes(totalTimeMinutes: number): void {
        this.totalTimeMinutes = totalTimeMinutes;
    }

    public getTotalStandarCost(): number {
        return this.totalStandarCost;
    }

    public setTotalStandarCost(totalStandarCost: number): void {
        this.totalStandarCost = totalStandarCost;
    }   

}

export default CostStructureModel;