import { useNavigate } from 'react-router-dom';
import DemoFlowCompact from '../../components/DemoFlowCompact';

const growthCards = [
  {
    id: 'progress',
    title: '성장 지표',
    description: '발음 점수, 유창성 점수, 학습 횟수를 요약해서 볼 수 있어요.',
    path: '/growth/progress',
  },
  {
    id: 'goals',
    title: '레벨 · 목표 조정',
    description: '현재 레벨과 주간 목표 달성 횟수를 직접 조정할 수 있어요.',
    path: '/growth/goals',
  },
  {
    id: 'insights',
    title: '인사이트 · 추천',
    description: '최근 학습 흐름과 다음 추천 행동을 묶어서 확인해요.',
    path: '/growth/insights',
  },
];

function GrowthPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">성장 리포트</p>
        <h1>성장 지표 · 목표 · 인사이트</h1>
        <p className="mapingo-domain-entry-copy">원하는 영역을 먼저 고른 뒤 상세 화면으로 들어가는 방식으로 정리했어요.</p>
        <div className="mapingo-domain-entry-grid">
          {growthCards.map((card) => (
            <button key={card.id} type="button" className="mapingo-domain-entry-card" onClick={() => navigate(card.path)}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </section>

      <DemoFlowCompact activePath="/growth" />
    </div>
  );
}

export default GrowthPage;
