import { adapterClassCardList, getClasses } from '@/src/entities/class';
import { useQuery } from '@tanstack/react-query';

export function useGetClasses() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: getClasses,
    select: adapterClassCardList,
  });
}
