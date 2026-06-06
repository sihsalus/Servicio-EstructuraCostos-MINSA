import { DataTypes, Model } from "sequelize";

class EquipmentModel extends Model {
    private name!: string;
    private description?: string;
    private typeEquipment!: TEquipmentEnum;

    static attributesModel() {
        return {
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: true },
            type_equipment: { type: DataTypes.ENUM, values: Object.values(TEquipmentEnum), allowNull: false }
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
}
export default EquipmentModel;