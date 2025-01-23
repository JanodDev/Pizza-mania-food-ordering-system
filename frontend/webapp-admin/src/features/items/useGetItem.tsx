import { getOnePizza } from '@/services/apiItems';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function useGetItem() {
  const { itemId } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['items', itemId],
    queryFn: () => getOnePizza(itemId),
  });
  return { isLoading, data, error };
}
