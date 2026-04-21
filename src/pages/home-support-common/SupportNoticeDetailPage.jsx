import { useNavigate, useParams } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { supportService } from '../../api/supportService';

const NOTICE_KIND_LABEL = {
  업데이트: { label: '업데이트', color: 'teal' },
  점검: { label: '점검', color: 'amber' },
  이벤트: { label: '이벤트', color: 'coral' },
};

function NoticeKindBadge({ kind }) {
  const config = NOTICE_KIND_LABEL[kind] ?? { label: kind, color: 'teal' };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        background: 'var(--mapingo-badge-bg, #e1f5ee)',
        color: 'var(--mapingo-badge-text, #0f6e56)',
        fontSize: '11px',
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: '20px',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          background: '#1d9e75',
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
      {config.label}
    </span>
  );
}

function SupportNoticeDetailPage() {
  const navigate = useNavigate();
  const { noticeId } = useParams();

  // supportService.fetchSupportNoticeById(noticeId) 형태로 교체 가능
  const notice = supportService.fetchSupportNoticeById?.(noticeId) ?? null;
  const adjacentNotices = supportService.fetchAdjacentNotices?.(noticeId) ?? { prev: null, next: null };

  if (!notice) {
    return (
      <div className="mapingo-dashboard">
        <MapingoPageSection
          eyebrow="고객지원"
          title="공지사항을 찾을 수 없어요"
          description="요청하신 공지가 존재하지 않거나 삭제되었어요."
        >
          <div className="mapingo-page-actions">
            <button
              type="button"
              className="mapingo-ghost-button"
              onClick={() => navigate('/support/notices')}
            >
              목록으로 돌아가기
            </button>
          </div>
        </MapingoPageSection>
      </div>
    );
  }

  return (
    <div className="mapingo-dashboard">
      {/* 페이지 헤더 영역 */}
      <section className="mapingo-page-header-section" style={{ padding: '2rem 2rem 0' }}>
        {/* 브레드크럼 */}
        <nav className="mapingo-breadcrumb" aria-label="breadcrumb">
          <button
            type="button"
            className="mapingo-breadcrumb-link"
            onClick={() => navigate('/support')}
          >
            고객지원
          </button>
          <span className="mapingo-breadcrumb-sep">›</span>
          <button
            type="button"
            className="mapingo-breadcrumb-link"
            onClick={() => navigate('/support/notices')}
          >
            공지사항
          </button>
          <span className="mapingo-breadcrumb-sep">›</span>
          <span className="mapingo-breadcrumb-current">{notice.title}</span>
        </nav>
      </section>

      {/* 공지 본문 카드 */}
      <section className="mapingo-page-section" style={{ paddingTop: '1rem' }}>
        <article className="mapingo-notice-detail-card mapingo-list-card">
          {/* 카드 헤더 */}
          <header className="mapingo-notice-detail-header">
            <NoticeKindBadge kind={notice.kind} />
            <h1 className="mapingo-notice-detail-title">{notice.title}</h1>
            <div className="mapingo-notice-detail-meta">
              <span className="mapingo-list-meta">{notice.date}</span>
              <span className="mapingo-meta-dot" />
              <span className="mapingo-list-meta">Mapingo 운영팀</span>
            </div>
          </header>

          {/* 카드 본문 */}
          <div className="mapingo-notice-detail-body">
            {/* 요약 하이라이트 */}
            {notice.summary && (
              <div className="mapingo-notice-summary">
                {notice.summary}
              </div>
            )}

            {/* 본문 텍스트 */}
            <div className="mapingo-notice-text">
              {notice.body}
            </div>

            {/* 변경 사항 리스트 (있을 경우) */}
            {notice.changes && notice.changes.length > 0 && (
              <div className="mapingo-notice-section">
                <h2 className="mapingo-notice-section-heading">주요 변경 사항</h2>
                <ul className="mapingo-notice-change-list">
                  {notice.changes.map((change, idx) => (
                    <li key={idx} className="mapingo-notice-change-item">
                      <span className="mapingo-change-bullet" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 참고 URL (있을 경우) */}
            {notice.url && (
              <a
                href={notice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mapingo-notice-link"
              >
                자세히 보기 →
              </a>
            )}
          </div>

          {/* 카드 푸터: 목록 이동 + 이전/다음 */}
          <footer className="mapingo-notice-detail-footer">
            <button
              type="button"
              className="mapingo-ghost-button"
              onClick={() => navigate('/support/notices')}
            >
              ← 목록으로
            </button>
            <div className="mapingo-notice-nav-buttons">
              {adjacentNotices.prev && (
                <button
                  type="button"
                  className="mapingo-ghost-button"
                  onClick={() => navigate(`/support/notices/${adjacentNotices.prev.id}`)}
                >
                  ← 이전 공지
                </button>
              )}
              {adjacentNotices.next && (
                <button
                  type="button"
                  className="mapingo-ghost-button"
                  onClick={() => navigate(`/support/notices/${adjacentNotices.next.id}`)}
                >
                  다음 공지 →
                </button>
              )}
            </div>
          </footer>
        </article>

        {/* 인접 공지 미리보기 */}
        {(adjacentNotices.prev || adjacentNotices.next) && (
          <div className="mapingo-adjacent-notices">
            {adjacentNotices.prev && (
              <button
                type="button"
                className="mapingo-adjacent-item"
                onClick={() => navigate(`/support/notices/${adjacentNotices.prev.id}`)}
              >
                <div className="mapingo-adjacent-info">
                  <span className="mapingo-adjacent-label">이전 글</span>
                  <span className="mapingo-adjacent-title">{adjacentNotices.prev.title}</span>
                </div>
                <span className="mapingo-list-meta">{adjacentNotices.prev.date} ›</span>
              </button>
            )}
            {adjacentNotices.next && (
              <button
                type="button"
                className="mapingo-adjacent-item"
                onClick={() => navigate(`/support/notices/${adjacentNotices.next.id}`)}
              >
                <div className="mapingo-adjacent-info">
                  <span className="mapingo-adjacent-label">다음 글</span>
                  <span className="mapingo-adjacent-title">{adjacentNotices.next.title}</span>
                </div>
                <span className="mapingo-list-meta">{adjacentNotices.next.date} ›</span>
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default SupportNoticeDetailPage;
