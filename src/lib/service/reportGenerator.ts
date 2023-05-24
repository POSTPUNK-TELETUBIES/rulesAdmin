import { unparse } from 'papaparse';
import type { IReportGenerator } from '../../types/reports';
import type { RulesResponse } from '../../types/supabase';

class ReportGenerator implements IReportGenerator {
  private static instance: ReportGenerator;

  public static getInstance() {
    ReportGenerator.instance ??= new ReportGenerator();

    return ReportGenerator.instance;
  }

  parseReport(data: RulesResponse[]): string {
    const flattedData = data.map(({ rules, qualityprofiles, ...rest }) => ({
      ...rules,
      ...qualityprofiles,
      ...rest,
      ruleKey: rules.key,
      qualityProfileName: qualityprofiles.name,
      ruleName: rules.name,
    }));

    return unparse(flattedData, {
      columns: [
        'qualityProfileName',
        'ruleKey',
        'ruleName',
        'severity',
        'type',
        'updated_at',
        'created_at',
        'description',
        'isActiveSonar',
        'isActive',
        'user_email',
      ],
    });
  }
}

export default ReportGenerator.getInstance();
