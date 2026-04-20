import { useNavigate } from 'react-router-dom';
import { MapingoMetricGrid, MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';
import { useMapingoStore } from '../../../store/useMapingoStore';

function PremiumStatusPage() {
  const navigate = useNavigate();
  const subscriptionPlan = useMapingoStore((state) => state.subscriptionPlan);
  const subscriptionProductId = useMapingoStore((state) => state.subscriptionProductId);
  const label =
    subscriptionPlan === 'Premium'
      ? subscriptionProductId === 'monthly'
        ? 'Premium Monthly'
        : 'Premium Yearly'
      : 'Free Plan';

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Premium"
        title="구독 상태"
        description="현재 적용 중인 플랜과 결제 처리 결과를 프론트 기준으로 확인하는 화면입니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/premium')}>
            프리미엄 메인으로
          </button>
        </div>
        <MapingoMetricGrid
          items={[
            { label: '현재 플랜', value: label, hint: '적용 상태' },
            { label: '구독 유형', value: subscriptionProductId === 'monthly' ? '월간' : '연간', hint: '선택 상품' },
            { label: '프리미엄 접근', value: subscriptionPlan === 'Premium' ? '활성' : '비활성', hint: '기능 사용 상태' },
          ]}
        />
      </MapingoPageSection>

      <div className="mapingo-page-actions">
        <button type="button" className="mapingo-submit-button" onClick={() => navigate('/premium/checkout')}>
          결제 처리 보기
        </button>
      </div>
    </div>
  );
}

export default PremiumStatusPage;
