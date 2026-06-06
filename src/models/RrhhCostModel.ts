import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";

class RrhhCostModel extends EntityModel{
    private quantity!: number;
    private time_minutes!: number;
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
                    model: 'human_resources',
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
        return this.time_minutes;
    }

    public setTimeMinutes(time_minutes: number): void {
        this.time_minutes = time_minutes;
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