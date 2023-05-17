import Dexie, { type Table } from "dexie";

export interface LocalRulesStatus {
  id: number;
  updated_at?: Date;
  newStatus?: boolean;
  languageId?: string;
  qualityProfileId?: string;
  description?: string;
}

export class SynchroIndexedDb extends Dexie {
  private static instace: SynchroIndexedDb;
  rulesStatus!: Table<LocalRulesStatus>;

  static getInstance() {
    SynchroIndexedDb.instace ??= new SynchroIndexedDb();

    return SynchroIndexedDb.instace;
  }

  private constructor() {
    super("syncro");
    this.version(2).stores({
      rulesStatus:
        "id, updated_at, newStatus, language, qualityProfile, description",
    });
  }

  async getLocalRules(ids: number[]) {
    return await this.rulesStatus.where("id").anyOf(ids).toArray();
  }

  async countAllRules() {
    return await this.rulesStatus.count();
  }

  async saveDescription(id: number, description: string) {
    console.log(id, description);
    return await this.rulesStatus.put({
      id,
      description,
    });
  }
}

export default SynchroIndexedDb.getInstance();
