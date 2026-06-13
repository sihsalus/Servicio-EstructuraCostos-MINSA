import { z } from "zod";
import { EntitySchema } from "@/interfaces/Entity";

export const InfrastructureSchema = EntitySchema.extend({
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    areaM2:z.number()
});

export type Infrastructure = z.infer<typeof InfrastructureSchema>;

export const CreateInfrastructureSchema = InfrastructureSchema.pick({
    code: true,
    name: true,
    description: true,
    areaM2: true
}).extend({
    createdBy:z.string().optional()
});

export type CreateInfrastructureInput = z.infer<typeof CreateInfrastructureSchema>;
