import {
  type Dispatch,
  type SetStateAction,
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import {
  setPage,
  setTotalStatus$,
  useActiveFilter,
  useLanguageFilter,
  useQualityProfileFilter,
  useRuleTypeFilter,
  useSetPage,
  useSetTextmatchFilter as useSetTextMatchFilter,
  useSeverityFilter,
} from "../lib/observers";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../lib/modules/fetchClient";
import { RuleDTO, type RulesStatus } from "../types/supabase";

import synchroIndexedDb, { LocalRulesStatus } from "../lib/service/dexie";
import { reactQueryClient } from "../lib/modules/reactQuery";
import { AuthContext } from "../context/auth";

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

export const useGetAllFilters = () => {
  const severity = useSeverityFilter();
  const lang_id = useLanguageFilter();
  const isActiveSonar = useActiveFilter();
  const qualityProfile_id = useQualityProfileFilter();
  const type = useRuleTypeFilter();
  const page = useSetPage();
  const textMatchFilter = useSetTextMatchFilter();

  return {
    severity,
    lang_id,
    isActiveSonar,
    qualityProfile_id,
    type,
    page,
    textMatchFilter,
  };
};

export const useGetRulesStatus = (): UseGetRulesStatusResults => {
  const {
    isActiveSonar,
    lang_id,
    page,
    qualityProfile_id,
    severity,
    textMatchFilter,
    type,
  } = useGetAllFilters();

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
      textMatchFilter,
    ],
    async queryFn() {
      const filter = {
        severity,
        lang_id,
        isActiveSonar,
        qualityProfile_id,
        type,
      };

      const pagination = {
        page,
        limit: rowsPerPage,
      };

      // TODO: abstract to generalize new text match filter instead of having two separated methods
      const { data, count } = textMatchFilter
        ? await fetchClient.getByRuleName(textMatchFilter, filter, pagination)
        : await fetchClient.getPaginatedRulesByFilter(filter, pagination);

      totalRef.current = count;

      setTotalStatus$(count);

      return data;
    },
    enabled: isAvailableToShow,
    keepPreviousData: true,
  });

  useEffect(() => {
    setPage(1);
  }, [type, severity, isActiveSonar, qualityProfile_id, textMatchFilter]);

  //TODO: el parse de data no es responsabilidad de este component, cambiar a como viene la data
  const parseFlattedData = useCallback(async () => {
    if (!isAvailableToShow) return;

    const parsedData = data?.map(({ rules, ...rest }) => ({
      ...rules,
      ...rest,
    }));

    const cache = parsedData
      ? await synchroIndexedDb.getLocalRules(
          parsedData.map(({ id }) => Number(id))
        )
      : [];

    const cacheBy: Record<string | number, LocalRulesStatus> = cache.reduce(
      (acmPojo, cacheItem) => {
        acmPojo[cacheItem.id] = cacheItem;

        return acmPojo;
      },
      {}
    );

    const flattedData = parsedData?.map((parsedItem) => ({
      ...parsedItem,
      isActive: cacheBy[parsedItem.id]?.newStatus ?? parsedItem.isActive,
      description:
        cacheBy[parsedItem.id]?.description ?? parsedItem.description,
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

export const useDeleteChanges = (): [() => Promise<void>, boolean] => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteChanges = useCallback(async () => {
    setIsDeleting(true);

    await synchroIndexedDb.rulesStatus.clear();

    await reactQueryClient.invalidateQueries({ queryKey: ["rules"] });

    setPage(1);

    setIsDeleting(false);
  }, []);

  return [deleteChanges, isDeleting];
};

export const useAuth = () => {
  const authClient = useContext(AuthContext);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    authClient.checkAuth().then((data) => setIsLogged(!!data?.user?.id));
  }, [authClient]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await authClient.login(email, password);

      setIsLogged(true);

      return data;
    },
    [authClient]
  );

  return { isLogged, authClient, login };
};
