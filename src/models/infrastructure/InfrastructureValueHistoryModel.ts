import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";
import CostStructureConst from "@/const/CostStructureConst";

class InfrastructureValueHistoryModel extends EntityModel { 
    private infrastructureId! :number;
    private valuePerM2!: number;
    private startDate!: Date
    private endDate?: Date;
    private totalConstructionValue!: number;
    private depreciationPerMinute!: number;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            infrastructure_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.INFRASTRUCTURE, key: 'id' }
            },
            value_per_m2: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Vc
            total_construction_value: { type: DataTypes.DECIMAL(12, 2), allowNull: false }, // Cups
            depreciation_per_minute: { type: DataTypes.DECIMAL(18, 6), allowNull: false }, // Cdups
            start_date: { type: DataTypes.DATEONLY, allowNull: false },
            end_date: { type: DataTypes.DATEONLY, allowNull: true }
        };
    }

    public getInfrastructureId(): number {
        return this.infrastructureId;
    }

    public setInfrastructureId(infrastructureId: number): void {
        this.infrastructureId = infrastructureId;
    }

    public getValuePerM2(): number {
        return this.valuePerM2;
    }

    public setValuePerM2(valuePerM2: number): void {
        this.valuePerM2 = valuePerM2;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getEndDate(): Date | undefined {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getTotalConstructionValue(): number {
        return this.totalConstructionValue;
    }

    public setTotalConstructionValue(totalConstructionValue: number): void {
        this.totalConstructionValue = totalConstructionValue;
    }

    public getDepreciationPerMinute(): number {
        return this.depreciationPerMinute;
    }

    public setDepreciationPerMinute(depreciationPerMinute: number): void {
        this.depreciationPerMinute = depreciationPerMinute;
    }   
}

export default InfrastructureValueHistoryModel;