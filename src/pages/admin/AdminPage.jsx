import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/adminService';

const adminCards = [
  {
    id: 'members',
    title: '회원 관리',
    description: '회원 상태, 플랜, 최근 활동을 확인하고 검토가 필요한 사용자를 빠르게 분류합니다.',
    path: '/admin/members',
  },
  {
    id: 'notices',
    title: '공지 관리',
    description: '공지 작성, 예약, 게시 상태 변경까지 운영 공지를 한곳에서 관리합니다.',
    path: '/admin/notices',
  },
  {
    id: 'content',
    title: '콘텐츠 관리',
    description: '장소, 미션, 시나리오 콘텐츠의 상태를 점검하고 운영 흐름을 관리합니다.',
    path: '/admin/content',
  },
];

function AdminPage() {
  const navigate = useNavigate();
  const members = adminService.fetchAdminMembers();
  const notices = adminService.fetchAdminNotices();
  const contentItems = adminService.fetchAdminContent();

  const stats = [
    { label: '전체 회원', value: members.length, hint: '현재 등록된 사용자' },
    { label: '검토 필요 회원', value: members.filter((member) => member.status === '검토 필요').length, hint: '상태 확인 필요' },
    { label: '게시 중 공지', value: notices.filter((notice) => notice.status === '게시 중').length, hint: '현재 노출 중' },
    { label: '운영 중 콘텐츠', value: contentItems.filter((item) => item.status === '운영 중').length, hint: '활성화된 학습 콘텐츠' },
  ];

  const quickTasks = [
    '검토 필요 회원 상태 확인',
    '게시 예정 공지 문구 점검',
    '검토 중 콘텐츠 운영 여부 결정',
  ];

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry admin-domain-entry">
        <p className="mapingo-eyebrow">Admin</p>
        <h1>관리자 대시보드</h1>
        <p className="mapingo-domain-entry-copy">
          회원, 공지, 학습 콘텐츠의 현재 운영 상태를 확인하고 필요한 관리 화면으로 바로 이동할 수 있어요.
        </p>

        <div className="mapingo-dashboard-stats admin-overview-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="mapingo-stat-card admin-overview-card">
              <p className="mapingo-stat-label">{stat.label}</p>
              <strong className="mapingo-stat-value">{stat.value}</strong>
              <p className="mapingo-stat-hint">{stat.hint}</p>
            </article>
          ))}
        </div>

        <div className="admin-dashboard-layout">
          <div className="mapingo-domain-entry-grid admin-entry-grid">
            {adminCards.map((card) => (
              <button
                key={card.id}
                type="button"
                className="mapingo-domain-entry-card admin-entry-card"
                onClick={() => navigate(card.path)}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </button>
            ))}
          </div>

          <article className="admin-quick-panel">
            <p className="admin-quick-kicker">오늘 확인할 항목</p>
            <h3>운영 체크리스트</h3>
            <div className="admin-quick-list">
              {quickTasks.map((task) => (
                <div key={task} className="admin-quick-item">
                  <span className="admin-quick-dot" aria-hidden="true" />
                  <p>{task}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
