import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoMetricGrid, MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';
import { adminService } from '../../../api/admin/adminService';

function AdminMembersPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState(adminService.fetchAdminMembers());
  const [filter, setFilter] = useState('all');

  const filteredMembers = useMemo(() => {
    if (filter === 'all') return members;
    if (filter === 'premium') return members.filter((member) => member.plan === 'Premium');
    if (filter === 'review') return members.filter((member) => member.status === '검토 필요');
    return members;
  }, [filter, members]);

  const handleToggleStatus = (memberId) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === memberId
          ? {
              ...member,
              status: member.status === '활성' ? '검토 필요' : '활성',
            }
          : member,
      ),
    );
  };

  const activeMembers = members.filter((member) => member.status === '활성').length;
  const premiumMembers = members.filter((member) => member.plan === 'Premium').length;
  const reviewMembers = members.filter((member) => member.status === '검토 필요').length;

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="회원 관리"
        description="회원 상태 조회, 플랜 확인, 검토 대상 분류를 한 화면에서 확인하는 관리자 프론트 프로토타입입니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/admin')}>
            관리자 메인으로
          </button>
        </div>
        <MapingoMetricGrid
          items={[
            { label: '전체 회원', value: String(members.length), hint: '목업 기준' },
            { label: '활성 회원', value: String(activeMembers), hint: '정상 이용 중' },
            { label: '프리미엄 회원', value: String(premiumMembers), hint: '플랜 상태' },
            { label: '검토 필요', value: String(reviewMembers), hint: '상태 점검 대상' },
          ]}
        />
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>회원 목록</h3>
            <div className="mapingo-admin-filter-row">
              <button type="button" className={`mapingo-chip ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>
                전체
              </button>
              <button type="button" className={`mapingo-chip ${filter === 'premium' ? 'is-active' : ''}`} onClick={() => setFilter('premium')}>
                Premium
              </button>
              <button type="button" className={`mapingo-chip ${filter === 'review' ? 'is-active' : ''}`} onClick={() => setFilter('review')}>
                검토 필요
              </button>
            </div>
          </div>

          <div className="mapingo-selectable-list">
            {filteredMembers.map((member) => (
              <article key={member.id} className="mapingo-post-card">
                <div className="mapingo-admin-item-head">
                  <div>
                    <strong>{member.name}</strong>
                    <p>{member.email}</p>
                  </div>
                  <div className="mapingo-inline-badges">
                    <span className="mapingo-inline-badge">{member.plan}</span>
                    <span className="mapingo-inline-badge">{member.level}</span>
                    <span className="mapingo-inline-badge">{member.status}</span>
                  </div>
                </div>
                <div className="mapingo-admin-meta-grid">
                  <p><strong>회원 구분</strong> {member.role}</p>
                  <p><strong>학습 목표</strong> {member.goal}</p>
                  <p><strong>최근 활동</strong> {member.lastActive}</p>
                </div>
                <div className="mapingo-admin-action-row">
                  <button type="button" className="mapingo-submit-button" onClick={() => handleToggleStatus(member.id)}>
                    상태 전환
                  </button>
                  <button type="button" className="mapingo-ghost-button">
                    상세 보기
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminMembersPage;
