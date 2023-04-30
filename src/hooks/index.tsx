import {
  type Dispatch,
  type SetStateAction,
  useRef,
  useEffect,
  useState,
  useCallback,
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

import synchroIndexedDb from "../lib/service/dexie";
import { reactQueryClient } from "../lib/modules/reactQuery";

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

  const [flattedData, setFlattedData] = useState([]);

  const isAvailableToShow = Boolean(lang_id && qualityProfile_id);

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
    enabled: isAvailableToShow,
    keepPreviousData: true,
  });

  useEffect(() => {
    setPage(1);
  }, [type, severity, isActiveSonar, qualityProfile_id]);

  //TODO: el parse de data no es responsabilidad de este component, cambiar a como viene la data
  const parseFlattedData = useCallback(async () => {
    if (!isAvailableToShow) return;

    const parsedData = data?.map(({ rules, ...rest }) => ({
      ...rules,
      ...rest,
    }));

    const cache = await synchroIndexedDb.getLocalRules(
      parsedData.map(({ id }) => Number(id))
    );

    const cacheBy = cache.reduce((acmPojo, { id, newStatus }) => {
      acmPojo[id] = newStatus;
      return acmPojo;
    }, {});

    const flattedData = parsedData.map((parsedItem) => ({
      ...parsedItem,
      isActive: cacheBy[parsedItem.id] ?? parsedItem.isActive,
    }));

    setFlattedData(flattedData);
  }, [data, isAvailableToShow]);

  useEffect(() => {
    parseFlattedData();
  }, [data, page, parseFlattedData]);

  return [
    setPage,
    setRowsPerPage,
    {
      data: flattedData,
      isLoading: isFetching,
      total: totalRef.current,
      page,
      rowsPerPage,
    },
  ];
};

export const useSynchro = (): [() => Promise<void>, boolean] => {
  const [isProcessing, setIsProcessing] = useState(false);

  const synchroStatus = useCallback(async () => {
    setIsProcessing(true);

    const changes = await synchroIndexedDb.rulesStatus.toArray();

    await fetchClient.postNewStatus(changes);

    await synchroIndexedDb.rulesStatus.clear();

    await reactQueryClient.invalidateQueries({ queryKey: ["rules"] });

    setPage(1);
    setIsProcessing(false);
  }, []);

  return [synchroStatus, isProcessing];
};
