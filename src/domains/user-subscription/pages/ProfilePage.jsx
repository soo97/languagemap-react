import { useNavigate } from 'react-router-dom';
import {
  MapingoActivityList,
  MapingoChecklist,
  MapingoInfoGrid,
  MapingoMetricGrid,
  MapingoPageSection,
} from '../../home-support-common/components/MapingoPageBlocks';
import { useMapingoStore } from '../../../store/useMapingoStore';
import { learningService } from '../../../api/learning/learningService';

function ProfilePage() {
  const navigate = useNavigate();
  const profileName = useMapingoStore((state) => state.profileName);
  const profileNickname = useMapingoStore((state) => state.profileNickname);
  const subscriptionPlan = useMapingoStore((state) => state.subscriptionPlan);
  const subscriptionProductId = useMapingoStore((state) => state.subscriptionProductId);
  const subscriptionUpdatedAt = useMapingoStore((state) => state.subscriptionUpdatedAt);
  const currentLevel = useMapingoStore((state) => state.currentLevel);
  const badgeCount = useMapingoStore((state) => state.badgeCount);
  const weeklyGoalCompleted = useMapingoStore((state) => state.weeklyGoalCompleted);
  const favoriteRouteIds = useMapingoStore((state) => state.favoriteRouteIds);
  const badgeCatalog = learningService.fetchBadgeCatalog();
  const earnedBadges = badgeCatalog.filter((badge) => badge.status === 'earned');
  const nextBadges = badgeCatalog.filter((badge) => badge.status !== 'earned');
  const isSubscriptionFresh = Boolean(subscriptionUpdatedAt);

  const subscriptionLabel =
    subscriptionPlan === 'Premium'
      ? subscriptionProductId === 'monthly'
        ? 'Premium Monthly'
        : 'Premium Yearly'
      : 'Free';
  const subscriptionDescription =
    subscriptionPlan === 'Premium'
      ? subscriptionProductId === 'monthly'
        ? '매달 가볍게 이어가는 프리미엄 코칭 플랜'
        : '장기 학습에 맞춘 연간 프리미엄 플랜'
      : '기본 학습 기능을 사용하는 무료 플랜';

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="My Profile"
        title={`${profileName}님의 학습 흐름과 관리 중인 루트를 한곳에서 확인해보세요`}
        description={`${profileNickname} 프로필을 기준으로 학습 레벨, 배지, 즐겨찾기 루트와 현재 구독 플랜까지 한눈에 볼 수 있어요.`}
      >
        <div
          key={isSubscriptionFresh ? `profile-plan-${subscriptionUpdatedAt}` : 'profile-plan'}
          className={`mapingo-profile-plan-summary ${isSubscriptionFresh ? 'is-updated' : ''}`}
        >
          <MapingoMetricGrid
            items={[
              { label: '현재 레벨', value: currentLevel, hint: '현재 학습 단계' },
              { label: '구독 상태', value: subscriptionLabel, hint: subscriptionDescription },
              { label: '획득 배지', value: `${badgeCount}개`, hint: `${weeklyGoalCompleted}회 목표 진행` },
              { label: '즐겨찾기', value: `${favoriteRouteIds.length}개`, hint: '저장한 루트 기준' },
            ]}
          />
          {isSubscriptionFresh ? <span className="mapingo-update-chip">업데이트 완료</span> : null}
        </div>
      </MapingoPageSection>

      <MapingoPageSection title="프로필 요약" description="학습 성향과 플랜 상태를 함께 보면서 다음 학습 루트를 고르기 쉽게 정리했어요.">
        <MapingoInfoGrid
          items={[
            {
              title: '구독 플랜',
              description: `${subscriptionLabel} 상태예요. ${subscriptionDescription} 흐름으로 홈과 프리미엄 페이지가 연결됩니다.`,
            },
            {
              title: '배지 현황',
              description: earnedBadges.length > 0 ? `${earnedBadges.map((badge) => badge.name).join(', ')} 배지를 획득했어요.` : '아직 첫 배지를 모으는 단계예요.',
            },
            {
              title: '즐겨찾기 루트',
              description: `자주 복습할 루트 ${favoriteRouteIds.length}개를 저장해두고 바로 이어서 학습할 수 있어요.`,
            },
          ]}
        />
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-submit-button" onClick={() => navigate('/premium')}>
            구독 변경하기
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-page-section-head">
          <p className="mapingo-eyebrow">Learning</p>
          <h2>배지와 다음 보상 진행도</h2>
          <p className="mapingo-page-section-copy">획득한 배지와 앞으로 열릴 보상을 카드로 정리해 현재 학습 흐름을 바로 파악할 수 있게 했어요.</p>
        </div>
        <div className="mapingo-badge-grid">
          {badgeCatalog.map((badge) => (
            <article key={badge.id} className={`mapingo-badge-card is-${badge.status}`}>
              <span className="mapingo-badge-status">
                {badge.status === 'earned' ? '획득' : badge.status === 'progress' ? '진행 중' : '잠금'}
              </span>
              <h3>{badge.name}</h3>
              <p>{badge.condition}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mapingo-feature-grid">
        <MapingoChecklist
          title="다음 추천 행동"
          items={[
            '즐겨찾기 루트 1개 다시 복습하기',
            nextBadges[0] ? `${nextBadges[0].name} 배지 조건 확인하기` : '새로운 배지 목표 설정하기',
            subscriptionPlan === 'Premium' ? '프리미엄 피드백 기능으로 말하기 점검하기' : '프리미엄 페이지에서 플랜 비교해보기',
          ]}
        />
        <MapingoActivityList
          title="최근 프로필 활동"
          items={[
            { label: `${subscriptionLabel} 플랜 상태 유지`, meta: isSubscriptionFresh ? '방금 반영됨' : '현재 상태' },
            { label: '카페 루트 즐겨찾기 저장', meta: '어제' },
            { label: '스몰토크 미션 완료', meta: '오늘' },
          ]}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
