import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import PingPopCharacterImage from '../../components/PingPopCharacterImage';
import { useMapingoStore } from '../../store/useMapingoStore';
import { learningService } from '../../api/learningService';

const fallbackRouteCopy = {
  cafe: '카페 주문 표현',
  subway: '지하철 이동 표현',
  travel: '여행 필수 표현',
  convenience: '편의점 표현',
};

function ProfilePage() {
  const navigate = useNavigate();
  const profileName = useMapingoStore((state) => state.profileName);
  const profileNickname = useMapingoStore((state) => state.profileNickname);
  const subscriptionPlan = useMapingoStore((state) => state.subscriptionPlan);
  const subscriptionUpdatedAt = useMapingoStore((state) => state.subscriptionUpdatedAt);
  const currentLevel = useMapingoStore((state) => state.currentLevel);
  const currentLevelId = useMapingoStore((state) => state.currentLevelId);
  const badgeCount = useMapingoStore((state) => state.badgeCount);
  const recentLearning = useMapingoStore((state) => state.recentLearning);
  const favoriteRouteIds = useMapingoStore((state) => state.favoriteRouteIds);
  const weeklyGoal = useMapingoStore((state) => state.weeklyGoal);
  const weeklyGoalCompleted = useMapingoStore((state) => state.weeklyGoalCompleted);
  const badgeCatalog = learningService.fetchBadgeCatalog();
  const profileLevelNumber =
    currentLevelId === 'advanced' ? 60 : currentLevelId === 'intermediate' ? 40 : 10;

  const earnedBadges = badgeCatalog.filter((badge) => badge.status === 'earned');
  const topBadge = earnedBadges[0]?.name ?? '문화 회화사';
  const topBadgeDetail = earnedBadges[0]?.condition ?? 'City Explorer';
  const latestLearning = recentLearning[0];
  const favoriteLabels =
    favoriteRouteIds.length > 0
      ? favoriteRouteIds.map((id) => fallbackRouteCopy[id] ?? id).join(', ')
      : '아직 저장한 즐겨찾기 루트가 없어요.';
  const completionPercent = Math.min(100, Math.max(12, badgeCount * 12 + weeklyGoalCompleted * 4));

  const subscriptionLabel = subscriptionPlan === 'Premium' ? '프리미엄 회원' : '일반 회원';
  const profileEmail = `${profileName.toLowerCase().replace(/\s+/g, '.')}@mapingo.ai`;

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="My Profile"
        title="프로필 정보, 계정 상태, 학습 목표를 한 화면에서 확인해보세요"
        description="프로필 정보, 계정 상태, 학습 목표, 즐겨찾기와 최근 학습을 한 화면에서 확인할 수 있습니다."
      >
        <section className="mapingo-profile-layout">
          <article
            key={subscriptionUpdatedAt ? `profile-card-${subscriptionUpdatedAt}` : 'profile-card'}
            className={`mapingo-profile-card ${subscriptionUpdatedAt ? 'is-updated' : ''}`}
          >
            <div className="mapingo-profile-card-head">
              <div className="mapingo-profile-identity">
                <div className="mapingo-profile-avatar-column">
                  <div className="mapingo-profile-level-pill">{`Lv.${profileLevelNumber}`}</div>
                  <div className="mapingo-profile-avatar-frame">
                    <div className="mapingo-profile-avatar" aria-hidden="true">
                      <PingPopCharacterImage className="mapingo-profile-avatar-logo" level={profileLevelNumber} />
                    </div>
                  </div>
                </div>
                <div className="mapingo-profile-identity-copy">
                  <h2>{profileName}</h2>
                  <p>{profileEmail}</p>
                  <span className="mapingo-profile-badge-pill">
                    {topBadge} : {topBadgeDetail}
                  </span>
                  <div className="mapingo-profile-progress">
                    <div className="mapingo-profile-progress-fill" style={{ width: `${completionPercent}%` }} />
                  </div>
                  <small>다음 레벨 배지까지 {Math.max(8, 100 - completionPercent)}% 남았어요</small>
                </div>
              </div>

              <button
                type="button"
                className="mapingo-ghost-button"
                onClick={() => navigate('/settings/account')}
              >
                계정 관리
              </button>
            </div>

            <div className="mapingo-profile-info-grid">
              <article className="mapingo-profile-info-tile">
                <strong>계정 상태</strong>
                <p>정상 이용 중 · {subscriptionLabel}</p>
              </article>
              <article className="mapingo-profile-info-tile">
                <strong>학습 레벨</strong>
                <p>{currentLevel} · {`Lv. ${profileLevelNumber}`}</p>
              </article>
              <article className="mapingo-profile-info-tile">
                <strong>학습 목표</strong>
                <p>주 {weeklyGoal}회 말하기 연습</p>
              </article>
              <article className="mapingo-profile-info-tile">
                <strong>획득 배지</strong>
                <p>{topBadge} · {topBadgeDetail}</p>
              </article>
            </div>
          </article>

          <div className="mapingo-profile-side-column">
            <article className="mapingo-profile-side-card">
              <h3>최근 학습</h3>
              <p>
                {latestLearning
                  ? `${latestLearning.title} · 마지막 학습 ${latestLearning.meta} · 이어서 학습 가능`
                  : '아직 최근 학습 기록이 없어요. 첫 학습을 시작해보세요.'}
              </p>
            </article>

            <article className="mapingo-profile-side-card is-linkable" onClick={() => navigate('/community/favorites')} role="button" tabIndex={0} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate('/community/favorites');
              }
            }}>
              <div className="mapingo-profile-side-head">
                <h3>즐겨찾기</h3>
                <span>→</span>
              </div>
              <p>{favoriteLabels}</p>
            </article>
          </div>
        </section>
      </MapingoPageSection>
    </div>
  );
}

export default ProfilePage;
