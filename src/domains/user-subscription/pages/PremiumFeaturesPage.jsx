import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';
import { subscriptionService } from '../../../api/subscription/subscriptionService';

function PremiumFeaturesPage() {
  const navigate = useNavigate();
  const featureAccess = subscriptionService.fetchPremiumFeatureAccess();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="프리미엄" title="프리미엄 혜택" description="유료 사용자 전용 기능만 따로 모아서 볼 수 있는 화면이에요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/premium')}>
            프리미엄 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <div className="mapingo-dashboard-grid">
        {featureAccess.map((feature) => (
          <article key={feature.id} className="mapingo-detail-card">
            <h3>{feature.title}</h3>
            <p>{feature.unlockedCopy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default PremiumFeaturesPage;
