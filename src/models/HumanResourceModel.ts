import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";

class HumanResourceModel extends EntityModel {
    private name?: string;
    private speciality!: SpecialityEnum;


    static attributesModel(){
        return {
            ...EntityModel.attributesModel(),
            name: { type: DataTypes.STRING, allowNull: true },
            speciality: { type: DataTypes.ENUM, values: Object.values(SpecialityEnum), allowNull: false }
        };
    }

    public getName(): string | undefined {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
    
    public getSpeciality(): SpecialityEnum {
        return this.speciality;
    }   

    public setSpeciality(speciality: SpecialityEnum): void {
        this.speciality = speciality;
    }
}
export default HumanResourceModel;

