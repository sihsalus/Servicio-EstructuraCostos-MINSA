import { EquipmentCostSchema } from "@/interfaces/equipment";
import { RrhhCostSchema } from "@/interfaces/humanResource";
import { InfrastructureCostSchema } from "@/interfaces/infra";
import { SupplyCostSchema } from "@/interfaces/supply";
import { z } from "zod";


const ActivityCostExecutionSchema = z.object({
    activity_id: z.number(),
    time_minutes: z.number().min(1),
    total_activity_cost: z.number().min(0),
    rrhhCosts: z.array(RrhhCostSchema),
    supplyCosts: z.array(SupplyCostSchema),
    equipmentCosts: z.array(EquipmentCostSchema)
});
export const CreateCostStructureSchema = z.object({
    medicalProcedureId: z.number({ error: "El ID del procedimiento médico es obligatorio" }),
    fiscalYearId: z.number({ error: "El ID del año fiscal es obligatorio" }),
    totalTimeMinutes: z.number().int().min(1, "El tiempo total estimado debe ser de al menos 1 minuto"),
    totalStandarCost: z.number().min(0, "El costo estándar no puede ser negativo"),
    activitiesCost: z.array(ActivityCostExecutionSchema),
    infrastructureCost: z.array(InfrastructureCostSchema)
});

export type CreateCostStructureInput = z.infer<typeof CreateCostStructureSchema>;

