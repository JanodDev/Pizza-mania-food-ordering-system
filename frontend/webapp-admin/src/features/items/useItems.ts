import { getPizza } from '@/services/apiItems';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function useItems() {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ['items'],
    queryFn: getPizza,
  });
  return { isLoading, data, error };
}
