import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { supportService } from '../../api/supportService';

function SupportFaqPage() {
  const navigate = useNavigate();
  const faqs = supportService.fetchSupportFaqs();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="고객지원" title="FAQ" description="자주 묻는 질문만 먼저 모아 빠르게 찾아볼 수 있게 했어요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/support')}>
            고객지원 메인으로
          </button>
        </div>
      </MapingoPageSection>
      <section className="mapingo-page-section">
        <div className="mapingo-list-card">
          <div className="mapingo-selectable-list">
            {faqs.map((item) => (
              <article key={item.id} className="mapingo-post-card">
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SupportFaqPage;
