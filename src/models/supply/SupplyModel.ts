import { TypeSupplyEnum } from "@/const/CostStructureConst";
import EntityModel from "@/models/EntityModel";
import { DataTypes } from "sequelize";


class SupplyModel extends EntityModel {
    private sigaCode!: string;
    private name!: string;
    private typeSupplyId!: TypeSupplyEnum;
    private consumptionUnit!: string;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            siga_code: { type: DataTypes.STRING, allowNull: true },
            name: { type: DataTypes.STRING, allowNull: false },
            type: { type: DataTypes.ENUM,values: (Object.values(TypeSupplyEnum)), allowNull: false },
            consumption_unit: { type: DataTypes.STRING, allowNull: false }
        };
    }

    public getSigaCode(): string {
        return this.sigaCode;
    }

    public setSigaCode(sigaCode: string): void {
        this.sigaCode = sigaCode;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getTypeSupplyId(): TypeSupplyEnum {
        return this.typeSupplyId;
    }

    public setTypeSupplyId(typeSupplyId: TypeSupplyEnum): void {
        this.typeSupplyId = typeSupplyId;
    }

    public getConsumptionUnit(): string {
        return this.consumptionUnit;
    }

    public setConsumptionUnit(consumptionUnit: string): void {
        this.consumptionUnit = consumptionUnit;
    }   
}

export default SupplyModel;