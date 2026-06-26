import { EntitySchema } from "@/interfaces/Entity";
import z from "zod";

export const HumanResourceSchema = EntitySchema.extend({
    speciality: z.string()
});

export type HumanResource = z.infer<typeof HumanResourceSchema>;

export const CreateHumanResourceSchema = HumanResourceSchema.pick({
    speciality: true
}).extend({
    createdBy: z.string().optional()
});

export type CreateHumanResourceInput = z.infer<typeof CreateHumanResourceSchema>;

export const RrhhCostSchema = z.object({
    rrhh_id: z.number(),
    time_minutes: z.number().min(1),
    partial_cost: z.number().min(0)
});