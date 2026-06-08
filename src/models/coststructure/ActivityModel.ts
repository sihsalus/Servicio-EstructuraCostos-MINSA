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
                    model: CostStructureConst.DB_TABLE_NAMES.MEDICAL_PROCEDURE,
                    key: 'id'
                }
            }
             ,
            name: { type: DataTypes.STRING, allowNull: false },
            step_order: { type: DataTypes.INTEGER, allowNull: false },
        };
    }

    public getMedicalProcedureId(): number {
        return this.medicalProcedureId;
    }

    public setMedicalProcedureId(medicalProcedureId: number): void {
        this.medicalProcedureId = medicalProcedureId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStepOrder(): number {
        return this.stepOrder;
    }

    public setStepOrder(stepOrder: number): void {
        this.stepOrder = stepOrder;
    }

}

export default ActivityModel;