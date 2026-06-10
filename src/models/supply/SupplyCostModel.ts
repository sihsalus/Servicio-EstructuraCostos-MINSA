import CostStructureConst from "@/const/CostStructureConst";
import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";

class SupplyCostModel extends EntityModel {
    private supplyId!: number;
    private supplyPriceHistoryId!: number;
    private activityCostExecutionId!: number;
    private quantity!: number;
    private timeMinutes?: number;
    private totalStandarCost!: number;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            supply_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.SUPPLY, key: 'id' }
            },
            supply_info_history_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.SUPPLY_INFO_HISTORY, key: 'id' }
            },
            activity_cost_execution_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: CostStructureConst.DB_TABLE_NAMES.ACTIVITY_COST_EXECUTION, key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            time_minutes: { type: DataTypes.INTEGER, allowNull: true },
            total_standard_cost: { type: DataTypes.DECIMAL(18, 6), allowNull: false }
        };
    }

    public getSupplyId(): number {
        return this.supplyId;
    }

    public setSupplyId(supplyId: number): void {
        this.supplyId = supplyId;
    }

    public getSupplyPriceHistoryId(): number {
        return this.supplyPriceHistoryId;
    }

    public setSupplyPriceHistoryId(supplyPriceHistoryId: number): void {
        this.supplyPriceHistoryId = supplyPriceHistoryId;
    }

    public getActivityCostExecutionId(): number {
        return this.activityCostExecutionId;
    }

    public setActivityCostExecutionId(activityCostExecutionId: number): void {
        this.activityCostExecutionId = activityCostExecutionId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getTimeMinutes(): number | undefined {
        return this.timeMinutes;
    }

    public setTimeMinutes(timeMinutes: number | undefined): void {
        this.timeMinutes = timeMinutes;
    }

    public getTotalStandarCost(): number {
        return this.totalStandarCost;
    }

    public setTotalStandarCost(totalStandarCost: number): void {
        this.totalStandarCost = totalStandarCost;
    }   
}

export default SupplyCostModel;