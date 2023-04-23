import { createSignal } from "@react-rxjs/utils"
import { bind } from "@react-rxjs/core"
import { Severity, Type } from "../../types/supabase"

export const [ languageFilterChange$, setLanguageFilter ] = createSignal<string>()
export const [ useLanguageFilter ] = bind(languageFilterChange$, "")


export const [ ruleTypeFilterChange$, setRuleTypeFilterChange ] = createSignal<string>()
export const [ useRuleTypeFilter ] = bind(ruleTypeFilterChange$, Type.Bug)


export const [ activateFilterChange$, setActivateFilterChange ] = createSignal<boolean>()
export const [ useActiveFilter ] = bind(activateFilterChange$, true)


export const [ severityFilterChange$, setSeverityFilterChange ] = createSignal<string>()
export const [ useSeverityFilter ] = bind(severityFilterChange$, Severity.Blocker)

export const [qualityProfileFilterChange$, setQualityProfileFilterChange] =  createSignal<string>()
export const [ useQualityProfileFilter ] = bind(qualityProfileFilterChange$, '')
