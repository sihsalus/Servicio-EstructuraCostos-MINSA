import { DataTypes, Model } from "sequelize";
import { TEquipmentEnum } from "@/const/CostStructureConst";

class EquipmentModel extends Model {
    private name!: string;
    private description?: string;
    private typeEquipment!: TEquipmentEnum;
    private usefulLifeYears!: number;   
    private sigaCode?: string;
    private isGroupAsset!: boolean;

    static attributesModel() {
        return {
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: true },
            type_equipment: { type: DataTypes.ENUM, values: Object.values(TEquipmentEnum), allowNull: false },
            useful_life_years: { type: DataTypes.INTEGER, allowNull: false },
            siga_code: { type: DataTypes.STRING, allowNull: true },
            is_group_asset: { type: DataTypes.BOOLEAN, allowNull: false , defaultValue: false},
        }
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
    public getTypeEquipment(): TEquipmentEnum {
        return this.typeEquipment;
    }

    public setTypeEquipment(typeEquipment: TEquipmentEnum): void {
        this.typeEquipment = typeEquipment;
    }
    public getUsefulLifeYears(): number {
        return this.usefulLifeYears;
    }

    public setUsefulLifeYears(usefulLifeYears: number): void {
        this.usefulLifeYears = usefulLifeYears;
    }

    public getSigaCode(): string | undefined {
        return this.sigaCode;
    }

    public setSigaCode(sigaCode: string): void {
        this.sigaCode = sigaCode;
    }

    public getIsGroupAsset(): boolean {
        return this.isGroupAsset;
    }

    public setIsGroupAsset(isGroupAsset: boolean): void {
        this.isGroupAsset = isGroupAsset;
    }
}
export default EquipmentModel;