import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/adminService';

const emptyForm = {
  title: '',
  category: '업데이트',
  body: '',
  author: '운영팀',
  publishAt: '',
};

const PAGE_SIZE = 3;

function getStatusClassName(status) {
  if (status === '게시 중') return 'is-published';
  if (status === '예약') return 'is-reserved';
  return 'is-draft';
}

function AdminNoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(adminService.fetchAdminNotices());
  const [form, setForm] = useState(emptyForm);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('pinned');
  const [currentPage, setCurrentPage] = useState(1);

  const editingNotice = useMemo(
    () => notices.find((notice) => notice.id === editingNoticeId) ?? null,
    [editingNoticeId, notices],
  );

  const scheduledNotices = useMemo(
    () =>
      notices
        .filter((notice) => notice.status === '예약')
        .sort((a, b) => (a.publishAt || '').localeCompare(b.publishAt || '')),
    [notices],
  );

  const filteredNotices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = notices
      .filter((notice) => (categoryFilter === 'all' ? true : notice.category === categoryFilter))
      .filter((notice) => {
        if (!normalizedQuery) return true;
        return `${notice.title} ${notice.body} ${notice.author}`.toLowerCase().includes(normalizedQuery);
      });

    const sorted = [...filtered];

    if (sortBy === 'latest') {
      sorted.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
      return sorted;
    }

    if (sortBy === 'publish') {
      sorted.sort((a, b) => (b.publishAt || '').localeCompare(a.publishAt || ''));
      return sorted;
    }

    sorted.sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.date.localeCompare(a.date) || b.id - a.id);
    return sorted;
  }, [categoryFilter, notices, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredNotices.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedNotices = filteredNotices.slice((safeCurrentPage - 1) * PAGE_SIZE, safeCurrentPage * PAGE_SIZE);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingNoticeId(null);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.body.trim()) return;

    if (editingNoticeId) {
      setNotices((current) =>
        current.map((notice) =>
          notice.id === editingNoticeId
            ? {
                ...notice,
                title: form.title.trim(),
                category: form.category,
                body: form.body.trim(),
                author: form.author.trim() || '운영팀',
                publishAt: form.publishAt || notice.publishAt,
              }
            : notice,
        ),
      );
      resetForm();
      return;
    }

    setNotices((current) => [
      {
        id: current.length + 1,
        title: form.title.trim(),
        category: form.category,
        body: form.body.trim(),
        status: form.publishAt ? '예약' : '임시 저장',
        date: '2026-04-23',
        isPinned: false,
        author: form.author.trim() || '운영팀',
        publishAt: form.publishAt || '미정',
      },
      ...current,
    ]);
    resetForm();
    resetPagination();
  };

  const handleEdit = (notice) => {
    setEditingNoticeId(notice.id);
    setForm({
      title: notice.title,
      category: notice.category,
      body: notice.body,
      author: notice.author,
      publishAt: notice.publishAt === '미정' ? '' : notice.publishAt,
    });
  };

  const handleDelete = (noticeId) => {
    const shouldDelete = window.confirm('이 공지를 삭제할까요?');
    if (!shouldDelete) return;

    setNotices((current) => current.filter((notice) => notice.id !== noticeId));

    if (editingNoticeId === noticeId) {
      resetForm();
    }
  };

  const handleTogglePublish = (noticeId) => {
    setNotices((current) =>
      current.map((notice) => {
        if (notice.id !== noticeId) return notice;

        if (notice.status === '게시 중') {
          return { ...notice, status: '임시 저장' };
        }

        if (notice.publishAt && notice.publishAt !== '미정') {
          return { ...notice, status: '예약' };
        }

        return { ...notice, status: '게시 중' };
      }),
    );
  };

  const handleTogglePinned = (noticeId) => {
    setNotices((current) =>
      current.map((notice) =>
        notice.id === noticeId ? { ...notice, isPinned: !notice.isPinned } : notice,
      ),
    );
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="공지 관리"
        description="공지 작성, 수정, 삭제, 검색, 필터, 예약 발행, 페이지네이션까지 한 화면에서 관리할 수 있어요."
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
            <div>
              <h3>{editingNotice ? '공지 수정' : '공지 작성'}</h3>
              <span className="mapingo-muted-copy">
                {editingNotice ? '선택한 공지 내용을 수정하고 저장할 수 있어요.' : '새 공지를 작성하고 초안 또는 예약 상태로 추가할 수 있어요.'}
              </span>
            </div>
          </div>

          {editingNotice ? (
            <div className="mapingo-admin-editing-banner">
              <strong>{editingNotice.title}</strong>
              <p>현재 이 공지를 수정 중이에요. 저장하면 목록에 바로 반영됩니다.</p>
            </div>
          ) : null}

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
            <input
              className="mapingo-input"
              value={form.author}
              onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
              placeholder="작성자"
            />
            <input
              className="mapingo-input"
              type="datetime-local"
              value={form.publishAt}
              onChange={(event) => setForm((current) => ({ ...current, publishAt: event.target.value }))}
            />
            <textarea
              className="mapingo-input mapingo-admin-textarea"
              value={form.body}
              onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
              placeholder="공지 본문"
            />

            <div className="mapingo-admin-preview-card">
              <p className="mapingo-field-label">공지 미리보기</p>
              <div className="mapingo-admin-preview-body">
                <div className="mapingo-inline-badges">
                  <span className="mapingo-inline-badge">{form.category || '카테고리'}</span>
                  <span className="mapingo-inline-badge">{form.publishAt ? '예약 발행' : editingNotice ? '수정 중' : '신규 작성'}</span>
                </div>
                <strong>{form.title || '공지 제목이 여기에 표시돼요.'}</strong>
                <p>{form.body || '본문을 입력하면 실제 목록에 노출될 문구를 여기서 미리 볼 수 있어요.'}</p>
                <p className="admin-notice-preview-meta">
                  작성자 {form.author || '운영팀'} · 발행 {form.publishAt || '미정'}
                </p>
              </div>
            </div>

            <div className="mapingo-admin-action-row">
              <button type="button" className="mapingo-submit-button" onClick={handleSubmit}>
                {editingNotice ? '수정 저장' : '공지 추가'}
              </button>
              {editingNotice ? (
                <button type="button" className="mapingo-ghost-button" onClick={resetForm}>
                  취소
                </button>
              ) : null}
            </div>
          </div>
        </article>

        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <div>
              <h3>공지 목록</h3>
              <span className="mapingo-muted-copy">{`${filteredNotices.length}개 표시 중`}</span>
            </div>
          </div>

          {scheduledNotices.length > 0 ? (
            <div className="admin-scheduled-notices">
              <div className="admin-scheduled-head">
                <strong>예약된 공지</strong>
                <span>{`${scheduledNotices.length}개`}</span>
              </div>
              <div className="admin-scheduled-list">
                {scheduledNotices.map((notice) => (
                  <button key={notice.id} type="button" className="admin-scheduled-item" onClick={() => handleEdit(notice)}>
                    <span>{notice.title}</span>
                    <strong>{notice.publishAt}</strong>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mapingo-admin-filter-row admin-notice-toolbar">
            <input
              className="mapingo-input admin-notice-search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                resetPagination();
              }}
              placeholder="제목, 본문, 작성자 검색"
            />
            <div className="mapingo-admin-filter-row">
              <button type="button" className={`mapingo-chip ${categoryFilter === 'all' ? 'is-active' : ''}`} onClick={() => { setCategoryFilter('all'); resetPagination(); }}>
                전체
              </button>
              <button type="button" className={`mapingo-chip ${categoryFilter === '업데이트' ? 'is-active' : ''}`} onClick={() => { setCategoryFilter('업데이트'); resetPagination(); }}>
                업데이트
              </button>
              <button type="button" className={`mapingo-chip ${categoryFilter === '점검' ? 'is-active' : ''}`} onClick={() => { setCategoryFilter('점검'); resetPagination(); }}>
                점검
              </button>
              <button type="button" className={`mapingo-chip ${categoryFilter === '이벤트' ? 'is-active' : ''}`} onClick={() => { setCategoryFilter('이벤트'); resetPagination(); }}>
                이벤트
              </button>
            </div>
            <select
              className="mapingo-input admin-notice-sort"
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                resetPagination();
              }}
            >
              <option value="pinned">고정순</option>
              <option value="latest">최신순</option>
              <option value="publish">발행순</option>
            </select>
          </div>

          <div className="mapingo-selectable-list">
            {pagedNotices.map((notice) => (
              <article key={notice.id} className={`mapingo-post-card ${editingNoticeId === notice.id ? 'is-editing' : ''}`}>
                <div className="mapingo-admin-item-head">
                  <div>
                    <div className="admin-notice-title-row">
                      <strong>{notice.title}</strong>
                      {notice.isPinned ? <span className="admin-notice-pin">중요 공지</span> : null}
                    </div>
                    <p>{notice.body}</p>
                    <p className="admin-notice-meta">
                      작성자 {notice.author} · 발행 {notice.publishAt || '미정'}
                    </p>
                  </div>
                  <div className="mapingo-inline-badges">
                    <span className="mapingo-inline-badge">{notice.category}</span>
                    <span className={`admin-notice-status ${getStatusClassName(notice.status)}`}>{notice.status}</span>
                    <span className="mapingo-inline-badge">{notice.date}</span>
                  </div>
                </div>
                <div className="mapingo-admin-action-row">
                  <button type="button" className="mapingo-submit-button" onClick={() => handleTogglePublish(notice.id)}>
                    게시 상태 전환
                  </button>
                  <button type="button" className="mapingo-ghost-button" onClick={() => handleEdit(notice)}>
                    수정
                  </button>
                  <button type="button" className="mapingo-ghost-button" onClick={() => handleTogglePinned(notice.id)}>
                    {notice.isPinned ? '고정 해제' : '상단 고정'}
                  </button>
                  <button type="button" className="mapingo-ghost-button" onClick={() => handleDelete(notice.id)}>
                    삭제
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="admin-pagination">
            <button
              type="button"
              className="mapingo-ghost-button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage === 1}
            >
              이전
            </button>
            <span>{`${safeCurrentPage} / ${totalPages}`}</span>
            <button
              type="button"
              className="mapingo-ghost-button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safeCurrentPage === totalPages}
            >
              다음
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminNoticesPage;
