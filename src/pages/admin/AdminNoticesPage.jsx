import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/adminService';

const emptyForm = {
  title: '',
  category: '업데이트',
  body: '',
};

function AdminNoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(adminService.fetchAdminNotices());
  const [form, setForm] = useState(emptyForm);

  const handleCreate = () => {
    if (!form.title.trim() || !form.body.trim()) return;

    setNotices((current) => [
      {
        id: current.length + 1,
        title: form.title.trim(),
        category: form.category,
        body: form.body.trim(),
        status: '임시 저장',
        date: '2026-04-20',
      },
      ...current,
    ]);
    setForm(emptyForm);
  };

  const handleTogglePublish = (noticeId) => {
    setNotices((current) =>
      current.map((notice) =>
        notice.id === noticeId
          ? { ...notice, status: notice.status === '게시 중' ? '임시 저장' : '게시 중' }
          : notice,
      ),
    );
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="공지사항 관리"
        description="공지 등록, 임시 저장, 게시 상태 변경을 프론트 단계에서 먼저 검증할 수 있게 구성한 화면입니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/admin')}>
            관리자 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-admin-grid">
        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>공지 작성</h3>
            <span className="mapingo-muted-copy">초안 저장형 UI</span>
          </div>
          <div className="mapingo-admin-form">
            <input
              className="mapingo-input"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="공지 제목"
            />
            <select
              className="mapingo-input"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            >
              <option value="업데이트">업데이트</option>
              <option value="점검">점검</option>
              <option value="이벤트">이벤트</option>
            </select>
            <textarea
              className="mapingo-input mapingo-admin-textarea"
              value={form.body}
              onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
              placeholder="공지 본문"
            />
            <div className="mapingo-admin-action-row">
              <button type="button" className="mapingo-submit-button" onClick={handleCreate}>
                공지 추가
              </button>
            </div>
          </div>
        </article>

        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>공지 목록</h3>
            <span className="mapingo-muted-copy">{`${notices.length}개`}</span>
          </div>
          <div className="mapingo-selectable-list">
            {notices.map((notice) => (
              <article key={notice.id} className="mapingo-post-card">
                <div className="mapingo-admin-item-head">
                  <div>
                    <strong>{notice.title}</strong>
                    <p>{notice.body}</p>
                  </div>
                  <div className="mapingo-inline-badges">
                    <span className="mapingo-inline-badge">{notice.category}</span>
                    <span className="mapingo-inline-badge">{notice.status}</span>
                    <span className="mapingo-inline-badge">{notice.date}</span>
                  </div>
                </div>
                <div className="mapingo-admin-action-row">
                  <button type="button" className="mapingo-submit-button" onClick={() => handleTogglePublish(notice.id)}>
                    게시 상태 전환
                  </button>
                  <button type="button" className="mapingo-ghost-button">
                    수정
                  </button>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminNoticesPage;
