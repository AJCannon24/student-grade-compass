
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // If auth is still loading, show nothing or a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // If no user is logged in, redirect to login page
  if (!user) {
    toast({
      title: "Access Denied",
      description: "You need to be logged in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  
  // If admin access is required but user is not admin, redirect
  if (requireAdmin && !isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }
  
  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
