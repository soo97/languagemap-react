import { useNavigate } from 'react-router-dom';
import DemoFlowCompact from '../components/DemoFlowCompact';
import { homeRecentLearning } from '../data/mapingoDomainData';
import { useMapingoStore } from '../../../store/useMapingoStore';
import { homeService } from '../../../api/home/homeService';
import { learningService } from '../../../api/learning/learningService';

function LandingHomePage() {
  const navigate = useNavigate();
  const recentLearning = useMapingoStore((state) => state.recentLearning);
  const currentLevel = useMapingoStore((state) => state.currentLevel);
  const favoriteRouteIds = useMapingoStore((state) => state.favoriteRouteIds);
  const subscriptionPlan = useMapingoStore((state) => state.subscriptionPlan);
  const subscriptionProductId = useMapingoStore((state) => state.subscriptionProductId);
  const subscriptionUpdatedAt = useMapingoStore((state) => state.subscriptionUpdatedAt);
  const summary = learningService.fetchLearningSummary();
  const recommendations = homeService.fetchHomeRecommendations();

  const recentCards = recentLearning.length > 0 ? recentLearning : homeRecentLearning;
  const subscriptionCopy =
    subscriptionPlan === 'Premium'
      ? subscriptionProductId === 'monthly'
        ? '프리미엄 월간 플랜 이용 중'
        : '프리미엄 연간 플랜 이용 중'
      : '무료 플랜 사용 중';
  const isSubscriptionFresh = Boolean(subscriptionUpdatedAt);

  const homeCards = [
    {
      title: '최근 학습',
      body: recentCards[0]
        ? `${recentCards[0].title} · ${recentCards[0].meta.split('·')[0]?.trim() || recentCards[0].meta}에서 이어서 학습하기`
        : '최근 학습한 장소와 마지막 표현을 이어서 복습할 수 있어요.',
      path: '/map',
    },
    {
      title: 'AI 추천 대화',
      body: recommendations[0]
        ? `${recommendations[0].title} 주제로 추천 대화를 바로 시작할 수 있어요.`
        : '사용자 기록 기반 추천 시나리오를 오늘의 학습 카드로 보여줍니다.',
      path: '/map',
    },
    {
      title: '학습 레벨 · 목표',
      body: `${currentLevel} 단계, 주간 목표 ${summary.weeklyGoal}회 중 ${summary.weeklyGoalCompleted}회 완료`,
      path: '/growth',
    },
    {
      title: '즐겨찾기 · 구독 상태',
      body: `${subscriptionCopy}, 저장한 루트 ${favoriteRouteIds.length}개와 함께 기능 차이를 확인할 수 있어요.`,
      path: '/premium',
      isUpdated: isSubscriptionFresh,
    },
  ];

  return (
    <div className="mapingo-home-sections">
      <DemoFlowCompact activePath="/" />

      <section className="mapingo-home-summary-grid">
        {homeCards.map((card) => (
          <button
            key={card.isUpdated ? `${card.title}-${subscriptionUpdatedAt}` : card.title}
            type="button"
            className={`mapingo-home-summary-card ${card.isUpdated ? 'is-updated' : ''}`}
            onClick={() => navigate(card.path)}
          >
            {card.isUpdated ? <span className="mapingo-update-chip">업데이트 완료</span> : null}
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </button>
        ))}
      </section>
    </div>
  );
}

export default LandingHomePage;
