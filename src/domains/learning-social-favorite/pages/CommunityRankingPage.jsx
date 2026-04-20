import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';
import { communityService } from '../../../api/community/communityService';

function CommunityRankingPage() {
  const navigate = useNavigate();
  const rankingList = communityService.fetchRankingList();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="커뮤니티"
        title="점수 비교 · 랭킹"
        description="주간 랭킹과 비교 점수를 별도 화면에서 더 깔끔하게 볼 수 있어요."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/community')}>
            커뮤니티 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>주간 랭킹</h3>
            <span className="mapingo-muted-copy">전체 사용자 기준</span>
          </div>

          <div className="mapingo-selectable-list">
            {rankingList.map((item) => (
              <article key={item.id} className="mapingo-select-item mapingo-static-card">
                <div>
                  <strong>{`${item.rank}위 · ${item.name}`}</strong>
                  <p>이번 주 누적 학습 점수</p>
                </div>
                <span className="mapingo-list-meta">{item.score}점</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CommunityRankingPage;
