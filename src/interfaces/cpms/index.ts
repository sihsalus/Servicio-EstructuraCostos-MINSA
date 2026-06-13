import { EntitySchema } from "@/interfaces/Entity";
import z from "zod";

export const MedicalProcedureSchema = EntitySchema.extend({
    cpmsCode: z.string(),
    name: z.string()
});

export type MedicalProcedure = z.infer<typeof MedicalProcedureSchema>;

export const CreateMedicalProcedureSchema = MedicalProcedureSchema.pick({
    cpmsCode:true,
    name: true
}).extend({
    createdBy: z.string().optional()
});

export type CreateMedicalProcedureInput = z.infer<typeof CreateMedicalProcedureSchema>;