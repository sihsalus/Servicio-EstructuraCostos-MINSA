// models/EquipmentPriceHistoryModel.ts
import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";
import CostStructureConst from "../const/CostStructureConst";

class EquipmentPriceHistoryModel extends EntityModel {
    private equipmentId!: number;
    private priceMarket!: number;
    private startDate!: Date;    // Fecha desde que entra en vigencia el precio
    private endDate?: Date; // Fecha en que cambia (null si es el actual)

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            equipment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.EQUIPMENT_BD_TABLE, key: 'id' }
            },
            price_market: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            start_date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
            end_date: { type: DataTypes.DATEONLY, allowNull: true }
        };
    }

    public getEquipmentId(): number {
        return this.equipmentId;
    }

    public setEquipmentId(equipmentId: number): void {
        this.equipmentId = equipmentId;
    }

    public getPriceMarket(): number {
        return this.priceMarket;
    }

    public setPriceMarket(priceMarket: number): void {
        this.priceMarket = priceMarket;
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
}

export default EquipmentPriceHistoryModel;