import CostStructureConst from "@/const/CostStructureConst";
import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";

class SupplyInfoHistoryModel extends EntityModel {

    private supplyId!: number;
    private acquisitionUnit!: string;
    private acquisitionPrice!: number;
    private conversionEquivalent!: number;
    private unitConsumptionCost!: number;
    private startDate!: Date;
    private endDate?: Date;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            supply_id: { type: DataTypes.INTEGER, allowNull: false,
                references:{
                    model: CostStructureConst.SUPPLY_BD_TABLE,
                    key: 'id'
                }
             },
            acquisition_unit: { type: DataTypes.STRING, allowNull: false },
            acquisition_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            conversion_equivalent: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            unit_consumption_cost: { type: DataTypes.DECIMAL(18, 6), allowNull: false },
            start_date: { type: DataTypes.DATE, allowNull: false },
            end_date: { type: DataTypes.DATE, allowNull: true }
        };
    }

}

export default SupplyInfoHistoryModel;