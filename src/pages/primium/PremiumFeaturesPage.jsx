import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { subscriptionService } from '../../api/subscriptionService';

function PremiumFeaturesPage() {
  const navigate = useNavigate();
  const featureAccess = subscriptionService.fetchPremiumFeatureAccess();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Premium"
        title="프리미엄 기능"
        description="프론트 단계에서 AI 채팅, STT, 발음 평가처럼 아직 API가 연결되지 않은 기능의 화면 흐름을 먼저 검증할 수 있도록 구성했습니다."
      >
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
            {feature.id === 'stt' ? (
              <button type="button" className="mapingo-link-button" onClick={() => navigate('/ai/stt')}>
                STT 화면 보기
              </button>
            ) : null}
            {feature.id === 'pronunciation' ? (
              <button type="button" className="mapingo-link-button" onClick={() => navigate('/ai/pronunciation')}>
                발음 평가 보기
              </button>
            ) : null}
            {feature.id === 'face-chat' ? (
              <button type="button" className="mapingo-link-button" onClick={() => navigate('/ai-chat')}>
                AI 채팅 보기
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export default PremiumFeaturesPage;
