import CostStructureConst from "@/const/CostStructureConst";
import { EntitySchema } from "@/interfaces/Entity";
import z from "zod";

export const FiscalYearSchema = EntitySchema.extend({
    fiscalYear: z.number().min(CostStructureConst.MIN_YEAR_COST_SYSTEM).max(CostStructureConst.MAX_YEAR_COST_SYSTEM),
    uitValue: z.number().positive(),
    legalBase: z.string().default("")
});

export type FiscalYearI = z.infer<typeof FiscalYearSchema>;

export const FiscalYearPickSchema = FiscalYearSchema.pick({
    fiscalYear: true,
    uitValue: true,
    legalBase:true,
});

export const CreateFiscalYearSchema = FiscalYearSchema.pick({
    fiscalYear: true,
    uitValue: true,
    legalBase:true,
    createdBy: true,
});

export type CreateFiscalYearInput = z.infer<typeof CreateFiscalYearSchema>
export type FiscalYear = z.infer<typeof FiscalYearPickSchema>

