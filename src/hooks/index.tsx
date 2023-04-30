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

import syncroIndexedDb from "../lib/service/dexie";
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

  const [flatedData, setFlatedData] = useState([]);

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

  useEffect(() => {
    setPage(1);
  }, [type, severity, isActiveSonar, qualityProfile_id]);

  //TODO: el parse de data no es responsabildiad de este componente, cambiar a como viene la data
  const parseFlatedData = useCallback(async () => {
    if (!isAvailabletoShow) return;

    const parsedData = data?.map(({ rules, ...rest }) => ({
      ...rules,
      ...rest,
    }));

    const cache = await syncroIndexedDb.getLocalRules(
      parsedData.map(({ id }) => Number(id))
    );

    const cacheBy = cache.reduce((acumPojo, { id, newStatus }) => {
      acumPojo[id] = newStatus;
      return acumPojo;
    }, {});

    const flatedData = parsedData.map((parsedItem) => ({
      ...parsedItem,
      isActive: cacheBy[parsedItem.id] ?? parsedItem.isActive,
    }));

    setFlatedData(flatedData);
  }, [data, isAvailabletoShow]);

  useEffect(() => {
    parseFlatedData();
  }, [data, page, parseFlatedData]);

  return [
    setPage,
    setRowsPerPage,
    {
      data: flatedData,
      isLoading: isFetching,
      total: totalRef.current,
      page,
      rowsPerPage,
    },
  ];
};

export const useSyncro = (): [() => Promise<void>, boolean] => {
  const [isProcessing, setIsProcessing] = useState(false);

  const syncroStatus = useCallback(async () => {
    setIsProcessing(true);

    const changes = await syncroIndexedDb.rulesStatus.toArray();

    await fetchClient.postNewStatus(changes);

    await syncroIndexedDb.rulesStatus.clear();

    await reactQueryClient.invalidateQueries({ queryKey: ["rules"] });

    setPage(1);
    setIsProcessing(false);
  }, []);

  return [syncroStatus, isProcessing];
};
