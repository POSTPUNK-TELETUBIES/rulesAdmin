export enum Severity {
  Blocker = "BLOCKER",
  Critical = "CRITICAL",
  Info = "INFO",
  Major = "MAJOR",
  Minor = "MINOR",
}

export enum Type {
  Bug = "BUG",
  CodeSmell = "CODE_SMELL",
  SecurityHotspot = "SECURITY_HOTSPOT",
  Vulnerability = "VULNERABILITY",
}

export interface RulesCreateDTO {
  key: string;
  lang_id: string;
  name: string;
  htmlDesc?: string;
  severity?: Severity;
  type?: Type;
  description?: string;
}

export interface RuleDTO extends RulesCreateDTO {
  id: string;
}

export interface RulesStatusCreateDTO {
  isActive: boolean;
  isActiveSonar: boolean;
  qualityProfile_id: string;
  rule_id: string;
  lastActualization?: Date;
  updated_at: Date;
}

export interface QualityProfileCreateDTO {
  key: string;
  name: string;
  language_id: string;
  updated_at: Date;
  isDefault: boolean;
}

export interface QualityProfileDTO extends QualityProfileCreateDTO {
  id: string;
  createdAt: Date;
}

export interface LanguageCreateDTO {
  name: string;
  alias: string;
}

export interface LanguageDTO extends LanguageCreateDTO {
  id: string;
}

export interface BasicRuleInfo {
  name: string;
}

export interface RulesStatus extends RulesStatusCreateDTO {
  id: string;
  created_at: Date;
}

export interface Database {
  public: {
    Tables: {
      rules: {
        Row: RuleDTO;
        Insert: RulesCreateDTO;
        Update: RulesCreateDTO;
      };
      status: {
        Row: RulesStatus;
        Insert: RulesStatusCreateDTO;
        Update: RulesStatusCreateDTO;
      };
      languages: {
        Row: LanguageDTO;
        Insert: LanguageCreateDTO;
        Update: LanguageCreateDTO;
      };
      qualityprofiles: {
        Row: QualityProfileDTO;
        Insert: QualityProfileCreateDTO;
        Update: QualityProfileCreateDTO;
      };
    };
  };
}

export interface RulesResponse extends RulesStatus {
  rules: RuleDTO;
}
