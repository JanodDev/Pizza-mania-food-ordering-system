import { updatePizza } from '@/services/apiItems';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateItems() {
  const queryClient = useQueryClient();

  const { mutate: updateExistingPizza, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, updatedPizza }) => updatePizza(id, updatedPizza),
    onSuccess: () => {
      alert('Item successfully updated');
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (err) => alert(err.message),
  });

  return { updateExistingPizza, isUpdating };
}
