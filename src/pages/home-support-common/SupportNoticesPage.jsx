import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { supportService } from '../../api/supportService';

function SupportNoticesPage() {
  const navigate = useNavigate();
  const notices = supportService.fetchSupportNotices();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="고객지원" title="공지사항" description="최근 업데이트와 서비스 변경 내용을 모아둔 화면이에요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/support')}>
            고객지원 메인으로
          </button>
        </div>
      </MapingoPageSection>
      <section className="mapingo-page-section">
        <div className="mapingo-list-card">
          <div className="mapingo-selectable-list">
            {notices.map((item) => (
                <article
                  key={item.id}
                  className="mapingo-post-card"
                  onClick={() => navigate(`/support/notices/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                <div className="mapingo-post-head">
                  <strong>{item.title}</strong>
                  <span className="mapingo-list-meta">{item.meta}</span>
                </div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SupportNoticesPage;
