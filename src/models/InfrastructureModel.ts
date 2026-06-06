import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";

class InfrastructureModel extends EntityModel {
    private code!: string;
    private name!: string;
    private description?: string;
    private areaM2!: number;

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            code: { type: DataTypes.STRING, allowNull: false, unique: true },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: true },
            area_m2: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
        };
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getAreaM2(): number {
        return this.areaM2;
    }

    public setAreaM2(areaM2: number): void {
        this.areaM2 = areaM2;
    }
    
}

export default InfrastructureModel;