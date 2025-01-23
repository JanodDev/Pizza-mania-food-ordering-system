import { deletePizza, updatePizza } from '@/services/apiItems';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteItems() {
  const queryClient = useQueryClient();

  const { mutate: deleteSelectedPizza, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deletePizza(id),
    onSuccess: () => {
      alert('Item successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (err) => alert(err.message),
  });

  return { deleteSelectedPizza, isDeleting };
}
