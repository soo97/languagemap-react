import { useNavigate } from 'react-router-dom';

const settingsCards = [
  {
    id: 'learning',
    title: '학습 설정',
    description: '알림, 목표, 학습 시간과 관련된 설정을 관리해요.',
    path: '/settings/learning',
  },
  {
    id: 'display',
    title: '표시 설정',
    description: '언어와 표시 순서를 정리하는 화면이에요.',
    path: '/settings/display',
  },
];

function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">환경설정</p>
        <h1>학습 · 표시 · 계정</h1>
        <p className="mapingo-domain-entry-copy">설정도 필요한 영역만 먼저 선택해서 들어가도록 구조를 통일했어요.</p>
        <div className="mapingo-domain-entry-grid">
          {settingsCards.map((card) => (
            <button key={card.id} type="button" className="mapingo-domain-entry-card" onClick={() => navigate(card.path)}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
