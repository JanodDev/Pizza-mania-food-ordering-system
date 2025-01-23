import { QueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginApi } from '@/services/apiAuth'; // Adjust path based on your structure

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      // Store the token and user data (this is already handled in your loginApi function)

      // Update the query cache with the user data
      queryClient.setQueryData(['user'], data.user);

      // Show success message
      toast.success('Successfully logged in!');

      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      alert('Login error:' + error);
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
    },
  });

  return { login, isLoading };
}
