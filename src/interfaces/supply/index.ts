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