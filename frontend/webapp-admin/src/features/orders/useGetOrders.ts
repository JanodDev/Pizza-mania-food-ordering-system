import { getOrders } from '@/services/apiOrders';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function useOrders() {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
  return { isLoading, data, error };
}
