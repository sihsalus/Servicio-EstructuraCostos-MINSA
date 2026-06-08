// models/EquipmentCostModel.ts
import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";
import CostStructureConst from "@/const/CostStructureConst";

class EquipmentCostModel extends EntityModel {
    private equipmentId!: number;
    private priceHistoryId!: number; //verificar 
    private timeMinutes!: number;
    private deprecationPerMinute!: number; 
    private quantity!: number;
    private activityCostExecutionId!: number; 


    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            equipment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.EQUIPMENT, key: 'id' }
            },
            price_history_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.EQUIPMENT_PRICE_HISTORY, key: 'id' }
            },
            time_minutes: { type: DataTypes.INTEGER, allowNull: false },
            deprecation_per_minute: { type: DataTypes.DECIMAL(18, 6), allowNull: false },
            quantity: { type: DataTypes.INTEGER, allowNull: false },
            activity_cost_execution_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.ACTIVITY_COST_EXECUTION, key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
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

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getActivityCostExecutionId(): number {
        return this.activityCostExecutionId;
    }

    public setActivityCostExecutionId(activityCostExecutionId: number): void {
        this.activityCostExecutionId = activityCostExecutionId;
    }
}

export default EquipmentCostModel;