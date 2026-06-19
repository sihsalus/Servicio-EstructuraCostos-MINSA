import sequelize from "@/config/db";
import CostStructureConst from "@/const/CostStructureConst";
import ActivityCostExecutionModel from "@/models/coststructure/ActivityCostExecutionModel";
import ActivityModel from "@/models/coststructure/ActivityModel";
import CostStructureModel from "@/models/coststructure/CostStructureModel";
import MedicalProcedureModel from "@/models/coststructure/MedicalProcedureModel";
import EquipmentCostModel from "@/models/equipment/EquipmentCostModel";
import EquipmentModel from "@/models/equipment/EquipmentModel";
import EquipmentPriceHistoryModel from "@/models/equipment/EquipmentPriceHistoryModel";
import FiscalYearConfigModel from "@/models/FiscalYearModel";
import InfrastructureCostModel from "@/models/infrastructure/InfrastructureCostModel";
import InfrastructureModel from "@/models/infrastructure/InfrastructureModel";
import InfrastructureValueHistoryModel from "@/models/infrastructure/InfrastructureValueHistoryModel";
import UpssAnnualConfigModel from "@/models/infrastructure/UpssAnualConfigModel";
import IpressGlobalCostModel from "@/models/IpressGlobalCostModel";
import HumanResourceModel from "@/models/rrhh/HumanResourceModel";
import RrhhCostModel from "@/models/rrhh/RrhhCostModel";
import SupplyCostModel from "@/models/supply/SupplyCostModel";
import SupplyInfoHistoryModel from "@/models/supply/SupplyInfoHistoryModel";
import SupplyModel from "@/models/supply/SupplyModel";


export const syncronizeDataTables = async () => {
    try{

        initializeTables();
        
        defineAssociations();

        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Error synchronizing tables:', error);
    }
}


const initializeTables =  () => {

    EquipmentModel.init(EquipmentModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.EQUIPMENT
    });

    EquipmentPriceHistoryModel.init(EquipmentPriceHistoryModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.EQUIPMENT_PRICE_HISTORY
    });

    EquipmentCostModel.init(EquipmentCostModel.attributesModel(), {  
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.EQUIPMENT_COST 
    });

    InfrastructureModel.init(InfrastructureModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.INFRASTRUCTURE
    });

    InfrastructureValueHistoryModel.init(InfrastructureValueHistoryModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.INFRASTRUCTURE_PRICE_HISTORY
    });

    InfrastructureCostModel.init(InfrastructureCostModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.INFRASTRUCTURE_COST
    });

    SupplyModel.init(SupplyModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.SUPPLY
    });

    SupplyInfoHistoryModel.init(SupplyInfoHistoryModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.SUPPLY_INFO_HISTORY
    });

    SupplyCostModel.init(SupplyCostModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.SUPPLY_COST
    });

    HumanResourceModel.init(HumanResourceModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.HUMAN_RESOURCE
    });

    RrhhCostModel.init(RrhhCostModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.HUMAN_RESOURCE_COST
    });

    MedicalProcedureModel.init(MedicalProcedureModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.MEDICAL_PROCEDURE
    });

    ActivityModel.init(ActivityModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.ACTIVITY
    });

    ActivityCostExecutionModel.init(ActivityCostExecutionModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.ACTIVITY_COST_EXECUTION
    });

    CostStructureModel.init(CostStructureModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.COST_STRUCTURE
    });

    FiscalYearConfigModel.init(FiscalYearConfigModel.attributesModel(), {
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.FISCAL_YEAR
    });

    IpressGlobalCostModel.init(IpressGlobalCostModel.attributesModel(),{
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.IPRESS_GLOBAL_COST
    });

    UpssAnnualConfigModel.init(UpssAnnualConfigModel.attributesModel(),{
        sequelize,
        tableName: CostStructureConst.DB_TABLE_NAMES.UPSS_ANNUAL_CONFIG
    });

}


