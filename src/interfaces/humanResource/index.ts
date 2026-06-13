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