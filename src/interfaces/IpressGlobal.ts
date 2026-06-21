import { z } from "zod";

export const CreateIpressGlobalCostSchema = z.object({
    fiscalYearId: z.number({ error: "El ID del año fiscal es obligatorio" }).int({ message: "El ID del año fiscal debe ser un número entero" }),
    energyAnnualCost: z.number({ error: "El costo anual de energía es obligatorio" }).min(0),
    waterAnnualCost: z.number({ error: "El costo anual de agua es obligatorio" }).min(0),
    phoneAnnualCost: z.number({ error: "El costo anual de teléfono/internet es obligatorio" }).min(0),
    adminAnnualCost: z.number({ error: "El costo anual de administración es obligatorio" }).min(0),
    generalServicesAnnualCost: z.number({ error: "El costo anual de servicios generales es obligatorio" }).min(0),
});

export type CreateIpressGlobalCostInput = z.infer<typeof CreateIpressGlobalCostSchema>;