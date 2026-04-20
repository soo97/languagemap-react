import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../components/MapingoPageBlocks';
import { useMapingoStore } from '../../../store/useMapingoStore';

function SettingsLearningPage() {
  const navigate = useNavigate();
  const notificationsEnabled = useMapingoStore((state) => state.notificationsEnabled);
  const weeklyGoal = useMapingoStore((state) => state.weeklyGoal);
  const studyTime = useMapingoStore((state) => state.studyTime);
  const setNotificationsEnabled = useMapingoStore((state) => state.setNotificationsEnabled);
  const setWeeklyGoal = useMapingoStore((state) => state.setWeeklyGoal);
  const setStudyTime = useMapingoStore((state) => state.setStudyTime);

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="환경설정" title="학습 설정" description="알림과 목표, 학습 시간을 조정하는 화면이에요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/settings')}>
            환경설정 메인으로
          </button>
        </div>
      </MapingoPageSection>
      <div className="mapingo-feature-card mapingo-form-card">
        <label className="mapingo-toggle-row is-space-between">
          <span>학습 알림 활성화</span>
          <input type="checkbox" checked={notificationsEnabled} onChange={(event) => setNotificationsEnabled(event.target.checked)} />
        </label>
        <label className="mapingo-field">
          <span className="mapingo-field-label">알림 시간</span>
          <input className="mapingo-input" type="time" value={studyTime} onChange={(event) => setStudyTime(event.target.value)} />
        </label>
        <label className="mapingo-field">
          <span className="mapingo-field-label">주간 목표</span>
          <select className="mapingo-select" value={weeklyGoal} onChange={(event) => setWeeklyGoal(event.target.value)}>
            <option value="3">주 3회</option>
            <option value="5">주 5회</option>
            <option value="7">매일</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default SettingsLearningPage;
