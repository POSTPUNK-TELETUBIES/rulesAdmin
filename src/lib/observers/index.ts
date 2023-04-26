import { createSignal } from "@react-rxjs/utils";
import { bind } from "@react-rxjs/core";

export const [languageFilterChange$, setLanguageFilter] =
  createSignal<string>();
export const [useLanguageFilter] = bind(languageFilterChange$, "");

export const [ruleTypeFilterChange$, setRuleTypeFilterChange] =
  createSignal<string>();
export const [useRuleTypeFilter] = bind(ruleTypeFilterChange$, "all");

export const [activateFilterChange$, setActivateFilterChange] = createSignal<
  string | null
>();
export const [useActiveFilter] = bind(activateFilterChange$, null);

export const [severityFilterChange$, setSeverityFilterChange] = createSignal<
  string | boolean
>();
export const [useSeverityFilter] = bind(severityFilterChange$, "all");

export const [qualityProfileFilterChange$, setQualityProfileFilterChange] =
  createSignal<string>();
export const [useQualityProfileFilter] = bind(qualityProfileFilterChange$, "");

export const [totalStatus$, setTotalStatus$] = createSignal<
  number | null | undefined
>();
export const [useTotalStatus] = bind(totalStatus$, 0);

export const [page$, setPage] = createSignal<string>();
export const [useSetPage] = bind(page$, 1);

export const [openMenu$, setOpenMenu] = createSignal<boolean>();
export const [useSetOpenMenu] = bind(openMenu$, false);
