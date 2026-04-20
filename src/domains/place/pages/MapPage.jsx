import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapingoActivityList,
  MapingoChecklist,
  MapingoInfoGrid,
  MapingoMetricGrid,
  MapingoPageSection,
} from '../../home-support-common/components/MapingoPageBlocks';
import { domainPageContent } from '../../home-support-common/data/mapingoDomainData';
import { useMapingoStore } from '../../../store/useMapingoStore';
import { placeService } from '../../../api/place/placeService';
import RouteMap from '../components/RouteMap';
import DemoFlowCompact from '../../home-support-common/components/DemoFlowCompact';

function MapPage() {
  const navigate = useNavigate();
  const content = domainPageContent.map;
  const routes = placeService.fetchRoutes();
  const tabOptions = placeService.fetchPlaceTabs();
  const query = useMapingoStore((state) => state.mapQuery);
  const activeTab = useMapingoStore((state) => state.mapActiveTab);
  const difficultyOnly = useMapingoStore((state) => state.mapDifficultyOnly);
  const selectedRouteId = useMapingoStore((state) => state.selectedRouteId);
  const setQuery = useMapingoStore((state) => state.setMapQuery);
  const setActiveTab = useMapingoStore((state) => state.setMapActiveTab);
  const setDifficultyOnly = useMapingoStore((state) => state.setMapDifficultyOnly);
  const setSelectedRouteId = useMapingoStore((state) => state.setSelectedRouteId);
  const [learningStage, setLearningStage] = useState('idle');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [chatLog, setChatLog] = useState([]);
  const [showLearningPanel, setShowLearningPanel] = useState(() => {
    try {
      const stored = localStorage.getItem('mapingo.learningPanelVisible');
      return stored == null ? true : stored === 'true';
    } catch (e) {
      return true;
    }
  });

  const filteredRoutes = routes.filter((route) => {
    const matchesTab = activeTab === 'all' || route.category === activeTab;
    const matchesDifficulty = !difficultyOnly || route.difficulty === '입문';
    const keyword = query.trim();
    const matchesQuery =
      keyword === '' || route.title.includes(keyword) || route.description.includes(keyword);

    return matchesTab && matchesDifficulty && matchesQuery;
  });

  const selectedRoute =
    routes.find((route) => route.id === selectedRouteId) ?? filteredRoutes[0] ?? routes[0];
  const activeStep = selectedRoute.chatSteps[activeStepIndex];

  const mapRoutes = routes.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || '',
    lat: r.lat,
    lng: r.lng,
  }));

  const handleSelectRoute = (routeId) => {
    setSelectedRouteId(routeId);
    setLearningStage('idle');
    setActiveStepIndex(0);
    setChatLog([]);
  };

  const handleStartLearning = () => {
    setLearningStage('chat');
    setActiveStepIndex(0);
    setChatLog([]);
  };

  const handleChooseReply = (reply) => {
    const currentStep = selectedRoute.chatSteps[activeStepIndex];
    const nextLog = [
      ...chatLog,
      { role: 'ai', speaker: currentStep.speaker, text: currentStep.prompt },
      { role: 'user', speaker: '나', text: reply },
    ];

    setChatLog(nextLog);

    if (activeStepIndex === selectedRoute.chatSteps.length - 1) {
      setLearningStage('feedback');
      return;
    }

    setActiveStepIndex((current) => current + 1);
  };

  const handleResetFlow = () => {
    setLearningStage('idle');
    setActiveStepIndex(0);
    setChatLog([]);
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="Place" title={content.sectionTitle} description={content.sectionDescription}>
        <MapingoMetricGrid
          items={[
            { label: '추천 루트', value: String(filteredRoutes.length), hint: '현재 필터 기준' },
            { label: '학습 단계', value: '장소 선택', hint: '첫 진입 기준' },
            { label: '선택 난이도', value: selectedRoute.difficulty, hint: selectedRoute.duration },
          ]}
        />
      </MapingoPageSection>

      <section className="mapingo-interactive-panel">
        <div className="mapingo-panel-controls">
          <div className="mapingo-search-box">
            <label htmlFor="route-search" className="mapingo-field-label">
              루트 검색
            </label>
            <input
              id="route-search"
              className="mapingo-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="카페, 지하철, 여행 같은 장소를 검색해보세요"
            />
          </div>

          <div className="mapingo-tab-row" role="tablist" aria-label="route category">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`mapingo-chip ${activeTab === tab.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <label className="mapingo-toggle-row">
            <input
              type="checkbox"
              checked={difficultyOnly}
              onChange={(event) => setDifficultyOnly(event.target.checked)}
            />
            <span>입문 루트만 보기</span>
          </label>
        </div>

         <div className="mapingo-route-picker-grid">
          <div className="mapingo-list-card">
            <div className="mapingo-card-header-row">
              <h3>장소 선택 결과</h3>
              <span className="mapingo-muted-copy">{`${filteredRoutes.length}개`}</span>
            </div>
            <div className="mapingo-selectable-list">
              {filteredRoutes.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  className={`mapingo-select-item ${selectedRoute.id === route.id ? 'is-active' : ''}`}
                  onClick={() => handleSelectRoute(route.id)}
                >
                  <div>
                    <strong>{route.title}</strong>
                    <p>{route.description}</p>
                  </div>
                  <span className="mapingo-list-meta">{route.duration}</span>
                </button>
              ))}
              {filteredRoutes.length === 0 ? (
                <div className="mapingo-empty-state">
                  조건에 맞는 장소 루트가 아직 없어요. 검색어와 필터를 바꿔보세요.
                </div>
              ) : null}
            </div>
          </div>

          <div className="mapingo-feature-card mapingo-route-preview-card">
            <p className="mapingo-field-label">선택된 학습 루트</p>
            <h3>{selectedRoute.title}</h3>
            <p className="mapingo-preview-copy">{selectedRoute.description}</p>
            <div className="mapingo-inline-badges">
              <span className="mapingo-inline-badge">{selectedRoute.category}</span>
              <span className="mapingo-inline-badge">{selectedRoute.difficulty}</span>
              <span className="mapingo-inline-badge">{selectedRoute.duration}</span>
            </div>
            <div className="mapingo-progress-track">
              <div className="mapingo-progress-fill" style={{ width: '68%', backgroundColor: '#14B8A6' }} />
            </div>
            <p className="mapingo-preview-copy">{selectedRoute.scenario}</p>
            <p className="mapingo-muted-copy">
              장소 선택 후 AI 대화, 종료 피드백까지 이어지는 흐름을 시작할 수 있어요.
            </p>
            <button type="button" className="mapingo-submit-button" onClick={handleStartLearning}>
              학습(대화) 시작
            </button>
            <button
              type="button"
              className="mapingo-ghost-button"
              style={{ marginLeft: 12 }}
              onClick={() => {
                setShowLearningPanel((s) => {
                  const next = !s;
                  try {
                    localStorage.setItem('mapingo.learningPanelVisible', String(next));
                  } catch (e) {}
                  return next;
                });
              }}
            >
              {showLearningPanel ? '패널 접기' : '패널 펼치기'}
            </button>
          </div>
        </div>
      </section>

      <section className={`mapingo-learning-flow-grid ${showLearningPanel ? '' : 'is-panel-collapsed'}`}>
        <RouteMap
          routes={mapRoutes}
          activeRouteId={selectedRoute.id}
          setActiveRouteId={handleSelectRoute}
          expandMap={!showLearningPanel}
        />

        <section className="mapingo-learning-panel">
          <div className="mapingo-learning-panel-head">
            <div>
              <p className="mapingo-field-label">학습 플로우</p>
              <h3>{selectedRoute.title}</h3>
              <p className="mapingo-preview-copy">{selectedRoute.coachTip}</p>
            </div>
            <span className={`mapingo-learning-stage is-${learningStage}`}>
              {learningStage === 'idle' ? '준비' : learningStage === 'chat' ? '대화 중' : '종료 평가'}
            </span>
          </div>

          {learningStage === 'idle' ? (
            <div className="mapingo-learning-empty">
              <strong>선택한 장소로 학습을 시작해보세요.</strong>
              <p>장소에 맞는 AI 대화를 시연하고, 종료 후 표현 피드백까지 확인할 수 있어요.</p>
              <button type="button" className="mapingo-submit-button" onClick={handleStartLearning}>
                {selectedRoute.difficulty} 난이도로 시작
              </button>
            </div>
          ) : null}

          {learningStage === 'chat' ? (
            <div className="mapingo-chat-session">
              <div className="mapingo-chat-log">
                {chatLog.map((message, index) => (
                  <article key={`${message.role}-${index}`} className={`mapingo-chat-bubble is-${message.role}`}>
                    <span>{message.speaker}</span>
                    <p>{message.text}</p>
                  </article>
                ))}
                <article className="mapingo-chat-bubble is-ai is-current">
                  <span>{activeStep.speaker}</span>
                  <p>{activeStep.prompt}</p>
                </article>
              </div>

              <div className="mapingo-chat-choice-list">
                {activeStep.choices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    className="mapingo-chat-choice"
                    onClick={() => handleChooseReply(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {learningStage === 'feedback' ? (
            <div className="mapingo-feedback-panel">
              <div className="mapingo-feedback-section">
                <h4>좋았던 표현</h4>
                <ul className="mapingo-feedback-list">
                  {selectedRoute.feedback.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mapingo-feedback-section">
                <h4>더 자연스럽게 말하는 팁</h4>
                <ul className="mapingo-feedback-list">
                  {selectedRoute.feedback.improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mapingo-feedback-actions">
                <button type="button" className="mapingo-submit-button" onClick={handleResetFlow}>
                  같은 장소 다시 학습하기
                </button>
                <button
                  type="button"
                  className="mapingo-home-secondary-action"
                  onClick={() => navigate('/premium')}
                >
                  더 학습하기
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </section>

      <div className="mapingo-feature-grid">
        <MapingoChecklist title={content.checklistTitle} items={content.checklistItems} />
        <MapingoActivityList title={content.activityTitle} items={content.activityItems} />
      </div>

      <MapingoPageSection title={content.guideTitle} description={content.guideDescription}>
        <MapingoInfoGrid items={content.guideCards} />
      </MapingoPageSection>

      <DemoFlowCompact activePath="/map" />
    </div>
  );
}

export default MapPage;
