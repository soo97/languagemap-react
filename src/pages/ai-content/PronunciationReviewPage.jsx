import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoMetricGrid, MapingoPageSection } from '../../components/MapingoPageBlocks';

function PronunciationReviewPage() {
  const navigate = useNavigate();
  const [isImproved, setIsImproved] = useState(false);

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Pronunciation"
        title="발음 평가"
        description="실제 평가 API가 연결되기 전 단계에서 점수, 강점, 개선 포인트 화면을 프론트로 먼저 검증하는 페이지입니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/premium/features')}>
            프리미엄 기능으로
          </button>
        </div>
        <MapingoMetricGrid
          items={[
            { label: '발음 정확도', value: isImproved ? '92점' : '86점', hint: '문장 기준' },
            { label: '억양 자연스러움', value: isImproved ? '89점' : '81점', hint: '억양 평가' },
            { label: '문장 완성도', value: isImproved ? '94점' : '88점', hint: '누락 단어 없음' },
          ]}
        />
      </MapingoPageSection>

      <section className="mapingo-admin-grid">
        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>피드백 요약</h3>
          </div>
          <div className="mapingo-selectable-list">
            <article className="mapingo-post-card">
              <strong>좋았던 점</strong>
              <p>문장 시작 리듬이 안정적이고 핵심 단어 전달이 분명합니다.</p>
            </article>
            <article className="mapingo-post-card">
              <strong>개선 포인트</strong>
              <p>`City Hall` 발음에서 강세를 조금 더 분명하게 주면 자연스러움이 올라갑니다.</p>
            </article>
          </div>
        </article>

        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>재평가 시뮬레이션</h3>
          </div>
          <div className="mapingo-admin-form">
            <p className="mapingo-preview-copy">프론트 프로토타입 단계에서는 재녹음 후 점수가 개선되는 흐름을 시뮬레이션할 수 있습니다.</p>
            <div className="mapingo-admin-action-row">
              <button type="button" className="mapingo-submit-button" onClick={() => setIsImproved(true)}>
                재평가 반영
              </button>
              <button type="button" className="mapingo-ghost-button" onClick={() => setIsImproved(false)}>
                초기 점수 보기
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default PronunciationReviewPage;
