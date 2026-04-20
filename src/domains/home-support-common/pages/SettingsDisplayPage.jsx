import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../components/MapingoPageBlocks';
import { useMapingoStore } from '../../../store/useMapingoStore';

function SettingsDisplayPage() {
  const navigate = useNavigate();
  const showEnglishFirst = useMapingoStore((state) => state.showEnglishFirst);
  const language = useMapingoStore((state) => state.language);
  const setShowEnglishFirst = useMapingoStore((state) => state.setShowEnglishFirst);
  const setLanguage = useMapingoStore((state) => state.setLanguage);

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="환경설정" title="표시 설정" description="언어와 표시 순서를 정리하는 설정 화면이에요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/settings')}>
            환경설정 메인으로
          </button>
        </div>
      </MapingoPageSection>
      <div className="mapingo-feature-card mapingo-form-card">
        <label className="mapingo-toggle-row is-space-between">
          <span>영어 문장 먼저 보기</span>
          <input type="checkbox" checked={showEnglishFirst} onChange={(event) => setShowEnglishFirst(event.target.checked)} />
        </label>
        <label className="mapingo-field">
          <span className="mapingo-field-label">표시 언어</span>
          <select className="mapingo-select" value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="KO">KO</option>
            <option value="EN">EN</option>
            <option value="KO/EN">KO/EN</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default SettingsDisplayPage;
