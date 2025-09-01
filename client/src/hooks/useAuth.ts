import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    isSuperAdmin: user?.role === 'super_admin',
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
  };
}

export function useSignout() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/auth/signout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
      
      // Redirect to home
      setLocation('/');
    },
    onError: (error: any) => {
      toast({
        title: 'Error signing out',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    },
  });
}