import { useNavigate } from 'react-router-dom';
import { demoFlowSteps } from '../data/demoFlowData';

function DemoFlowCompact({ activePath = '/' }) {
  const navigate = useNavigate();

  return (
    <section className="mapingo-demo-flow is-compact" aria-hidden={false}>
      <div className="mapingo-demo-flow-head">
        <div>
          <p className="mapingo-eyebrow">Demo Journey</p>
          <h2>데모 단계 (간단 보기)</h2>
        </div>
      </div>

      <div className="mapingo-demo-flow-grid">
        {demoFlowSteps.map((step) => (
          <button
            key={step.id}
            type="button"
            className={`mapingo-demo-step ${activePath === step.path ? 'is-active' : ''}`}
            onClick={() => navigate(step.path)}
            aria-label={step.title}
          >
            <span className="mapingo-demo-step-label">{step.label}</span>
            <h3>{step.title}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}

export default DemoFlowCompact;
