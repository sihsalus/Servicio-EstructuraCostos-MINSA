import { z } from "zod";
import { EntitySchema } from "@/interfaces/Entity";

export const EquipmentSchema = EntitySchema.extend({
    name: z.string(),
    description: z.string().optional(),
    typeEquipment:z.string(),
    usefulLifeYears: z.number(),
    sigaCode: z.string().optional(),
    isGroupAsset: z.boolean()
});

export type Equipment = z.infer<typeof EquipmentSchema>;

export const CreateEquipmentSchema = EquipmentSchema.pick({
    name: true,
    description: true,
    typeEquipment: true,
    usefulLifeYears: true,
    sigaCode:true,
    isGroupAsset:true
}).extend({
    createdBy:z.string().optional()
});

export type CreateEquipmentInput = z.infer<typeof CreateEquipmentSchema>;
