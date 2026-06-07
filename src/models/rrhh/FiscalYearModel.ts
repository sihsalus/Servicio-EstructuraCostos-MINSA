import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";

class FiscalYearConfigModel extends EntityModel {
    private fiscalYear!: number; // Ej: 2026
    private uitValue!: number;   // Ej: 5150.00

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            fiscal_year: { type: DataTypes.INTEGER, allowNull: false, unique: true },
            uit_value: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
        };
    }

    public getFiscalYear(): number {
        return this.fiscalYear;
    }

    public setFiscalYear(fiscalYear: number): void {
        this.fiscalYear = fiscalYear;
    }

    public getUitValue(): number {
        return this.uitValue;
    }

    public setUitValue(uitValue: number): void {
        this.uitValue = uitValue;
    }
}

export default FiscalYearConfigModel;