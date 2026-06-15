import { SpecialityEnum, TEquipmentEnum, TypeSupplyEnum } from "@/const/CostStructureConst";
import { CreateMedicalProcedureInput } from "@/interfaces/cpms";
import { CreateEquipmentInput } from "@/interfaces/equipment";
import { CreateFiscalYearInput } from "@/interfaces/FiscalYearInterface";
import { CreateHumanResourceInput } from "@/interfaces/humanResource";
import { CreateInfrastructureInput } from "@/interfaces/infra";
import { CreateSupplyInput } from "@/interfaces/supply";
import MedicalProcedureModel from "@/models/coststructure/MedicalProcedureModel";
import InfrastructureModel from "@/models/infrastructure/InfrastructureModel";
import HumanResourceModel from "@/models/rrhh/HumanResourceModel";
import EquipmentService from "@/services/EquipmentService";
import FiscalYearService from "@/services/FiscalYearService";
import InfrastructureService from "@/services/InfrastructureService";
import ScrapingService from "@/services/ScrapingService";
import SupplyService from "@/services/SupplyService";



export const runAllSeeders = async () => {
    try {
        console.log("Conectando a PostgreSQL para inyección de datos...");
        
        await seedFiscalYears();
        await seedCPMS();
        await seedEquipments();
        await seedHumanResource();
        await seedInfrastructure();
        await seedSupplies();
        
        console.log(" ¡Todos los seeders se ejecutaron secuencialmente sin errores!");
    } catch (globalError) {
        console.error(" Error crítico en la cadena de seeders:", globalError);
    }
};
const seedFiscalYears = async() =>{
    try{
        console.info("Iniciando el sembrado (Seeding) de valores UIT");

        const uitHistory = await ScrapingService.scrapeSunatIndexUITs();

        for (const uitInf of uitHistory) {
            await FiscalYearService.createFiscalYear(uitInf);
        }
        console.info(" Sembrado de Años UIT completado con éxito.");
    }catch(error){
        console.error("Falló el proceso de seeding de UITs:", error);
    }
}

const seedHumanResource = async () => {
    try{
        console.info("Iniciando el sembrado (Seeding) de Recursos Humanos");

        const rrhhTemplate : CreateHumanResourceInput[] = [
            {
                speciality: SpecialityEnum.ENFERMERA.toString(),
            },
            {
                speciality: SpecialityEnum.MEDICO_ESPECIALISTA.toString()
            },
            {
                speciality: SpecialityEnum.MEDICO_GENERAL.toString()
            }
        ];

        for(const rrhh of rrhhTemplate ){
            await HumanResourceModel.create(rrhh);
        }

        console.info(" Sembrado de Recursos Humanos completado con éxito.");

    }catch(error){
        console.error("Falló el proceso de seeding de Recursos Humanos:", error);
    }
}

const seedInfrastructure = async () =>{
    try{
        console.info("Iniciando el sembrado (Seeding) de Infrastructura");

        const infras : CreateInfrastructureInput[] = [
            {
                name:"CONSULTA EXTERNA",
                areaM2:10000
            },
            {
                name:"HOSPITALIZACIÓN",
                areaM2:10000
            },
            {
                name:"EMERGENCIA",
                areaM2:10000,
            },
            {
                name:"CENTRO OBSTÉTRICO",
                areaM2:10000
            },
            {
                name:"CENTRO QUIRÚRGICO",
                areaM2:10000,
            },
            {
                name:"PATOLOGÍA CLÍNICA",
                areaM2:10000
            },
            {
                name:"DIAGNOSTICO POR IMÁGENES",
                areaM2:10000,
            },
            {
                name:"ANATOMÍA PATOLÓGICA",
                areaM2:10000
            },
            {
                name:"FARMACIA",
                areaM2:10000
            },
            {
                name:"CENTRAL DE ESTERILIZACIÓN",
                areaM2:10000
            },
            {
                name:"MEDICINA DE REHABILITACIÓN",
                areaM2:10000
            },
            {
                name:"HEMODIALISIS",
                areaM2:10000
            },
            {
                name:"NUTRICIÓN Y DIETÉTICA",
                areaM2:10000
            },
            {
                name:"SERVICIOS ADMINISTRATIVOS",
                areaM2:10000
            },
            {
                name:"SALA PEDIÁTRICA",
                areaM2:10000
            },
            {
                name:"SALA NEONATAL",
                areaM2:10000
            },
            {
                name:"SALA MATERNIDAD",
                areaM2:10000
            }
        ];

        for(const infra of infras){
            await InfrastructureService.createInfrastructure(infra);
        }

        console.info("Sembrado de Infraestructura completado con éxito.");
    }catch(error){
        console.error("Falló el proceso de seeding de Infrastructura:", error);
    }
}

