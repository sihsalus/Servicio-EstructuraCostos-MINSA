import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";

class MedicalProcedureModel extends EntityModel {

    private cpmsCode!: string;
    private name!: string;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            cpms_code: { type: DataTypes.STRING, allowNull: false, unique: true },
            name: { type: DataTypes.TEXT, allowNull: false }
        };
    }

    public getCpmsCode(): string {
        return this.cpmsCode;
    }

    public setCpmsCode(cpmsCode: string): void {
        this.cpmsCode = cpmsCode;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}

export default MedicalProcedureModel;