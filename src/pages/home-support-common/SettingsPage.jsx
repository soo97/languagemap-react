import { useNavigate } from 'react-router-dom';

const settingsCards = [
  {
    id: 'display',
    title: '표시 설정',
    description: '언어와 표시 순서를 정리하는 화면이에요.',
    path: '/settings/display',
  },
  {
    id: 'account',
    title: '계정 설정',
    description: '프로필과 계정 관련 정보를 관리하는 화면이에요.',
    path: '/settings/account',
  },
];

function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">환경설정</p>
        <h1>표시 · 계정</h1>
        <p className="mapingo-domain-entry-copy">
          자주 바꾸는 환경설정만 남겨서 더 간단하게 정리했어요.
        </p>
        <div className="mapingo-domain-entry-grid">
          {settingsCards.map((card) => (
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
    </div>
  );
}

export default SettingsPage;
