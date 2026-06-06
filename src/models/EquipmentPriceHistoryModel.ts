import { DataTypes } from "sequelize";
import EntityModel from "./EntityModel";

class EquipmentPriceHistoryModel extends EntityModel {
    private equipment_id!: number;
    private price_market!: number; 
    private fiscal_year!: number;  //para el precio de mercado de referencia, por el año

    static attributesModel() {
        return {
            ...EntityModel.attributesModel(),
            equipment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'equipment', key: 'id' }
            },
            price_market: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            fiscal_year: { type: DataTypes.INTEGER, allowNull: false }
        };
    }

    public getEquipmentId(): number {
        return this.equipment_id;
    }

    public setEquipmentId(equipment_id: number): void {
        this.equipment_id = equipment_id;
    }

    public getPriceMarket(): number {
        return this.price_market;
    }

    public setPriceMarket(price_market: number): void {
        this.price_market = price_market;
    }

    public getFiscalYear(): number {
        return this.fiscal_year;
    }

    public setFiscalYear(fiscal_year: number): void {
        this.fiscal_year = fiscal_year;
    }           



}

export default EquipmentPriceHistoryModel;