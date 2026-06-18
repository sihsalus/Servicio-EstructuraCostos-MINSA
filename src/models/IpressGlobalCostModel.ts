import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";

class IpressGlobalCostModel extends EntityModel {
    private fiscalYearId!: number; 
    private energyAnnualCost!: number; // CEA
    private waterAnnualCost!: number;  // CAA
    private phoneAnnualCost!: number;  // CTA
    private adminAnnualCost!: number;  // CADG
    private generalServicesAnnualCost!: number; // CSEG

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            fiscal_year_id: { type: DataTypes.INTEGER, allowNull: false },
            
            energy_annual_cost: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            water_annual_cost: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            phone_annual_cost: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            admin_annual_cost: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            general_services_annual_cost: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
        };
    }

    
}

export default IpressGlobalCostModel;