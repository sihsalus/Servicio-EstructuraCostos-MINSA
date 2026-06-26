import { z } from "zod";
import { EntitySchema } from "@/interfaces/Entity";

export const InfrastructureSchema = EntitySchema.extend({
    name: z.string(),
    description: z.string().optional(),
    areaM2:z.number()
});

export type Infrastructure = z.infer<typeof InfrastructureSchema>;

export const CreateInfrastructureSchema = InfrastructureSchema.pick({
    name: true,
    description: true,
    areaM2: true
}).extend({
    createdBy:z.string().optional()
});

export type CreateInfrastructureInput = z.infer<typeof CreateInfrastructureSchema>;

export const CreateUpssAnnualConfigSchema = z.object({
    infrastructureId: z.number({ message: "El ID de la infraestructura (UPSS) es obligatorio" }),
    fiscalYearId: z.number({ message: "El ID del año fiscal es obligatorio" }),
    projectedAnnualProcedures: z.number().int().min(1, "La producción proyectada debe ser mayor a 0"),
    
    //valoresq depues debo validar
    energyWeight: z.union([z.literal(2), z.literal(1.5), z.literal(1)], {
        message: "El peso de energía debe ser 2 (Alto), 1.5 (Medio) o 1 (Bajo)"
    }),
    waterWeight: z.union([z.literal(2), z.literal(1.5), z.literal(1)], {
        message: "El peso de agua debe ser 2 (Alto), 1.5 (Medio) o 1 (Bajo)"
    }),
    phoneWeight: z.union([z.literal(2), z.literal(1.5), z.literal(1)], {
        message: "El peso de teléfono debe ser 2 (Alto), 1.5 (Medio) o 1 (Bajo)"
    })
});

export const InfrastructureCostSchema = z.object({
    infrastructure_id: z.number(),
    price_history_id: z.number(),
    partial_cost: z.number().min(0) 
});

export type CreateUpssAnnualConfigInput = z.infer<typeof CreateUpssAnnualConfigSchema>;
