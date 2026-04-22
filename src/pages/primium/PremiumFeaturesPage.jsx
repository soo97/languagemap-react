import { Navigate } from 'react-router-dom';

// Deprecated: Premium features have been consolidated into the plans page.
export default function PremiumFeaturesPage() {
  return <Navigate to="/premium/plans" replace />;
}
