import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '../lib/modules/fetchClient';

export const useLanguages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: () => fetchClient.getAllLanguages(),
  });

  return { data, isLoading };
};

export const useQualityProfiles = (text: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['qualityprofile', text],
    queryFn: () => fetchClient.getQualityProfilesByLanguage(text),
    enabled: !!text,
  });

  return { data, isFetching };
};
