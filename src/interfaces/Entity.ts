import {z} from "zod";

export interface EntityI {
    id: number;
    uuid: string;
    createdAt: Date;
    createdBy: string;
    changedAt?: Date;
    changedBy?: string;
    active: boolean;
    retireBy?: string;
    retireAt?: Date;
    retireReason?: string;
};

export const EntitySchema = z.object({
  id: z.number().default(-1), // If the object was generated outsie of the DB, is going to have -1 as id
  uuid: z.string().default('00000000-0000-0000-0000-000000000000'), // If the object was generated outsie of the DB, is going to have a default uuid
  createdAt: z.date().default(new Date()),
  createdBy: z.string().default('system'),
  changedAt: z.date().optional(),
  changedBy: z.string().nullish(),
  active: z.boolean().default(true),
  retireBy: z.string().nullish(),
  retireAt: z.date().nullish(),
  retireReason: z.string().nullish(),
});


class Entity {
    id?: number;
    uuid?: string;
    createdAt: Date;
    createdBy: string;
    changedAt?: Date;
    changedBy?: string;
    active: boolean;
    retireBy?: string;
    retireAt?: Date;
    retireReason?: string;

    constructor(aux: EntityI){
        const result = EntitySchema.safeParse(aux);
        if (!result.success) {
            const newError = new Error('Error in Entity Format (object) - Invalid EntityInterface - constructor');
            (newError as any).details = result.error;
            throw newError;
        }
        this.id = aux.id;
        this.uuid = aux.uuid;
        this.createdAt = new Date(aux.createdAt);
        this.createdBy = aux.createdBy;
        this.changedAt = aux.changedAt ? new Date(aux.changedAt) : undefined;
        this.changedBy = aux.changedBy;
        this.active = aux.active;
        this.retireBy = aux.retireBy;
        this.retireAt = aux.retireAt ? new Date(aux.retireAt) : undefined;
        this.retireReason = aux.retireReason;
    }


    get getId() { return this.id; }
    //set setId(value: number) { this.id = value; }

    get getUuid() { return this.uuid; }
    //set setUuid(value: string) { this.uuid = value; }

    get getCreatedBy() { return this.createdBy; }
    //set setCreatedBy(value: string) { this.createdBy = value; }

    get getChangedBy() { return this.changedBy; }
    set setChangedBy(value: string | undefined) { this.changedBy = value; }

    get getActive() { return this.active; }
    set setActive(value: boolean) { this.active = value; }

    get getRetireBy() { return this.retireBy; }
    set setRetireBy(value: string | undefined) { this.retireBy = value; }

    get getRetireAt() { return this.retireAt; }
    set setRetireAt(value: Date | undefined) { this.retireAt = value; }
    get getRetireReason() { return this.retireReason; }
    set setRetireReason(value: string | undefined) { this.retireReason = value; }

    get getCreatedAt() { return this.createdAt; }
    //set setCreatedAt(value: Date) { this.createdAt = value; }

    get getChangedAt() { return this.changedAt; }
    //set setChangedAt(value: Date) { this.changedAt = value; }
};


export default Entity;