import Dexie, { type Table } from "dexie";
import { RuleDTO, RulesStatus } from "../../types/supabase";

export interface LocalRulesStatus {
  id: number;
  updated_at?: Date;
  newStatus?: boolean;
  languageId?: string;
  qualityProfileId?: number;
  description?: string;
}

export class SynchroIndexedDb extends Dexie {
  private static instance: SynchroIndexedDb;
  rulesStatus!: Table<LocalRulesStatus>;
  static rulesStatus: any;

  static getInstance() {
    SynchroIndexedDb.instance ??= new SynchroIndexedDb();

    return SynchroIndexedDb.instance;
  }

  private constructor() {
    super("syncro");
    this.version(3).stores({
      rulesStatus:
        "id, updated_at, newStatus, language, qualityProfileId, description",
    });
  }

  async getLocalRules(ids: number[]) {
    return await this.rulesStatus.where("id").anyOf(ids).toArray();
  }

  async countAllRules() {
    return await this.rulesStatus.count();
  }

  // TODO: 💩 bad abstraction , refactor since we are getting al data in a bad way
  async saveDescription(data: RuleDTO & RulesStatus, description: string) {
    const previuosData = await this.rulesStatus.get(data.id);

    return await this.rulesStatus.put({
      id: Number(data.id),
      languageId: data.lang_id,
      newStatus: data.isActive,
      qualityProfileId: Number(data.qualityProfile_id),
      ...previuosData,
      updated_at: new Date(),
      description,
    });
  }
}

export default SynchroIndexedDb.getInstance();
