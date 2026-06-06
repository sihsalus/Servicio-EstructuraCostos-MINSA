// models/EquipmentCostModel.ts
import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";

class EquipmentCostModel extends EntityModel {
    private equipment_id!: number;
    private price_history_id!: number; 
    private time_minutes!: number;
    private deprecation_per_minute!: number; 


    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            equipment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'equipment', key: 'id' }
            },
            price_history_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'equipment_price_history', key: 'id' }
            },
            time_minutes: { type: DataTypes.INTEGER, allowNull: false },
            deprecation_per_minute: { type: DataTypes.DECIMAL(18, 6), allowNull: false }
        };
    }

    public getEquipmentId(): number {
        return this.equipment_id;
    }

    public setEquipmentId(equipment_id: number): void {
        this.equipment_id = equipment_id;
    }

    public getPriceHistoryId(): number {
        return this.price_history_id;
    }

    public setPriceHistoryId(price_history_id: number): void {
        this.price_history_id = price_history_id;
    }

    public getTimeMinutes(): number {
        return this.time_minutes;
    }

    public setTimeMinutes(time_minutes: number): void {
        this.time_minutes = time_minutes;
    }
    
    public getDeprecationPerMinute(): number {
        return this.deprecation_per_minute;
    }

    public setDeprecationPerMinute(deprecation_per_minute: number): void {
        this.deprecation_per_minute = deprecation_per_minute;
    }
}

export default EquipmentCostModel;