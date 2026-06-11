export enum SpecialityEnum {
    MEDICO,
    ENFERMERO,
    TECNICO,
}
export enum TEquipmentEnum {
    EQUIPMENT = 1,
    FURNITURE = 2,
    INSTRUMENT = 3,
}
export enum TypeSupplyEnum {
    FUNGIBLE = 1,
    NON_FUNGIBLE = 2,
}


class CostStructureConst {
    public static readonly SpecialityEnum = SpecialityEnum;
    public static readonly TEquipmentEnum = TEquipmentEnum;


    public static readonly DB_TABLE_NAMES = {
        EQUIPMENT : "equipment",
        EQUIPMENT_PRICE_HISTORY : "equipment_price_history",
        EQUIPMENT_COST : "equipment_cost",
        HUMAN_RESOURCE : "human_resources",
        HUMAN_RESOURCE_COST : "human_resource_cost",
        FISCAL_YEAR : "fiscal_year",
        INFRASTRUCTURE : "infrastructure",
        INFRASTRUCTURE_COST : "infrastructure_cost",
        INFRASTRUCTURE_PRICE_HISTORY : "infrastructure_price_history",
        SUPPLY: "supply",
        SUPPLY_INFO_HISTORY : "supply_info_history",
        SUPPLY_COST : "supply_cost",
        COST_STRUCTURE : "cost_structure",
        MEDICAL_PROCEDURE : "medical_procedure",
        ACTIVITY : "activity",
        ACTIVITY_COST_EXECUTION : "activity_cost_execution"
    }

    public static MIN_YEAR_COST_SYSTEM = 1990;
    public static MAX_YEAR_COST_SYSTEM = 2100;
    public static DEFAULT_USER_SYSTEM = "GIDIS";

    public static readonly SUNAT_ABOUT = {
        URL_SUNAT_UIT : "https://www.sunat.gob.pe/indicestasas/uit.html",
        MIN_YEAR_UIT : 2000,
    }
}


export default CostStructureConst;