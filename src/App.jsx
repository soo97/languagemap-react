import { Navigate, Route, Routes } from 'react-router-dom';
import MapingoLayout from './domains/home-support-common/layout/MapingoLayout';
import LandingHomePage from './domains/home-support-common/pages/LandingHomePage';
import MapPage from './domains/place/pages/MapPage';
import GrowthPage from './domains/history-analysis/pages/GrowthPage';
import GrowthProgressPage from './domains/history-analysis/pages/GrowthProgressPage';
import GrowthGoalsPage from './domains/history-analysis/pages/GrowthGoalsPage';
import GrowthInsightsPage from './domains/history-analysis/pages/GrowthInsightsPage';
import CommunityPage from './domains/learning-social-favorite/pages/CommunityPage';
import CommunityFriendsPage from './domains/learning-social-favorite/pages/CommunityFriendsPage';
import CommunityRankingPage from './domains/learning-social-favorite/pages/CommunityRankingPage';
import CommunityFavoritesPage from './domains/learning-social-favorite/pages/CommunityFavoritesPage';
import SupportPage from './domains/home-support-common/pages/SupportPage';
import SupportNoticesPage from './domains/home-support-common/pages/SupportNoticesPage';
import SupportFaqPage from './domains/home-support-common/pages/SupportFaqPage';
import SupportInquiryPage from './domains/home-support-common/pages/SupportInquiryPage';
import PremiumPage from './domains/user-subscription/pages/PremiumPage';
import PremiumPlansPage from './domains/user-subscription/pages/PremiumPlansPage';
import PremiumFeaturesPage from './domains/user-subscription/pages/PremiumFeaturesPage';
import PremiumStatusPage from './domains/user-subscription/pages/PremiumStatusPage';
import SettingsPage from './domains/home-support-common/pages/SettingsPage';
import SettingsLearningPage from './domains/home-support-common/pages/SettingsLearningPage';
import SettingsDisplayPage from './domains/home-support-common/pages/SettingsDisplayPage';
import SettingsAccountPage from './domains/home-support-common/pages/SettingsAccountPage';
import SignupPage from './domains/user-subscription/pages/SignupPage';
import ProfilePage from './domains/user-subscription/pages/ProfilePage';
import LoginPage from './domains/user-subscription/pages/LoginPage';
import ProtectedRoute from './domains/home-support-common/components/ProtectedRoute';
import GuestRoute from './domains/home-support-common/components/GuestRoute';

function App() {
  return (
    <Routes>
      <Route element={<MapingoLayout />}>
        <Route path="/" element={<LandingHomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/growth" element={<GrowthPage />} />
        <Route path="/growth/progress" element={<GrowthProgressPage />} />
        <Route path="/growth/goals" element={<GrowthGoalsPage />} />
        <Route path="/growth/insights" element={<GrowthInsightsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/friends" element={<CommunityFriendsPage />} />
        <Route path="/community/ranking" element={<CommunityRankingPage />} />
        <Route path="/community/favorites" element={<CommunityFavoritesPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/notices" element={<SupportNoticesPage />} />
        <Route path="/support/faq" element={<SupportFaqPage />} />
        <Route path="/support/inquiry" element={<SupportInquiryPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/premium/plans" element={<PremiumPlansPage />} />
        <Route path="/premium/features" element={<PremiumFeaturesPage />} />
        <Route path="/premium/status" element={<PremiumStatusPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/learning" element={<SettingsLearningPage />} />
        <Route path="/settings/display" element={<SettingsDisplayPage />} />
        <Route path="/settings/account" element={<SettingsAccountPage />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
