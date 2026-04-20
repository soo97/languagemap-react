import { useNavigate } from 'react-router-dom';
import {
  MapingoActivityList,
  MapingoChecklist,
  MapingoPageSection,
} from '../../home-support-common/components/MapingoPageBlocks';
import { useMapingoStore } from '../../../store/useMapingoStore';
import { placeService } from '../../../api/place/placeService';
import { domainPageContent } from '../../home-support-common/data/mapingoDomainData';

function CommunityFavoritesPage() {
  const navigate = useNavigate();
  const routes = placeService.fetchRoutes();
  const favoriteRouteIds = useMapingoStore((state) => state.favoriteRouteIds);
  const toggleFavoriteRoute = useMapingoStore((state) => state.toggleFavoriteRoute);
  const content = domainPageContent.community;

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="커뮤니티"
        title="목표 · 배지 · 즐겨찾기"
        description="자주 보는 학습 루트와 커뮤니티 참여 흐름을 묶어서 관리하는 화면이에요."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/community')}>
            커뮤니티 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-favorite-grid">
          {routes.map((route) => {
            const isFavorite = favoriteRouteIds.includes(route.id);

            return (
              <article key={route.id} className={`mapingo-favorite-card ${isFavorite ? 'is-favorite' : ''}`}>
                <div className="mapingo-card-header-row">
                  <h3>{route.title}</h3>
                  <button
                    type="button"
                    className={`mapingo-chip ${isFavorite ? 'is-active' : ''}`}
                    onClick={() => toggleFavoriteRoute(route.id)}
                  >
                    {isFavorite ? '저장됨' : '즐겨찾기'}
                  </button>
                </div>
                <p className="mapingo-preview-copy">{route.scenario}</p>
                <div className="mapingo-inline-badges">
                  <span className="mapingo-inline-badge">{route.category}</span>
                  <span className="mapingo-inline-badge">{route.difficulty}</span>
                  <span className="mapingo-inline-badge">{route.duration}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mapingo-feature-grid">
        <MapingoChecklist title={content.checklistTitle} items={content.checklistItems} />
        <MapingoActivityList title={content.activityTitle} items={content.activityItems} />
      </div>
    </div>
  );
}

export default CommunityFavoritesPage;
