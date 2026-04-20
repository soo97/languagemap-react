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

function RouteMap({ routes, activeRouteId, setActiveRouteId, expandMap = false }) {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    if (!apiKey) return;

    let mounted = true;
    let map = null;
    let markers = [];

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (!mounted) return;
        map = new maps.Map(mapRef.current, {
          center: { lat: 37.5665, lng: 126.978 },
          zoom: 13,
          disableDefaultUI: true,
        });

        const bounds = new maps.LatLngBounds();
        const infoWindow = new maps.InfoWindow();

        routes.forEach((stop, i) => {
          const position = stop && stop.lat && stop.lng
            ? { lat: stop.lat, lng: stop.lng }
            : {
                lat: 37.5665 + (i - routes.length / 2) * 0.006,
                lng: 126.978 + (i - routes.length / 2) * 0.008,
              };

          const color = stop.color || '#1fb8ad';
          const marker = new maps.Marker({
            position,
            map,
            title: stop.title || stop.id,
            icon: {
              path:
                'M0 -48c-9.9 0-18 8.1-18 18 0 13.5 18 36 18 36s18-22.5 18-36c0-9.9-8.1-18-18-18z',
              fillColor: color,
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 2,
              scale: 0.5,
              anchor: new maps.Point(0, 0),
            },
          });

          marker.addListener('click', () => {
            setActiveRouteId(stop.id);
            const content = `<div style="min-width:200px"><strong>${stop.title}</strong><p style='margin:6px 0 0;font-size:0.9rem;color:#51657a'>${stop.description || ''}</p></div>`;
            infoWindow.setContent(content);
            infoWindow.open({ anchor: marker, map });
          });

          marker.addListener('mouseover', () => {
            const content = `<strong>${stop.title}</strong>`;
            infoWindow.setContent(content);
            infoWindow.open({ anchor: marker, map });
          });
          marker.addListener('mouseout', () => {
            infoWindow.close();
          });

          markers.push(marker);
          bounds.extend(position);
        });

        if (!bounds.isEmpty()) map.fitBounds(bounds, 64);
      })
      .catch(() => {});

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
        <div
          ref={mapRef}
          className={`mapingo-google-map ${!apiKey ? 'placeholder' : ''} ${expandMap ? 'full-width' : ''}`}
        />

        {!apiKey ? (
          <p className="mapingo-map-caption small">Google Maps API 키를 설정하면 지도가 표시됩니다.</p>
        ) : null}

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
