import { Navigate } from 'react-router-dom';

// Deprecated: Premium status page has been consolidated into the plans page.
export default function PremiumStatusPage() {
  return <Navigate to="/premium/plans" replace />;
}
