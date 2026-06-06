import { DataTypes,Model } from "sequelize";

class EntityModel extends Model {
    private id!: number;
    private uuid!: string;
    private createdAt!: Date;
    private createdBy!: string;
    private changedAt?: Date;
    private changedBy?: string;
    private active!: boolean;
    private retireBy?: string;
    private retireAt?: Date;
    private retireReason?: string;

    static attributesModel() {
        return{
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUID, allowNull: false },
            createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            createdBy: { type: DataTypes.STRING, allowNull: false },
            active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
            changedAt: { type: DataTypes.DATE, allowNull: true },
            changedBy: { type: DataTypes.STRING, allowNull: true },
            retireBy: { type: DataTypes.STRING, allowNull: true },
            retireAt: { type: DataTypes.DATE, allowNull: true },
            retireReason: { type: DataTypes.STRING, allowNull: true },
        }
    };

    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUuid(): string | undefined {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(date: Date): void {
        this.createdAt = date;
    }

    public getCreatedBy(): string {
        return this.createdBy;
    }

    public setCreatedBy(user: string): void {
        this.createdBy = user;
    }

    public getChangedAt(): Date | undefined {
        return this.changedAt;
    }

    public setChangedAt(date?: Date): void {
        this.changedAt = date;
    }

    public getChangedBy(): string | undefined {
        return this.changedBy;
    }

    public setChangedBy(user?: string): void {
        this.changedBy = user;
    }

    public getActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public getRetireBy(): string | undefined {
        return this.retireBy;
    }

    public setRetireBy(user?: string): void {
        this.retireBy = user;
    }

    public getRetireAt(): Date | undefined {
        return this.retireAt;
    }

    public setRetireAt(date?: Date): void {
        this.retireAt = date;
    }

    public getRetireReason(): string | undefined {
        return this.retireReason;
    }

    public setRetireReason(reason?: string): void {
        this.retireReason = reason;
    }
}

export default EntityModel;