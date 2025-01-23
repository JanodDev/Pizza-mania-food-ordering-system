import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProductsWithCategory } from '../services/pizzaManiaAPI';

export function useGetProducts() {
  const { type } = useParams();

  const {
    isLoading,
    data: productData,
    error,
  } = useQuery({
    queryKey: ['products', type],
    queryFn: () => getProductsWithCategory(type),
  });
  return { isLoading, productData, error };
}
