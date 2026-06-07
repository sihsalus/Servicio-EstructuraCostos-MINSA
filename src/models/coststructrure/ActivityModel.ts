import CostStructureConst from "@/const/CostStructureConst";
import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";

class ActivityModel extends EntityModel{

    private medicalProcedureId!: number;
    private name!: string;
    private stepOrder!: number;
    
    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            medical_procedure_id: { type: DataTypes.INTEGER, allowNull: false,
                references: {
                    model: CostStructureConst.MEDICAL_PROCEDURE_BD_TABLE,
                    key: 'id'
                }
            }
             ,
            name: { type: DataTypes.STRING, allowNull: false },
            step_order: { type: DataTypes.INTEGER, allowNull: false }
        };
    }

}

export default ActivityModel;