import { z } from "zod";

export const CreateCostStructureSchema = z.object({
    medicalProcedureId: z.number({ error: "El ID del procedimiento médico es obligatorio" }),
    fiscalYearId: z.number({ error: "El ID del año fiscal es obligatorio" }),
    totalTimeMinutes: z.number().int().min(1, "El tiempo total estimado debe ser de al menos 1 minuto"),
    totalStandarCost: z.number().min(0, "El costo estándar no puede ser negativo")
});

export type CreateCostStructureInput = z.infer<typeof CreateCostStructureSchema>;