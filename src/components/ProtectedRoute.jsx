import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMapingoStore } from '../store/useMapingoStore';

function ProtectedRoute({ redirectTo = '/login', requirePremium = false }) {
  const location = useLocation();
  const isAuthenticated = useMapingoStore((state) => state.isAuthenticated);
  const subscriptionPlan = useMapingoStore((state) => state.subscriptionPlan);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  if (requirePremium && subscriptionPlan !== 'Premium') {
    return <Navigate to="/premium" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
