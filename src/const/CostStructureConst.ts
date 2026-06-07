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

    public static readonly EQUIPMENT_BD_TABLE = "equipment";
    public static readonly EQUIPMENT_PRICE_HISTORY_BD_TABLE = "equipment_price_history";
    public static readonly EQUIPMENT_COST_BD_TABLE = "equipment_costs";
    public static readonly HUMAN_RESOURCE_BD_TABLE = "human_resources";
    public static readonly HUMAN_RESOURCE_COST_BD_TABLE = "human_resource_costs";
    public static readonly FISCAL_YEAR_BD_TABLE = "fiscal_years";
    public static readonly INFRASTRUCTURE_BD_TABLE = "infrastructure";
    public static readonly INFRASTRUCTURE_COST_BD_TABLE = "infrastructure_costs";
    public static readonly INFRASTRUCTURE_PRICE_HISTORY_BD_TABLE = "infrastructure_price_history";

    public static readonly SUPPLY_BD_TABLE = "supply";
    public static readonly SUPPLY_INFO_HISTORY_BD_TABLE = "supply_info_history";


    public static readonly COST_STRUCTURE_BD_TABLE = "cost_structure";
    public static readonly MEDICAL_PROCEDURE_BD_TABLE = "medical_procedure";
    public static readonly ACTIVITY_BD_TABLE = "activity";

}
export default CostStructureConst;