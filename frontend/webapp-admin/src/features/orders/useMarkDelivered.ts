import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markDelivered } from '@/services/apiOrders'; // Adjust the import path as needed

export default function useMarkDelivered() {
  const queryClient = useQueryClient();

  const { mutate: markOrderDelivered, isLoading: isMarking } = useMutation({
    mutationFn: (orderId) => markDelivered(orderId),
    onSuccess: () => {
      alert('Order marked as delivered successfully');
      // Invalidate both orders list and single order queries
      queryClient.invalidateQueries({ queryKey: ['orders', 'order'] });
    },
    onError: (err) => alert(err.message),
  });

  return { markOrderDelivered, isMarking };
}
