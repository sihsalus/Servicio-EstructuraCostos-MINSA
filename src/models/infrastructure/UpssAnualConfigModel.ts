import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";

class UpssAnnualConfigModel extends EntityModel {
    private infrastructureId!: number; 
    private fiscalYearId!: number;     
    
    private projectedAnnualProcedures!: number; 
    private energyWeight!: number; 
    private waterWeight!: number;  
    private phoneWeight!: number; 

    private unitBasicServicesCost!: number;   
    private unitAdminCost!: number;           
    private unitGeneralServicesCost!: number; 

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            infrastructure_id: { type: DataTypes.INTEGER, allowNull: false },
            fiscal_year_id: { type: DataTypes.INTEGER, allowNull: false },
            
            projected_annual_procedures: { type: DataTypes.INTEGER, allowNull: false },
            
            energy_weight: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
            water_weight: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
            phone_weight: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
            
            unit_basic_services_cost: { type: DataTypes.DECIMAL(10, 4), allowNull: true },
            unit_admin_cost: { type: DataTypes.DECIMAL(10, 4), allowNull: true },
            unit_general_services_cost: { type: DataTypes.DECIMAL(10, 4), allowNull: true },
        };
    }
}

export default UpssAnnualConfigModel;