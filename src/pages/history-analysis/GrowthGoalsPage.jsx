import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { useMapingoStore } from '../../store/useMapingoStore';
import { learningService } from '../../api/learningService';

function GrowthGoalsPage() {
  const navigate = useNavigate();
  const weeklyGoal = useMapingoStore((state) => state.weeklyGoal);
  const weeklyGoalCompleted = useMapingoStore((state) => state.weeklyGoalCompleted);
  const currentLevel = useMapingoStore((state) => state.currentLevel);
  const currentLevelId = useMapingoStore((state) => state.currentLevelId);
  const notificationsEnabled = useMapingoStore((state) => state.notificationsEnabled);
  const studyTime = useMapingoStore((state) => state.studyTime);
  const setCurrentLevel = useMapingoStore((state) => state.setCurrentLevel);
  const setWeeklyGoal = useMapingoStore((state) => state.setWeeklyGoal);
  const setWeeklyGoalCompleted = useMapingoStore((state) => state.setWeeklyGoalCompleted);
  const setNotificationsEnabled = useMapingoStore((state) => state.setNotificationsEnabled);
  const setStudyTime = useMapingoStore((state) => state.setStudyTime);
  const levelOptions = learningService.fetchLearningLevelOptions();
  const completionRate = Math.min(
    100,
    Math.round((weeklyGoalCompleted / Number(weeklyGoal || 1)) * 100),
  );

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="성장 리포트"
        title="레벨 · 목표 조정"
        description="현재 학습 단계와 목표 달성 정도를 직접 바꿔볼 수 있어요."
      >
        <div className="mapingo-page-actions">
          <button
            type="button"
            className="mapingo-ghost-button"
            onClick={() => navigate('/growth')}
          >
            성장 리포트 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-interactive-panel mapingo-goals-panel">
        <div className="mapingo-route-picker-grid mapingo-goals-layout">
          <div className="mapingo-feature-card mapingo-form-card">
            <div className="mapingo-card-header-row">
              <h3>학습 레벨과 목표 조정</h3>
              <span className="mapingo-muted-copy">학습 설정까지 한 번에 관리할 수 있어요</span>
            </div>

            <label className="mapingo-field">
              <span className="mapingo-field-label">현재 레벨</span>
              <select
                className="mapingo-select"
                value={currentLevelId}
                onChange={(event) => {
                  const selected = levelOptions.find((option) => option.id === event.target.value);
                  if (selected) {
                    setCurrentLevel({ id: selected.id, label: selected.label });
                  }
                }}
              >
                {levelOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="mapingo-field">
              <span className="mapingo-field-label">주간 목표</span>
              <select
                className="mapingo-select"
                value={weeklyGoal}
                onChange={(event) => setWeeklyGoal(event.target.value)}
              >
                <option value="3">주 3회</option>
                <option value="5">주 5회</option>
                <option value="7">매일</option>
              </select>
            </label>

            <label className="mapingo-field">
              <span className="mapingo-field-label">이번 주 달성 횟수</span>
              <input
                className="mapingo-range-input"
                type="range"
                min="0"
                max={weeklyGoal}
                value={weeklyGoalCompleted}
                style={{ '--range-progress': `${completionRate}%` }}
                onChange={(event) => setWeeklyGoalCompleted(Number(event.target.value))}
              />
            </label>

            <label className="mapingo-toggle-row is-space-between">
              <span>학습 알림 활성화</span>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(event) => setNotificationsEnabled(event.target.checked)}
              />
            </label>

            <label className="mapingo-field">
              <span className="mapingo-field-label">알림 시간</span>
              <input
                className="mapingo-input"
                type="time"
                value={studyTime}
                onChange={(event) => setStudyTime(event.target.value)}
              />
            </label>

            <div className="mapingo-inline-badges">
              <span className="mapingo-inline-badge">{currentLevel}</span>
              <span className="mapingo-inline-badge">{`주간 목표 ${weeklyGoal}회`}</span>
              <span className="mapingo-inline-badge">{`현재 ${weeklyGoalCompleted}회 완료`}</span>
              <span className="mapingo-inline-badge">
                {notificationsEnabled ? `알림 ${studyTime}` : '알림 꺼짐'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GrowthGoalsPage;