const seedCPMS = async() =>{
    try{
        console.info("Iniciando el sembrado (Seeding) de CPMS");

        //SOLO PAARA DEV, eso preguntar a GONZALO para leerlo en csv

        const cpmsList : CreateMedicalProcedureInput[] =[
            {
                cpmsCode:"99201",
                name: "Consulta ambulatoria para la evaluación y manejo de un paciente nuevo nivel de atención 1"
            },
            {
                cpmsCode:"99152",
                name:"Tratamiento de oxigenoterapia hiperbarica en camilia, por sesion"
            },
            {
                cpmsCode:"70540.01",
                name:"Resonancia magnetica de aides, sin contraste"
            }
        ]

        for(const cpm of cpmsList){
            await MedicalProcedureModel.create(cpm);
        }

        console.info("Sembrado de CPMS completado con éxito.");

    }
    catch(error){
        console.error("Falló el proceso de seeding de CPMS:", error);
    }
}

const seedEquipments = async () => {
    try {
        console.info("🌱 Inicializando catálogo de equipamiento basado en la Tabla N° 14 del MINSA...");

        const minsaTemplates: CreateEquipmentInput[] = [
            {
                name: "Escritorio",
                description: "Mobiliario administrativo para consultorio / área médica",
                typeEquipment: TEquipmentEnum.MUEBLES.toString(),
                usefulLifeYears: 10, 
                sigaCode: "531100010001", 
                isGroupAsset: true 
            },
            {
                name: "Silla",
                description: "Silla ergonómica para personal asistencial o paciente",
                typeEquipment: TEquipmentEnum.MUEBLES.toString(),
                usefulLifeYears: 10, 
                sigaCode: "531100010002",
                isGroupAsset: true,
            },
            {
                name: "Estetoscopio",
                description: "Instrumental médico clínico esencial para auscultación",
                typeEquipment: TEquipmentEnum.EQUIPAMIENTO.toString(),
                usefulLifeYears: 3, 
                sigaCode: "531100020001",
                isGroupAsset: false ,
            },
            {
                name: "Tensiómetro",
                description: "Equipo analógico o digital para toma de presión arterial",
                typeEquipment: TEquipmentEnum.EQUIPAMIENTO.toString(),
                usefulLifeYears: 10, 
                sigaCode: "531100020002",
                isGroupAsset: false
            },
            {
                name: "Camilla",
                description: "Mobiliario clínico para examen y descanso del paciente",
                typeEquipment: TEquipmentEnum.MUEBLES.toString(),
                usefulLifeYears: 10, 
                sigaCode: "531100010003",
                isGroupAsset: false
            }
        ];

        for (const eq of minsaTemplates) {
            await EquipmentService.createEquipment(eq);
        }

        console.info("Catálogo sembrado con éxito en PostgreSQL.");
    } catch (error) {
        console.error("Error al ejecutar el seeding de equipamiento:", error);
    }
};

const seedSupplies = async () => {
    try {
        console.info("🌱 Inicializando catálogo de insumos basado en las Tablas N° 12 y Hoja de Costeo MINSA...");

        const minsaSupplies: CreateSupplyInput[] = [
            {
                sigaCode: "150500010001",
                name: "Formato de historia clínica",
                type: TypeSupplyEnum.FUNGIBLE.toString(),
                consumptionUnit: "Hoja" 
            },
            {
                sigaCode: "710600020015",
                name: "Lapicero",
                type: TypeSupplyEnum.NO_FUNGIBLE.toString(), 
                consumptionUnit: "Unidad" 
            },
            {
                sigaCode: "150700040002",
                name: "Baja lenguas",
                type: TypeSupplyEnum.FUNGIBLE.toString(),
                consumptionUnit: "Unidad" 
            },
            {
                sigaCode: "151200020120",
                name: "Guantes quirúrgicos",
                type: TypeSupplyEnum.FUNGIBLE.toString(),
                consumptionUnit: "Par" 
            },
            {
                sigaCode: "151000050004",
                name: "Alcohol gel",
                type: TypeSupplyEnum.FUNGIBLE.toString(),
                consumptionUnit: "cm³", 
            },
            {
                sigaCode: "150500010022",
                name: "Formato receta única estandarizada",
                type: TypeSupplyEnum.FUNGIBLE.toString(),
                consumptionUnit: "Hoja" 
            }
        ];

        for (const supply of minsaSupplies) {
            await SupplyService.createSupply(supply);
        }

        console.info("Todos los insumos del caso clínico de validación han sido sembrados.");
    } catch (error) {
        console.error("Error al sembrar los insumos:", error);
    }
};
