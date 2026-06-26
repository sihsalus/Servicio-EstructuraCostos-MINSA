import { EntitySchema } from "@/interfaces/Entity";
import z from "zod";

export const SupplySchema = EntitySchema.extend({
    sigaCode: z.string().optional(),
    name:z.string(),
    type: z.string(),
    consumptionUnit:z.string()
});

export type Supply = z.infer<typeof SupplySchema>;

export const CreateSupplySchema = SupplySchema.pick({
    sigaCode:true,
    name:true,
    type: true, 
    consumptionUnit: true
}).extend({
    createdBy: z.string().optional()
});

export type CreateSupplyInput = z.infer<typeof CreateSupplySchema>;

export const SupplyCostSchema = z.object({
    supply_id: z.number(),
    supply_info_history_id: z.number(),
    quantity: z.number().min(1),
    partial_cost: z.number().min(0)
});