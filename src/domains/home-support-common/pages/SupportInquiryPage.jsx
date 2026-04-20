import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../components/MapingoPageBlocks';
import { supportService } from '../../../api/support/supportService';
import { useMapingoStore } from '../../../store/useMapingoStore';

function SupportInquiryPage() {
  const navigate = useNavigate();
  const categories = supportService.fetchSupportInquiryTemplates();
  const inquiryForm = useMapingoStore((state) => state.supportInquiryForm);
  const inquiries = useMapingoStore((state) => state.supportInquiries);
  const setSupportInquiryForm = useMapingoStore((state) => state.setSupportInquiryForm);
  const resetSupportInquiryForm = useMapingoStore((state) => state.resetSupportInquiryForm);
  const addSupportInquiry = useMapingoStore((state) => state.addSupportInquiry);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSupportInquiryForm({
      ...inquiryForm,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!inquiryForm.title || !inquiryForm.body) {
      return;
    }

    addSupportInquiry(inquiryForm);
    resetSupportInquiryForm();
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="고객지원" title="문의하기" description="게시판 형태로 문의를 남기고 상태를 확인할 수 있어요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/support')}>
            고객지원 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-interactive-panel">
        <div className="mapingo-route-picker-grid">
          <div className="mapingo-feature-card mapingo-form-card">
            <div className="mapingo-card-header-row">
              <h3>문의 작성</h3>
              <span className="mapingo-muted-copy">게시판 형태 시연</span>
            </div>

            <label className="mapingo-field">
              <span className="mapingo-field-label">문의 유형</span>
              <select className="mapingo-select" name="category" value={inquiryForm.category} onChange={handleChange}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="mapingo-field">
              <span className="mapingo-field-label">제목</span>
              <input className="mapingo-input" name="title" value={inquiryForm.title} onChange={handleChange} placeholder="문의 제목을 입력해보세요" />
            </label>

            <label className="mapingo-field">
              <span className="mapingo-field-label">문의 내용</span>
              <textarea className="mapingo-textarea" name="body" value={inquiryForm.body} onChange={handleChange} placeholder="문의 내용을 적어보세요" />
            </label>

            <button type="button" className="mapingo-submit-button" onClick={handleSubmit}>
              문의 등록하기
            </button>
          </div>

          <div className="mapingo-list-card">
            <div className="mapingo-card-header-row">
              <h3>내 문의</h3>
              <span className="mapingo-muted-copy">{inquiries.length}건</span>
            </div>
            <div className="mapingo-selectable-list">
              {inquiries.map((item) => (
                <article key={item.id} className="mapingo-post-card">
                  <div className="mapingo-post-head">
                    <strong>{item.title}</strong>
                    <span className="mapingo-list-meta">{item.status}</span>
                  </div>
                  <p>{item.category}</p>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SupportInquiryPage;
