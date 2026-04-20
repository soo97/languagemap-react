import { useNavigate } from 'react-router-dom';

const adminCards = [
  {
    id: 'members',
    title: '회원 관리',
    description: '회원 상태, 구독 플랜, 최근 활동을 확인하고 상태를 조정합니다.',
    path: '/admin/members',
  },
  {
    id: 'notices',
    title: '공지사항 관리',
    description: '공지 등록, 임시 저장, 게시 상태 전환을 프론트 프로토타입으로 확인합니다.',
    path: '/admin/notices',
  },
  {
    id: 'content',
    title: '학습 콘텐츠 관리',
    description: '장소, 학습 미션, 시나리오 상태를 한 화면에서 관리합니다.',
    path: '/admin/content',
  },
];

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">Admin</p>
        <h1>회원 · 공지 · 콘텐츠 관리</h1>
        <p className="mapingo-domain-entry-copy">
          아직 백엔드 연동 전 단계이지만, 관리자 유스케이스를 프론트 화면으로 바로 검증할 수 있게 구성했습니다.
        </p>
        <div className="mapingo-domain-entry-grid">
          {adminCards.map((card) => (
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

export default AdminPage;
