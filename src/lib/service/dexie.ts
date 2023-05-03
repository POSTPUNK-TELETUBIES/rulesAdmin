import Dexie, { type Table } from "dexie";

export interface LocalRulesStatus {
  id: number;
  updated_at: Date;
  newStatus: boolean;
  languageId: string;
  qualityProfileId: string;
}

export class SyncroIndexedDb extends Dexie {
  private static instace: SyncroIndexedDb;
  rulesStatus!: Table<LocalRulesStatus>;

  static getInstance() {
    SyncroIndexedDb.instace ??= new SyncroIndexedDb();

    return SyncroIndexedDb.instace;
  }

  private constructor() {
    super("syncro");
    this.version(1).stores({
      rulesStatus: "id, updated_at, newStatus, language, qualityProfile",
    });
  }

  async getLocalRules(ids: number[]) {
    return await this.rulesStatus.where("id").anyOf(ids).toArray();
  }

  async countAllRules() {
    return await this.rulesStatus.count();
  }
}

export default SyncroIndexedDb.getInstance();
