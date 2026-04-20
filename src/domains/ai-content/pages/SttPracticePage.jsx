import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';

function SttPracticePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('idle');

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="STT"
        title="STT 음성 변환"
        description="실제 음성 인식 API 대신, 녹음 시작 · 변환 중 · 변환 결과 단계를 프론트 프로토타입으로 검증하는 화면입니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/premium/features')}>
            프리미엄 기능으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-admin-grid">
        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>연습 문장</h3>
          </div>
          <div className="mapingo-selectable-list">
            <article className="mapingo-post-card">
              <strong>Could you tell me how to get to City Hall?</strong>
              <p>길 묻기 상황에서 자주 쓰는 문장으로 STT · 발음 평가 흐름을 함께 확인할 수 있습니다.</p>
            </article>
          </div>
        </article>

        <article className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>음성 상태</h3>
          </div>
          <div className="mapingo-admin-form">
            <div className="mapingo-admin-action-row">
              <button type="button" className="mapingo-submit-button" onClick={() => setStep('recording')}>
                녹음 시작
              </button>
              <button type="button" className="mapingo-ghost-button" onClick={() => setStep('transcribed')}>
                변환 완료 보기
              </button>
            </div>
            <div className="mapingo-empty-state">
              {step === 'idle' ? '아직 녹음 전입니다. 마이크 권한 확인 후 녹음을 시작하는 흐름을 가정합니다.' : null}
              {step === 'recording' ? '녹음 중입니다. 실제 구현에서는 실시간 파형과 녹음 시간 표시가 함께 보입니다.' : null}
              {step === 'transcribed' ? 'STT 결과: Could you tell me how to get to City Hall?' : null}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default SttPracticePage;
