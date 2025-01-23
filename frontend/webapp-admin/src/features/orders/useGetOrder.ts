import { getOrder } from '@/services/apiOrders';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function useGetOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: orderData,
    error,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId),
  });
  return { isLoading, orderData, error };
}
