import { Navigate } from 'react-router-dom';

// Deprecated: learning settings moved to Growth > Goals.
export default function SettingsLearningPage() {
  return <Navigate to="/growth/goals" replace />;
}
