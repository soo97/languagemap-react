import { useState } from 'react';
import PingPopLogo from '../../ai-content/components/PingPopLogo';

function MapingoHero({ onPrimaryAction }) {
  const mapWidth = 480;
  const mapHeight = 260;
  const routeStops = [
    {
      id: 'start',
      label: 'START',
      title: '카페 주문 표현',
      point: { x: 74, y: 176 },
      cardClassName: 'mapingo-home-stop-start',
      nodeClassName: 'mapingo-home-node-start',
      colorClassName: 'is-start',
    },
    {
      id: 'middle',
      label: 'STOP 02',
      title: '길 묻기 표현',
      point: { x: 232, y: 126 },
      cardClassName: 'mapingo-home-stop-middle',
      nodeClassName: 'mapingo-home-node-middle',
      colorClassName: 'is-middle',
    },
    {
      id: 'goal',
      label: 'GOAL',
      title: '스몰토크 표현',
      point: { x: 426, y: 100 },
      cardClassName: 'mapingo-home-stop-goal',
      nodeClassName: 'mapingo-home-node-goal',
      colorClassName: 'is-goal',
    },
  ];

  const [activeStopId, setActiveStopId] = useState('goal');
  const activeStop = routeStops.find((stop) => stop.id === activeStopId) ?? routeStops[routeStops.length - 1];
  const [startStop, middleStop, goalStop] = routeStops;

  const toPercent = (value, total) => `${(value / total) * 100}%`;

  const featureCards = [
    {
      title: '회원가입 후 학습 기록 저장',
      text: '최근 학습, 즐겨찾기, 목표와 배지는 회원가입 이후 개인화되어 저장됩니다.',
    },
    {
      title: 'AI 추천 대화',
      text: '회원가입 후 오늘의 추천 시나리오를 바로 시작할 수 있습니다.',
    },
  ];

  return (
    <section className="mapingo-home-hero">
      <div className="mapingo-home-copy">
        <p className="mapingo-home-pill">지도 위에서 배우는 영어</p>
        <h1 className="mapingo-home-title">
          <span>장소와 문화를 따라,</span>
          <span>영어를 더 입체적으로.</span>
        </h1>
        <p className="mapingo-home-description">
          홈페이지는 최근 학습, AI 추천 대화, 무료 진입, 지도 학습 시작을 한 번에 보여 주는 서비스 허브 역할을 합니다.
        </p>

        <div className="mapingo-hero-actions">
          <button type="button" className="mapingo-home-primary" onClick={onPrimaryAction}>
            무료로 시작하기
          </button>
        </div>

        <div className="mapingo-home-feature-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="mapingo-home-feature-card">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="mapingo-home-preview-card">
        <div className="mapingo-home-preview-head">
          <div>
            <p className="mapingo-home-preview-label">오늘의 학습 경로</p>
            <h2>스몰토크 표현</h2>
            <p className="mapingo-home-preview-copy">
              가벼운 일상 대화를 열어주는 스몰토크 표현으로 마무리해요.
            </p>
          </div>
          <span className="mapingo-home-time-chip">5 min</span>
        </div>

        <div className="mapingo-home-map-card">
          <div className="mapingo-home-map-grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <svg
            className="mapingo-home-route-line"
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={`
                M ${startStop.point.x} ${startStop.point.y}
                C 128 148, 182 124, ${middleStop.point.x} ${middleStop.point.y}
                S 350 186, ${goalStop.point.x} ${goalStop.point.y}
              `}
              fill="none"
              stroke="#1fb8ad"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="9 11"
            />
          </svg>

          {routeStops.map((stop) => (
            <article key={stop.id} className={`mapingo-home-stop-card ${stop.cardClassName}`}>
              <span>{stop.label}</span>
              <strong>{stop.title}</strong>
            </article>
          ))}

          {routeStops.map((stop) => (
            <button
              key={`${stop.id}-node`}
              type="button"
              className={`mapingo-home-route-node ${stop.nodeClassName} ${stop.colorClassName} ${
                activeStopId === stop.id ? 'is-active' : ''
              }`}
              onClick={() => setActiveStopId(stop.id)}
              aria-label={`${stop.title} 위치로 이동`}
              style={{
                left: toPercent(stop.point.x, mapWidth),
                top: toPercent(stop.point.y, mapHeight),
              }}
            />
          ))}

          <div
            className="mapingo-home-goal-pin"
            style={{
              left: toPercent(activeStop.point.x, mapWidth),
              top: toPercent(activeStop.point.y, mapHeight),
            }}
          >
            <div className="mapingo-home-goal-logo">
              <PingPopLogo className="mapingo-home-goal-logo-svg" />
            </div>
            <span className="mapingo-home-goal-core" />
          </div>
        </div>
      </aside>
    </section>
  );
}

export default MapingoHero;
