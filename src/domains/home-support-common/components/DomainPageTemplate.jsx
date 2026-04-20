import { useNavigate } from 'react-router-dom';
import {
  MapingoActivityList,
  MapingoChecklist,
  MapingoMetricGrid,
  MapingoPageSection,
} from './MapingoPageBlocks';

const getGuidePath = (title) => {
  if (!title) return null;

  if (title.includes('장소')) return '/map';
  if (title.includes('난이도') || title.includes('설정')) return '/settings/learning';
  if (title.includes('AI')) return '/ai-chat';

  return null;
};

function DomainPageTemplate({
  eyebrow,
  title,
  description,
  metrics,
  infoTitle,
  infoDescription,
  infoCards,
  checklistTitle,
  checklistItems,
  activityTitle,
  activityItems,
}) {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow={eyebrow} title={title} description={description}>
        <MapingoMetricGrid items={metrics} />
      </MapingoPageSection>

      <MapingoPageSection title={infoTitle} description={infoDescription}>
        <div className="mapingo-dashboard-grid">
          {infoCards.map(({ title: cardTitle, description: cardDescription }) => {
            const path = getGuidePath(cardTitle);

            return (
              <article
                key={cardTitle}
                className={`mapingo-detail-card ${path ? 'is-clickable' : ''}`}
                onClick={path ? () => navigate(path) : undefined}
                onKeyDown={
                  path
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          navigate(path);
                        }
                      }
                    : undefined
                }
                role={path ? 'button' : undefined}
                tabIndex={path ? 0 : undefined}
              >
                <h3>{cardTitle}</h3>
                <p>{cardDescription}</p>
                {path ? (
                  <button
                    type="button"
                    className="mapingo-link-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(path);
                    }}
                  >
                    바로 이동하기
                  </button>
                ) : null}
              </article>
            );
          })}
        </div>
      </MapingoPageSection>

      <div className="mapingo-feature-grid">
        <MapingoChecklist title={checklistTitle} items={checklistItems} />
        <MapingoActivityList title={activityTitle} items={activityItems} />
      </div>

      <section className="mapingo-page-section">
        <div className="mapingo-preview-grid">
          <article className="mapingo-detail-card mapingo-preview-card">
            <div className="mapingo-preview-card-head">
              <div>
                <p className="mapingo-field-label">지도 미리보기</p>
                <h3>선택한 장소 흐름을 먼저 보고 시작해보세요</h3>
              </div>
              <button
                type="button"
                className="mapingo-home-secondary-action"
                onClick={() => navigate('/map')}
              >
                지도 페이지로 이동
              </button>
            </div>

            <div className="mapingo-google-map placeholder mapingo-preview-map">
              장소를 선택하면 실제 지도 학습 화면으로 이어집니다.
            </div>

            <p className="mapingo-map-caption">
              카페, 지하철, 여행 같은 생활 동선별 장소 학습을 한 번에 확인할 수 있어요.
            </p>
          </article>

          <article className="mapingo-feature-card mapingo-preview-card">
            <div className="mapingo-preview-card-head">
              <div>
                <p className="mapingo-field-label">AI 대화 미리보기</p>
                <h3>지도 학습 뒤에는 바로 AI와 대화를 이어가요</h3>
              </div>
              <button
                type="button"
                className="mapingo-submit-button"
                onClick={() => navigate('/ai-chat')}
              >
                AI 대화 시작
              </button>
            </div>

            <div className="mapingo-chat-preview">
              <article className="mapingo-chat-bubble is-ai">
                <span>AI 코치</span>
                <p>카페에서 주문할 때 가장 먼저 꺼내고 싶은 문장은 무엇인가요?</p>
              </article>
              <article className="mapingo-chat-bubble is-user">
                <span>나</span>
                <p>아이스 라테 한 잔 주문하고 싶어요.</p>
              </article>
              <article className="mapingo-chat-bubble is-ai">
                <span>AI 코치</span>
                <p>좋아요. 정중한 표현으로 바꾸면 더 자연스럽게 들릴 수 있어요.</p>
              </article>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default DomainPageTemplate;
