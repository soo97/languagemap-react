import { useEffect, useRef } from 'react';

function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) return resolve(window.google.maps);

    const existing = document.getElementById('google-maps-script');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps));
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function RouteMap({ routes, activeRouteId, setActiveRouteId }) {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    let map;
    let markers = [];

    if (!apiKey) return;

    let mounted = true;

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (!mounted) return;
        const center = { lat: 37.5665, lng: 126.978 }; // Seoul default
        map = new maps.Map(mapRef.current, {
          center,
          zoom: 13,
          disableDefaultUI: true,
        });

        // place markers in a simple line near the center if routes have no coords
        routes.forEach((route, i) => {
          const lat = center.lat + (i - routes.length / 2) * 0.006;
          const lng = center.lng + (i - routes.length / 2) * 0.008;
          const marker = new maps.Marker({
            position: { lat, lng },
            map,
            title: route.title,
          });

          marker.addListener('click', () => setActiveRouteId(route.id));
          markers.push(marker);
        });
      })
      .catch(() => {
        // fail silently — map won't render
      });

    return () => {
      mounted = false;
      markers.forEach((m) => m.setMap(null));
      markers = [];
      map = null;
    };
  }, [apiKey, routes, setActiveRouteId]);

  return (
    <section className="mapingo-route-map">
      <div className="mapingo-route-map-head">
        <div>
          <p className="mapingo-eyebrow">City Route</p>
          <h2>지도를 따라 움직이며 생활 영어를 익혀보세요</h2>
        </div>
        <div className="mapingo-route-badge">진행 중인 미션 3개</div>
      </div>

      <div className="mapingo-route-board">
        <div ref={mapRef} className="mapingo-google-map" />

        <div className="mapingo-route-cards">
          {routes.map((route) => (
            <article
              key={`${route.id}-card`}
              className={`mapingo-route-card ${route.cardClass} ${route.id === activeRouteId ? 'is-active' : ''}`}
            >
              <p className="mapingo-route-card-label">{route.label}</p>
              <h3>{route.title}</h3>
              <p className="mapingo-route-card-desc">{route.desc}</p>
              <p className="mapingo-route-card-time">{route.duration}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RouteMap;
