import { useState, useRef, useEffect } from 'react';
import PingPopStarterLogo from './PingPopStarterLogo';

function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no-window'));
    if (window.google && window.google.maps) return resolve(window.google.maps);

    const existing = document.getElementById('google-maps-script');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps));
      existing.addEventListener('error', () => reject(new Error('google-maps-load-failed')));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error('google-maps-load-failed'));
    document.head.appendChild(script);
  });
}

function MapingoHero({ onPrimaryAction }) {
  const mapWidth = 480;
  const mapHeight = 360;
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
  const mapRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    if (!apiKey) return undefined;

    let mounted = true;
    let map = null;
    let markers = [];

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (!mounted) return;
        const center = { lat: 37.5665, lng: 126.978 }; // Seoul
        map = new maps.Map(mapRef.current, {
          center,
          zoom: 13,
          disableDefaultUI: true,
        });

        const infoWindow = new maps.InfoWindow();

        routeStops.forEach((stop, i) => {
          const position = {
            lat: center.lat + (i - routeStops.length / 2) * 0.006,
            lng: center.lng + (i - routeStops.length / 2) * 0.008,
          };

          const color = i === 0 ? '#155e63' : i === routeStops.length - 1 ? '#f3b41b' : '#1fb8ad';

          const marker = new maps.Marker({
            position,
            map,
            title: stop.title,
            icon: {
              path:
                'M0 -48c-9.9 0-18 8.1-18 18 0 13.5 18 36 18 36s18-22.5 18-36c0-9.9-8.1-18-18-18z',
              fillColor: color,
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 2,
              scale: 0.45,
              anchor: new maps.Point(0, 0),
            },
          });

          marker.addListener('click', () => {
            setActiveStopId(stop.id);
            const content = `<div style="min-width:180px"><strong>${stop.title}</strong><p style='margin:6px 0 0;font-size:0.9rem;color:#51657a'>${stop.label}</p></div>`;
            infoWindow.setContent(content);
            infoWindow.open({ anchor: marker, map });
          });

          marker.addListener('mouseover', () => {
            infoWindow.setContent(`<strong>${stop.title}</strong>`);
            infoWindow.open({ anchor: marker, map });
          });
          marker.addListener('mouseout', () => {
            infoWindow.close();
          });

          markers.push(marker);
        });

        setMapsLoaded(true);
      })
      .catch(() => {});

    return () => {
      mounted = false;
      markers.forEach((m) => m.setMap(null));
      markers = [];
      map = null;
    };
  }, [apiKey]);

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

                    {/* caption removed to restore original button layout */}

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
          {!apiKey || !mapsLoaded ? (
            // fallback: original static SVG when Google Maps not available
            <>
                    <div
                      ref={mapRef}
                      className={`mapingo-google-map ${!apiKey || !mapsLoaded ? 'placeholder' : ''}`}
                      style={{ height: 360 }}
                    />

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
                        <PingPopStarterLogo className="mapingo-home-goal-logo-svg" />
                      </div>
                      <span className="mapingo-home-goal-core" />
                    </div>
            </>
          ) : (
            // Google Maps preview
            <>
              <div ref={mapRef} className="mapingo-google-map" style={{ height: 360 }} />
              <div className="mapingo-route-cards" style={{ marginTop: 8 }}>
                {routeStops.map((stop) => (
                  <article key={stop.id} className={`mapingo-route-card ${stop.cardClassName}`} style={{ minWidth: 160 }}>
                    <p className="mapingo-route-card-label">{stop.label}</p>
                    <h3 style={{ marginTop: 6 }}>{stop.title}</h3>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>
    </section>
  );
}

export default MapingoHero;
