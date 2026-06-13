import { DataTypes } from "sequelize";
import EntityModel from "@/models/EntityModel";
import { SpecialityEnum } from "@/const/CostStructureConst";

class HumanResourceModel extends EntityModel {
    private speciality!: string;


    static attributesModel(){
        return {
            ...EntityModel.attributesModel(),
            speciality: { 
                 type: DataTypes.STRING
                 , allowNull: false }
        };
    }

    
    public getSpeciality(): string {
        return this.speciality;
    }   

    public setSpeciality(speciality: string): void {
        this.speciality = speciality;
    }
}
export default HumanResourceModel;

