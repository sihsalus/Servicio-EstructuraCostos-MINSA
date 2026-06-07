import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";
import CostStructureConst from "@/const/CostStructureConst";

class InfrastructureCostModel extends EntityModel {

    private infrastructureId!: number;
    private priceHistoryId!: number; //verificar 
    private timeMinutes!: number;
    private totalStandarCost!: number;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            infrastructure_id: { type: DataTypes.INTEGER, allowNull: false,
                references:{
                    model: CostStructureConst.INFRASTRUCTURE_BD_TABLE,
                    key: 'id'
                }
             },
            price_history_id: { type: DataTypes.INTEGER, allowNull: false,
                references:{
                    model: CostStructureConst.INFRASTRUCTURE_PRICE_HISTORY_BD_TABLE,
                    key: 'id'
                }
             },
            time_minutes: { type: DataTypes.INTEGER, allowNull: false },
            total_standar_cost: { type: DataTypes.DECIMAL(18, 6), allowNull: false }
        };
    }

    public getInfrastructureId(): number {
        return this.infrastructureId;
    }

    public setInfrastructureId(infrastructureId: number): void {
        this.infrastructureId = infrastructureId;
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

    public getTotalStandarCost(): number {
        return this.totalStandarCost;
    }

    public setTotalStandarCost(totalStandarCost: number): void {
        this.totalStandarCost = totalStandarCost;
    }

}

export default InfrastructureCostModel;