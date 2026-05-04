import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/admin/adminService';

const emptyGoalForm = {
  title: '',
  description: '',
  goalType: 'STUDY_COUNT',
  targetValue: '1',
  periodType: 'WEEKLY',
  isActive: true,
};

const goalTypeLabels = {
  STUDY_COUNT: '학습 횟수',
  PRONUNCIATION_SCORE: '발음 점수',
  SPEAKING_COUNT: '말하기 횟수',
  STUDY_TIME: '학습 시간',
};

const periodLabels = {
  DAILY: '일간',
  WEEKLY: '주간',
  MONTHLY: '월간',
  NONE: '없음',
};

function normalizeGoal(goal) {
  return {
    id: goal.goalMasterId,
    title: goal.goalTitle,
    description: goal.goalDescription,
    goalType: goal.goalType,
    targetValue: goal.targetValue,
    periodType: goal.periodType,
    isActive: goal.active,
  };
}

function AdminCommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const panelParam = searchParams.get('panel');
  const activePanel = panelParam === 'goals' ? panelParam : null;

  const [goals, setGoals] = useState([]);
  const [goalForm, setGoalForm] = useState(emptyGoalForm);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [goalLoading, setGoalLoading] = useState(false);
  const [goalError, setGoalError] = useState('');

  const sortedGoals = useMemo(
    () => [...goals].sort((left, right) => left.id - right.id),
    [goals],
  );

  const editingGoal = goals.find((goal) => goal.id === editingGoalId) ?? null;

  const fetchGoals = async () => {
    try {
      setGoalLoading(true);
      setGoalError('');

      const data = await adminService.getGoals();
      setGoals((data ?? []).map(normalizeGoal));
    } catch (error) {
      console.error(error);
      setGoalError('목표 목록을 불러오지 못했습니다.');
    } finally {
      setGoalLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const resetGoalForm = () => {
    setEditingGoalId(null);
    setGoalForm(emptyGoalForm);
  };

  const handlePanelSelect = (panel) => {
    setSearchParams({ panel });
    resetGoalForm();
  };

  const handlePanelBack = () => {
    setSearchParams({});
    resetGoalForm();
  };

  const handleGoalSubmit = async (event) => {
    event.preventDefault();

    const title = goalForm.title.trim();
    const description = goalForm.description.trim();

    if (!title || !description) {
      alert('목표명과 설명을 입력해주세요.');
      return;
    }

    const requestBody = {
      badgeId: null,
      goalType: goalForm.goalType,
      goalTitle: title,
      goalDescription: description,
      targetValue: Number(goalForm.targetValue),
      periodType: goalForm.periodType,
    };

    try {
      if (editingGoalId) {
        await adminService.updateGoal(editingGoalId, requestBody);
        alert('목표가 수정되었습니다.');
      } else {
        await adminService.createGoal(requestBody);
        alert('목표가 등록되었습니다.');
      }

      await fetchGoals();
      resetGoalForm();
    } catch (error) {
      console.error(error);
      alert('목표 저장 중 오류가 발생했습니다.');
    }
  };

  const handleEditGoal = (goal) => {
    setSearchParams({ panel: 'goals' });
    setEditingGoalId(goal.id);

    setGoalForm({
      title: goal.title,
      description: goal.description,
      goalType: goal.goalType,
      targetValue: String(goal.targetValue),
      periodType: goal.periodType,
      isActive: goal.isActive,
    });
  };

  const handleDeactivateGoal = async (goalId) => {
    try {
      await adminService.updateGoalActive(goalId, false);
      alert('목표가 비활성화되었습니다.');

      await fetchGoals();

      if (editingGoalId === goalId) {
        resetGoalForm();
      }
    } catch (error) {
      console.error(error);
      alert('목표 비활성화 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await adminService.deleteGoal(goalId);
      alert('목표가 삭제되었습니다.');

      await fetchGoals();

      if (editingGoalId === goalId) {
        resetGoalForm();
      }
    } catch (error) {
      console.error(error);
      alert('목표 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="학습 목표 관리"
        description="사용자가 선택할 수 있는 학습 목표를 등록하고 수정하며 상태를 관리합니다."
      />

      {!activePanel ? (
        <section className="mapingo-page-section">
          <div className="mapingo-domain-entry-grid admin-entry-grid admin-community-entry-grid">
            <button
              type="button"
              className="mapingo-domain-entry-card admin-entry-card admin-community-entry-card"
              onClick={() => handlePanelSelect('goals')}
            >
              <div className="community-entry-card-top">
                <span className="community-entry-accent">학습 관리</span>
                <span className="community-entry-index">01</span>
              </div>

              <div className="community-entry-card-body">
                <h3>목표 관리</h3>
                <p>학습 목표를 등록하고, 운영 상태를 관리합니다.</p>
              </div>
            </button>
          </div>
        </section>
      ) : null}

      {activePanel === 'goals' ? (
        <>
          <section className="mapingo-page-section">
            <div className="mapingo-card-header-row admin-result-head">
              <div>
                <p className="mapingo-eyebrow">Learning Admin</p>
                <h3>목표 관리</h3>
                <p className="mapingo-muted-copy">
                  사용자가 선택할 학습 목표를 등록하고 수정할 수 있습니다.
                </p>
              </div>

              <button type="button" className="mapingo-ghost-button" onClick={handlePanelBack}>
                기능 선택으로
              </button>
            </div>
          </section>

          <section className="mapingo-page-section">
            <div className="mapingo-admin-grid admin-content-layout">
              <div className="mapingo-form-card">
                <div className="mapingo-card-header-row admin-builder-head">
                  <div>
                    <h3>{editingGoalId ? '목표 수정' : '목표 등록'}</h3>
                    <p className="mapingo-muted-copy">
                      목표 이름, 설명, 조건을 입력해 학습 목표를 관리합니다.
                    </p>
                  </div>

                  <span className="mapingo-inline-badge">목표 등록 · 수정</span>
                </div>

                <form className="mapingo-admin-form admin-builder-form" onSubmit={handleGoalSubmit}>
                  {editingGoal ? (
                    <div className="admin-content-tags">
                      <span>ID {editingGoal.id}</span>
                      <span>{goalTypeLabels[editingGoal.goalType]}</span>
                      <span>{periodLabels[editingGoal.periodType]}</span>
                      <span>{editingGoal.isActive ? '활성' : '비활성'}</span>
                    </div>
                  ) : null}

                  <label className="mapingo-field">
                    <span className="mapingo-field-label">목표 이름</span>
                    <input
                      className="mapingo-input"
                      value={goalForm.title}
                      onChange={(event) =>
                        setGoalForm((current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>

                  <label className="mapingo-field">
                    <span className="mapingo-field-label">목표 설명</span>
                    <textarea
                      className="mapingo-input mapingo-admin-textarea"
                      value={goalForm.description}
                      onChange={(event) =>
                        setGoalForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>

                  <div className="admin-content-form-grid">
                    <label className="mapingo-field">
                      <span className="mapingo-field-label">목표 타입</span>
                      <select
                        className="mapingo-input"
                        value={goalForm.goalType}
                        onChange={(event) =>
                          setGoalForm((current) => ({
                            ...current,
                            goalType: event.target.value,
                          }))
                        }
                      >
                        {Object.entries(goalTypeLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="mapingo-field">
                      <span className="mapingo-field-label">목표 값</span>
                      <input
                        className="mapingo-input"
                        type="number"
                        min="1"
                        value={goalForm.targetValue}
                        onChange={(event) =>
                          setGoalForm((current) => ({
                            ...current,
                            targetValue: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label className="mapingo-field">
                      <span className="mapingo-field-label">목표 기간</span>
                      <select
                        className="mapingo-input"
                        value={goalForm.periodType}
                        onChange={(event) =>
                          setGoalForm((current) => ({
                            ...current,
                            periodType: event.target.value,
                          }))
                        }
                      >
                        {Object.entries(periodLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mapingo-admin-action-row">
                    <button type="submit" className="mapingo-submit-button">
                      {editingGoalId ? '목표 수정 저장' : '목표 등록'}
                    </button>

                    {editingGoalId ? (
                      <button type="button" className="mapingo-ghost-button" onClick={resetGoalForm}>
                        취소
                      </button>
                    ) : null}
                  </div>
                </form>
              </div>

              <div className="mapingo-list-card">
                <div className="mapingo-card-header-row admin-result-head">
                  <div>
                    <h3>목표 목록</h3>
                    <p className="mapingo-muted-copy">
                      등록된 학습 목표를 확인하고 수정, 비활성화, 삭제할 수 있습니다.
                    </p>
                  </div>

                  <span className="mapingo-inline-badge">{sortedGoals.length}개</span>
                </div>

                {goalLoading ? <p className="mapingo-muted-copy">목표 목록을 불러오는 중입니다.</p> : null}
                {goalError ? <p className="mapingo-muted-copy">{goalError}</p> : null}

                <div className="admin-entity-stack admin-growth-stack">
                  {sortedGoals.map((goal) => (
                    <article key={goal.id} className="mapingo-post-card admin-content-card">
                      <div className="mapingo-admin-item-head">
                        <div>
                          <strong>{goal.title}</strong>
                          <p>{goal.description}</p>
                        </div>

                        <span className={`admin-notice-status ${goal.isActive ? 'is-published' : 'is-draft'}`}>
                          {goal.isActive ? '활성' : '비활성'}
                        </span>
                      </div>

                      <div className="admin-content-tags">
                        <span>{goalTypeLabels[goal.goalType]}</span>
                        <span>{periodLabels[goal.periodType]}</span>
                      </div>

                      <div className="mapingo-admin-action-row admin-content-card-actions">
                        <button type="button" className="mapingo-submit-button" onClick={() => handleEditGoal(goal)}>
                          수정
                        </button>

                        <button
                          type="button"
                          className="mapingo-ghost-button"
                          onClick={() => handleDeactivateGoal(goal.id)}
                          disabled={!goal.isActive}
                        >
                          비활성화
                        </button>

                        <button type="button" className="mapingo-ghost-button" onClick={() => handleDeleteGoal(goal.id)}>
                          삭제
                        </button>
                      </div>
                    </article>
                  ))}

                  {!goalLoading && sortedGoals.length === 0 ? (
                    <div className="admin-content-empty-state">등록된 목표가 없습니다.</div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default AdminCommunityPage;