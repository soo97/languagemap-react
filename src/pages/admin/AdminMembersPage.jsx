import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoMetricGrid, MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/adminService';

const statusClassMap = {
  활성: 'is-active',
  '검토 필요': 'is-review',
  정지: 'is-paused',
};

function AdminMembersPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState(() => adminService.fetchAdminMembers());
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const filteredMembers = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return members.filter((member) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'premium' && member.plan === 'Premium') ||
        (filter === 'review' && member.status === '검토 필요');

      if (!matchesFilter) return false;
      if (!normalizedSearchTerm) return true;

      return [member.name, member.email, member.plan, member.level, member.role, member.goal, member.status]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchTerm);
    });
  }, [filter, members, searchTerm]);

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedMemberId) ?? null,
    [members, selectedMemberId],
  );

  const updateMember = (memberId, updates) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) => (member.id === memberId ? { ...member, ...updates } : member)),
    );
  };

  const handleToggleStatus = (memberId) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? { ...member, status: member.status === '활성' ? '검토 필요' : '활성' }
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
        description="회원 상태, 플랜, 학습 목표, 최근 활동을 한눈에 확인하고 필요한 정보를 상세하게 관리할 수 있어요."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/admin')}>
            관리자 메인으로
          </button>
        </div>
        <MapingoMetricGrid
          items={[
            { label: '전체 회원', value: String(members.length), hint: '현재 등록된 사용자' },
            { label: '활성 회원', value: String(activeMembers), hint: '정상 이용 중' },
            { label: '프리미엄 회원', value: String(premiumMembers), hint: '유료 플랜 이용자' },
            { label: '검토 필요', value: String(reviewMembers), hint: '상태 확인 대상' },
          ]}
        />
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-list-card admin-members-panel">
          <div className="mapingo-card-header-row admin-members-head">
            <div>
              <h3>회원 목록</h3>
              <p className="mapingo-muted-copy">
                회원을 검색하거나 필터링한 뒤, 상세 보기에서 플랜과 상태를 관리해요.
              </p>
            </div>
            <div className="mapingo-admin-filter-row">
              <button
                type="button"
                className={`mapingo-chip ${filter === 'all' ? 'is-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                전체
              </button>
              <button
                type="button"
                className={`mapingo-chip ${filter === 'premium' ? 'is-active' : ''}`}
                onClick={() => setFilter('premium')}
              >
                Premium
              </button>
              <button
                type="button"
                className={`mapingo-chip ${filter === 'review' ? 'is-active' : ''}`}
                onClick={() => setFilter('review')}
              >
                검토 필요
              </button>
            </div>
          </div>

          <label className="admin-member-search">
            <span>회원 검색</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="이름, 이메일, 레벨, 목표로 검색"
            />
          </label>

          <div className="admin-members-result">
            <span>{filteredMembers.length}명 표시 중</span>
            {searchTerm ? (
              <button type="button" className="mapingo-ghost-button" onClick={() => setSearchTerm('')}>
                검색 초기화
              </button>
            ) : null}
          </div>

          <div className="admin-members-table" role="table" aria-label="회원 목록">
            <div className="admin-members-row is-header" role="row">
              <span role="columnheader">회원</span>
              <span role="columnheader">플랜</span>
              <span role="columnheader">레벨</span>
              <span role="columnheader">학습 목표</span>
              <span role="columnheader">최근 활동</span>
              <span role="columnheader">상태</span>
              <span role="columnheader">관리</span>
            </div>

            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`admin-members-row ${selectedMemberId === member.id ? 'is-selected' : ''}`}
                role="row"
              >
                <div className="admin-member-primary" role="cell">
                  <strong>{member.name}</strong>
                  <p>{member.email}</p>
                  <span className="admin-member-role">{member.role}</span>
                </div>
                <div role="cell">
                  <span className="mapingo-inline-badge">{member.plan}</span>
                </div>
                <div role="cell">
                  <span className="mapingo-inline-badge">{member.level}</span>
                </div>
                <p role="cell" className="admin-member-goal">
                  {member.goal}
                </p>
                <p role="cell" className="admin-member-last-active">
                  {member.lastActive}
                </p>
                <div role="cell">
                  <span className={`admin-member-status ${statusClassMap[member.status] ?? 'is-review'}`}>
                    {member.status}
                  </span>
                </div>
                <div role="cell" className="admin-member-actions">
                  <button type="button" className="mapingo-submit-button" onClick={() => handleToggleStatus(member.id)}>
                    상태 전환
                  </button>
                  <button type="button" className="mapingo-ghost-button" onClick={() => setSelectedMemberId(member.id)}>
                    상세 보기
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 ? (
            <div className="admin-members-empty">
              <strong>검색 결과가 없어요.</strong>
              <p>이름, 이메일, 목표 키워드를 다시 확인해 주세요.</p>
            </div>
          ) : null}
        </div>

        {selectedMember ? (
          <div className="admin-member-detail-panel">
            <div className="admin-member-detail-head">
              <div>
                <p className="growth-panel-kicker">회원 상세</p>
                <h3>{selectedMember.name}</h3>
                <p>{selectedMember.email}</p>
              </div>
              <button type="button" className="mapingo-ghost-button" onClick={() => setSelectedMemberId(null)}>
                닫기
              </button>
            </div>

            <div className="admin-member-detail-grid">
              <article className="admin-member-detail-card">
                <p className="mapingo-field-label">기본 정보</p>
                <strong>{selectedMember.role}</strong>
                <span>{`가입일 ${selectedMember.joinedAt}`}</span>
              </article>
              <article className="admin-member-detail-card">
                <p className="mapingo-field-label">학습 활동</p>
                <strong>{`${selectedMember.studyCount}회 학습`}</strong>
                <span>{`연속 학습 ${selectedMember.streakDays}일`}</span>
              </article>
              <article className="admin-member-detail-card">
                <p className="mapingo-field-label">검토 메모</p>
                <strong>{selectedMember.reviewReason}</strong>
                <span>{selectedMember.lastActive}</span>
              </article>
            </div>

            <div className="admin-member-detail-controls">
              <label className="mapingo-field">
                <span className="mapingo-field-label">회원 상태</span>
                <select
                  className="mapingo-input"
                  value={selectedMember.status}
                  onChange={(event) => updateMember(selectedMember.id, { status: event.target.value })}
                >
                  <option value="활성">활성</option>
                  <option value="검토 필요">검토 필요</option>
                  <option value="정지">정지</option>
                </select>
              </label>
              <label className="mapingo-field">
                <span className="mapingo-field-label">플랜</span>
                <select
                  className="mapingo-input"
                  value={selectedMember.plan}
                  onChange={(event) => updateMember(selectedMember.id, { plan: event.target.value })}
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </label>
              <label className="mapingo-field admin-member-detail-memo">
                <span className="mapingo-field-label">관리자 메모</span>
                <textarea
                  className="mapingo-input mapingo-admin-textarea"
                  value={selectedMember.memo}
                  onChange={(event) => updateMember(selectedMember.id, { memo: event.target.value })}
                  placeholder="관리자 메모를 입력하세요."
                />
              </label>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default AdminMembersPage;
