import { useNavigate } from 'react-router-dom';
import DemoFlowCompact from '../../home-support-common/components/DemoFlowCompact';

const communityEntryCards = [
  {
    id: 'friends',
    title: '친구 관리',
    description: '친구 추가/삭제, 친구 목록 조회',
    path: '/community/friends',
  },
  {
    id: 'ranking',
    title: '점수 비교 · 랭킹',
    description: '친구와 점수 비교, 전체 랭킹 조회',
    path: '/community/ranking',
  },
  {
    id: 'favorites',
    title: '목표 · 배지 · 즐겨찾기',
    description: '연습 목표, 배지, 즐겨찾기 흐름을 묶어서 제공해요',
    path: '/community/favorites',
  },
];

function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">커뮤니티</p>
        <h1>친구 · 목표 · 랭킹</h1>
        <p className="mapingo-domain-entry-copy">
          원하는 기능을 먼저 고른 뒤 들어가는 방식으로 커뮤니티를 더 깔끔하게 둘러볼 수 있어요.
        </p>

        <div className="mapingo-domain-entry-grid">
          {communityEntryCards.map((card) => (
            <button
              key={card.id}
              type="button"
              className="mapingo-domain-entry-card"
              onClick={() => navigate(card.path)}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </section>

      <DemoFlowCompact activePath="/community" />
    </div>
  );
}

export default CommunityPage;