const defineAssociations = () => {

    MedicalProcedureModel.hasMany(ActivityModel,{
        foreignKey:'medical_procedure_id',
        as:'activities'
    });

    ActivityModel.belongsTo(MedicalProcedureModel,{
        foreignKey:'medical_procedure_id',
        as:'procedure',
    });

    CostStructureModel.belongsTo(MedicalProcedureModel, {
        foreignKey: 'medical_procedure_id',
        as: 'procedure'
    });

    // Una estructura de costo se desglosa en la ejecución de varias actividades cronológicas
    CostStructureModel.hasMany(ActivityCostExecutionModel,{
        foreignKey: 'cost_structure_id', 
        as: 'activitiesCost'
    });
    ActivityCostExecutionModel.belongsTo(CostStructureModel, {
        foreignKey: 'cost_structure_id', 
        as: 'costStructure' 
    });

    // Une la celda de ejecución con la definición clínica del paso (Anamnesis, Examen Físico, etc.)
    ActivityCostExecutionModel.belongsTo(ActivityModel, {
        foreignKey: 'activity_id', 
        as: 'activityDefinition'
    });


    // --- 2. FACTOR: RECURSOS HUMANOS (Por Actividad) ---
    // Una actividad ejecutada contiene el gasto de varios profesionales de la salud
    ActivityCostExecutionModel.hasMany(RrhhCostModel, { 
        foreignKey: 'activity_cost_execution_id',
        as: 'rrhhCosts' 
    });

    RrhhCostModel.belongsTo(ActivityCostExecutionModel, { 
        foreignKey: 'activity_cost_execution_id',
        as: 'activity'
    });

    // El costo parcial de RRHH conoce los datos maestros del personal asignado
    RrhhCostModel.belongsTo(HumanResourceModel, {
        foreignKey: 'rrhh_id', 
        as: 'humanResource'
    });


    // --- 3. FACTOR: EQUIPAMIENTO (Por Actividad) ---
    // Un equipo maestro tiene un historial de variaciones de precio en el mercado
    EquipmentModel.hasMany(EquipmentPriceHistoryModel, { 
        foreignKey: 'equipment_id', 
        as: 'priceHistories'
    });
    EquipmentPriceHistoryModel.belongsTo(EquipmentModel, { 
        foreignKey: 'equipment_id', 
        as: 'equipment'
    });

    // Una actividad ejecutada registra el costo por depreciación de varios equipos
    ActivityCostExecutionModel.hasMany(EquipmentCostModel, { 
        foreignKey: 'activity_cost_execution_id', 
        as: 'equipmentCosts'
    });
    
    EquipmentCostModel.belongsTo(ActivityCostExecutionModel, {
        foreignKey: 'activity_cost_execution_id',
        as: 'activity'
    });

    // El costo del equipo se enlaza con su catálogo e historial para auditoría y performance
    EquipmentCostModel.belongsTo(EquipmentModel, {
        foreignKey: 'equipment_id', 
        as: 'equipment' 
    });

    EquipmentCostModel.belongsTo(EquipmentPriceHistoryModel, { 
        foreignKey: 'price_history_id', 
        as: 'appliedPrice'
     });


    // --- 4. FACTOR: INSUMOS / MATERIALES (Por Actividad) ---
    // Un insumo médico (Fungible/No Fungible) cambia de empaque y precio en el tiempo
    SupplyModel.hasMany(SupplyInfoHistoryModel, {
        foreignKey: 'supply_id', 
        as: 'priceHistories' 
    });

    SupplyInfoHistoryModel.belongsTo(SupplyModel, { 
        foreignKey: 'supply_id', 
        as: 'supply' 
    });

    // Una actividad ejecutada registra el consumo de múltiples insumos médicos
    ActivityCostExecutionModel.hasMany(SupplyCostModel, { 
        foreignKey: 'activity_cost_execution_id', 
        as: 'supplyCosts' 
    });

    SupplyCostModel.belongsTo(ActivityCostExecutionModel, { 
        foreignKey: 'activity_cost_execution_id', 
        as: 'activity' 
    });

    // El costo del insumo se amarra a su definición fija y a su lote/compra específica
    SupplyCostModel.belongsTo(SupplyModel, { 
        foreignKey: 'supply_id', 
        as: 'supply' 
    });

    SupplyCostModel.belongsTo(SupplyInfoHistoryModel, { 
        foreignKey: 'supply_info_history_id', 
        as: 'appliedPrice' 
    });


    // --- 5. FACTOR: INFRAESTRUCTURA (A Nivel Global de la Cabecera) ---
    // Una UPSS (Infraestructura) tiene un historial de valorización por m2 según el MEF
    InfrastructureModel.hasMany(InfrastructureValueHistoryModel, { 
        foreignKey: 'infrastructure_id', 
        as: 'valueHistories' 
    });

    InfrastructureValueHistoryModel.belongsTo(InfrastructureModel, { 
        foreignKey: 'infrastructure_id', 
        as: 'infrastructure' 
    });

    // La cabecera de la Estructura de Costos se vincula de manera directa a su gasto total en infraestructura
    CostStructureModel.hasMany(InfrastructureCostModel, { 
        foreignKey: 'cost_structure_id', 
        as: 'infrastructureCost' 
    });

    CostStructureModel.belongsTo(FiscalYearConfigModel, {
        foreignKey: 'fiscal_year_id',
        as: 'fiscalYearContext' // Te permitirá traer toda la info de la UIT y Base Legal con un simple 'include'
    });

    InfrastructureCostModel.belongsTo(CostStructureModel, { 
        foreignKey: 'cost_structure_id',
        as: 'costStructure' 
    });

    // El costo consolidado apunta al espacio físico y su valor constructivo histórico aplicado
    InfrastructureCostModel.belongsTo(InfrastructureModel, { 
        foreignKey: 'infrastructure_id', 
        as: 'infrastructure'
     });
     
    InfrastructureCostModel.belongsTo(InfrastructureValueHistoryModel, { 
        foreignKey: 'price_history_id', 
        as: 'appliedValue'
     });

     FiscalYearConfigModel.hasOne(IpressGlobalCostModel,{
        foreignKey:'fiscal_year_id',
        as:'globalCost'
     });

    IpressGlobalCostModel.belongsTo(FiscalYearConfigModel, {
        foreignKey: 'fiscal_year_id',
        as: 'fiscalYear'
    });

    // La configuración anual de prorrateo pertenece a una UPSS específica (Relación 1 a N)
    InfrastructureModel.hasMany(UpssAnnualConfigModel, {
        foreignKey: 'infrastructure_id',
        as: 'annualConfigs'
    });
    UpssAnnualConfigModel.belongsTo(InfrastructureModel, {
        foreignKey: 'infrastructure_id',
        as: 'infrastructure'
    });

    // La configuración anual de prorrateo también pertenece a un Año Fiscal (Relación 1 a N)
    FiscalYearConfigModel.hasMany(UpssAnnualConfigModel, {
        foreignKey: 'fiscal_year_id',
        as: 'upssConfigs'
    });
    UpssAnnualConfigModel.belongsTo(FiscalYearConfigModel, {
        foreignKey: 'fiscal_year_id',
        as: 'fiscalYear'
    }); 

}