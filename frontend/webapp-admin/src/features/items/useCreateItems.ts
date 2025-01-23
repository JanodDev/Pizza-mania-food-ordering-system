import { createPizza } from '@/services/apiItems';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateItems() {
  const queryClient = useQueryClient();
  const { mutate: createNewPizza, isLoading: isCreating } = useMutation({
    mutationFn: (newPizza) => createPizza(newPizza),
    onSuccess: () => {
      alert('New record created');
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (err) => alert(err.message),
  });
  return { createNewPizza, isCreating };
}
