import CostStructureConst from "@/const/CostStructureConst";
import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";

class ActivityCostExecutionModel extends EntityModel{
    private costStructureId!: number;
    private activityId!: number;
    private durationMinutes!: number;
    private partialCost!: number;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            cost_structure_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: CostStructureConst.DB_TABLE_NAMES.COST_STRUCTURE, 
                    key: 'id'
                }
            },
            activity_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: CostStructureConst.DB_TABLE_NAMES.ACTIVITY, 
                    key: 'id'
                }
            },
            duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
            partial_cost: { type: DataTypes.DECIMAL(18, 6), allowNull: false }
        };
    }

    public getCostStructureId(): number {
        return this.costStructureId;
    }

    public setCostStructureId(costStructureId: number): void {
        this.costStructureId = costStructureId;
    }

    public getActivityId(): number {
        return this.activityId;
    }

    public setActivityId(activityId: number): void {
        this.activityId = activityId;
    }

    public getDurationMinutes(): number {
        return this.durationMinutes;
    }

    public setDurationMinutes(durationMinutes: number): void {
        this.durationMinutes = durationMinutes;
    }

    public getPartialCost(): number {
        return this.partialCost;
    }

    public setPartialCost(partialCost: number): void {
        this.partialCost = partialCost;
    }   
    
}

export default ActivityCostExecutionModel;