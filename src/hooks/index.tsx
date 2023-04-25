import {
  type Dispatch,
  useMemo,
  type SetStateAction,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  setPage,
  setTotalStatus$,
  useActiveFilter,
  useLanguageFilter,
  useQualityProfileFilter,
  useRuleTypeFilter,
  useSetPage,
  useSeverityFilter,
} from "../lib/observers";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../lib/modules/fetchClient";
import { RuleDTO, type RulesStatus } from "../types/supabase";

interface UseGetRulesStatusData {
  data?: (RulesStatus & RuleDTO)[];
  isLoading: boolean;
  total?: number;
  page: number;
  rowsPerPage: number;
}

type UseGetRulesStatusResults = [
  Dispatch<SetStateAction<number>>,
  Dispatch<SetStateAction<number>>,
  UseGetRulesStatusData
];

export const useGetRulesStatus = (): UseGetRulesStatusResults => {
  const severity = useSeverityFilter();
  const lang_id = useLanguageFilter();
  const isActiveSonar = useActiveFilter();
  const qualityProfile_id = useQualityProfileFilter();
  const type = useRuleTypeFilter();
  const page = useSetPage();

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRef = useRef(0);

  const isAvailabletoShow = Boolean(lang_id && qualityProfile_id);

  const { data, isFetching } = useQuery({
    queryKey: [
      "rules",
      lang_id,
      qualityProfile_id,
      type,
      isActiveSonar,
      severity,
      page,
      rowsPerPage,
    ],
    async queryFn() {
      const { data, count } = await fetchClient.getPaginatedRulesByFilter(
        {
          severity,
          lang_id,
          isActiveSonar,
          qualityProfile_id,
          type,
        },
        {
          page,
          limit: rowsPerPage,
        }
      );

      totalRef.current = count;

      setTotalStatus$(count);

      return data;
    },
    enabled: isAvailabletoShow,
    keepPreviousData: true,
  });

  //TODO: el parse de data no es responsabildiad de este componente, cambiar a como viene la data
  const flatedResults = useMemo(
    () =>
      !isAvailabletoShow
        ? []
        : data?.map(({ rules, ...rest }) => ({ ...rules, ...rest })),
    [data, isAvailabletoShow]
  );

  useEffect(() => {
    setPage(1);
  }, [type, severity, isActiveSonar, qualityProfile_id]);

  return [
    setPage,
    setRowsPerPage,
    {
      data: flatedResults,
      isLoading: isFetching,
      total: totalRef.current,
      page,
      rowsPerPage,
    },
  ];
};
