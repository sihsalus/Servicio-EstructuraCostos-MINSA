import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";
import CostStructureConst from "../const/CostStructureConst";

class RrhhCostModel extends EntityModel{
    private quantity!: number;
    private timeMinutes!: number;
    private costPerMinute!: number;
    private annualSalary!: number;
    
    static attributesModel(){
        return {
            ...EntityModel.attributesModel(),
            quantity: { type: DataTypes.INTEGER, allowNull: false },
            time_minutes: { type: DataTypes.INTEGER, allowNull: false },
            cost_per_Minute: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            annual_salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            rrhh_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: CostStructureConst.HUMAN_RESOURCE_BD_TABLE,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        };
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }              
    public getTimeMinutes(): number {
        return this.timeMinutes;
    }

    public setTimeMinutes(timeMinutes: number): void {
        this.timeMinutes = timeMinutes;
    }
    
    public getCostPerMinute(): number {
        return this.costPerMinute;
    }
    public setCostPerMinute(costPerMinute: number): void {
        this.costPerMinute = costPerMinute;
    }
    
    public getAnnualSalary(): number {
        return this.annualSalary;
    }
    
    public setAnnualSalary(annualSalary: number): void {
        this.annualSalary = annualSalary;
    }

}