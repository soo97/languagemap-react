import { useNavigate } from 'react-router-dom';
import DemoFlowCompact from '../../components/DemoFlowCompact';

const premiumCards = [
  {
    id: 'plans',
    title: '구독 플랜',
    description: '월간 · 연간 플랜을 비교하고 선택할 수 있어요.',
    path: '/premium/plans',
  },
  {
    id: 'features',
    title: '프리미엄 혜택',
    description: '유료 사용자에게 열리는 기능만 따로 모아서 봐요.',
    path: '/premium/features',
  },
  {
    id: 'status',
    title: '구독 상태',
    description: '현재 플랜과 적용 중인 상태를 깔끔하게 확인해요.',
    path: '/premium/status',
  },
];

function PremiumPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">프리미엄</p>
        <h1>플랜 · 혜택 · 상태</h1>
        <p className="mapingo-domain-entry-copy">먼저 보고 싶은 영역을 고른 뒤 상세 페이지로 들어갈 수 있어요.</p>
        <div className="mapingo-domain-entry-grid">
          {premiumCards.map((card) => (
            <button key={card.id} type="button" className="mapingo-domain-entry-card" onClick={() => navigate(card.path)}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </section>

      <DemoFlowCompact activePath="/premium" />
    </div>
  );
}

export default PremiumPage;
