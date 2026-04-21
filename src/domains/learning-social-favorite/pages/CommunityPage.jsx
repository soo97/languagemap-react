import { useNavigate } from 'react-router-dom';
import DemoFlowCompact from '../../home-support-common/components/DemoFlowCompact';
import './CommunityPage.css';

const communityEntryCards = [
  {
    id: 'friends',
    title: '친구 관리',
    description:
      '친구 요청을 보내고, 받은 요청을 정리하고, 필요한 상황에서는 신고까지 이어서 처리해요.',
    accent: '연결 관리',
    stat: '요청 2건',
    detail: '친구 추가 · 요청 확인 · 신고 접수',
    path: '/community/friends',
  },
  {
    id: 'ranking',
    title: '점수 비교 · 랭킹',
    description:
      '친구와 학습 흐름을 나란히 보고, 전체 사용자 사이에서 내 위치를 빠르게 확인해요.',
    accent: '순위 확인',
    stat: '상위 12%',
    detail: '친구 비교 · 전체 랭킹',
    path: '/community/ranking',
  },
  {
    id: 'favorites',
    title: '목표 · 배지 · 즐겨찾기',
    description:
      '진행 중인 목표와 획득한 배지, 저장해둔 장소와 시나리오를 한 번에 묶어서 정리해요.',
    accent: '학습 보관함',
    stat: '목표 2개',
    detail: '목표 관리 · 배지 현황 · 저장 항목',
    path: '/community/favorites',
  },
];

const quickStats = [
  {
    label: '이번 주 참여',
    value: '7일 연속',
    copy: '대화 연습과 목표 체크가 꾸준히 이어지고 있어요.',
  },
  {
    label: '커뮤니티 포인트',
    value: '+128',
    copy: '친구 비교와 랭킹 확인으로 동기부여 흐름이 유지되고 있어요.',
  },
];

function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="community-landing">
        <div className="community-landing-hero">
          <div className="community-landing-copy">
            <p className="mapingo-eyebrow">커뮤니티</p>
            <h1>혼자 끝내지 않고, 같이 이어가는 학습 루틴</h1>
            <p className="community-landing-description">
              친구와 흐름을 비교하고, 목표를 관리하고, 내가 쌓아온 기록을 한곳에서 자연스럽게 이어가보세요.
            </p>

            <div className="community-landing-stat-row">
              {quickStats.map((stat) => (
                <article key={stat.label} className="community-landing-stat">
                  <p>{stat.label}</p>
                  <strong>{stat.value}</strong>
                  <span>{stat.copy}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="community-landing-panel">
            <div className="community-landing-highlight">
              <span>오늘의 흐름</span>
              <strong>목표 확인 → 친구 요청 확인 → 랭킹 보기</strong>
              <p>지금 필요한 순서대로 바로 들어갈 수 있게 정리했어요.</p>
            </div>

            <div className="community-landing-mini-grid">
              <div className="community-landing-mini-card">
                <p>새 친구 요청</p>
                <strong>2명</strong>
              </div>
              <div className="community-landing-mini-card">
                <p>진행 중 목표</p>
                <strong>2개</strong>
              </div>
              <div className="community-landing-mini-card">
                <p>획득 배지</p>
                <strong>2개</strong>
              </div>
              <div className="community-landing-mini-card">
                <p>랭킹 변화</p>
                <strong>▲ 3</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="community-landing-grid">
          {communityEntryCards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`community-entry-card is-${card.id}`}
              onClick={() => navigate(card.path)}
            >
              <div className="community-entry-card-top">
                <span className="community-entry-accent">{card.accent}</span>
                <span className="community-entry-index">{`0${index + 1}`}</span>
              </div>

              <div className="community-entry-card-body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>

              <div className="community-entry-card-bottom">
                <strong>{card.stat}</strong>
                <span>{card.detail}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <DemoFlowCompact activePath="/community" />
    </div>
  );
}

export default CommunityPage;
