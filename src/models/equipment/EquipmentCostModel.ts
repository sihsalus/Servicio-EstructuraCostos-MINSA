// models/EquipmentCostModel.ts
import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";
import CostStructureConst from "@/const/CostStructureConst";

class EquipmentCostModel extends EntityModel {
    private equipmentId!: number;
    private priceHistoryId!: number; //verificar 
    private timeMinutes!: number;
    private deprecationPerMinute!: number; 


    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            equipment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.EQUIPMENT_BD_TABLE, key: 'id' }
            },
            price_history_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.EQUIPMENT_PRICE_HISTORY_BD_TABLE, key: 'id' }
            },
            time_minutes: { type: DataTypes.INTEGER, allowNull: false },
            deprecation_per_minute: { type: DataTypes.DECIMAL(18, 6), allowNull: false }
        };
    }

    public getEquipmentId(): number {
        return this.equipmentId;
    }

    public setEquipmentId(equipmentId: number): void {
        this.equipmentId = equipmentId;
    }

    public getPriceHistoryId(): number {
        return this.priceHistoryId;
    }       

    public setPriceHistoryId(priceHistoryId: number): void {
        this.priceHistoryId = priceHistoryId;
    }

    public getTimeMinutes(): number {
        return this.timeMinutes;
    }

    public setTimeMinutes(timeMinutes: number): void {
        this.timeMinutes = timeMinutes;
    }

    public getDeprecationPerMinute(): number {
        return this.deprecationPerMinute;
    }

    public setDeprecationPerMinute(deprecationPerMinute: number): void {
        this.deprecationPerMinute = deprecationPerMinute;
    }
}

export default EquipmentCostModel;