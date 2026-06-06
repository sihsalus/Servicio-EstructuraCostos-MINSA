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

class CostStructureConst {
    public static readonly SpecialityEnum = SpecialityEnum;
    public static readonly TEquipmentEnum = TEquipmentEnum;

    public static readonly EQUIPMENT_BD_TABLE = "equipment";
    public static readonly EQUIPMENT_PRICE_HISTORY_BD_TABLE = "equipment_price_history";
    public static readonly EQUIPMENT_COST_BD_TABLE = "equipment_costs";
    public static readonly HUMAN_RESOURCE_BD_TABLE = "human_resources";
    public static readonly HUMAN_RESOURCE_COST_BD_TABLE = "human_resource_costs";
    public static readonly FISCAL_YEAR_BD_TABLE = "fiscal_years";

}
export default CostStructureConst;