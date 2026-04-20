import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';
import { communityService } from '../../../api/community/communityService';

function CommunityFriendsPage() {
  const navigate = useNavigate();
  const friends = communityService.fetchFriendComparison();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="커뮤니티"
        title="친구 관리"
        description="친구별 학습 포커스와 연속 학습 흐름을 가볍게 확인할 수 있는 페이지예요."
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
            <h3>친구 목록</h3>
            <span className="mapingo-muted-copy">{friends.length}명</span>
          </div>

          <div className="mapingo-selectable-list">
            {friends.map((friend) => (
              <article key={friend.id} className="mapingo-select-item mapingo-static-card">
                <div>
                  <strong>{friend.name}</strong>
                  <p>{`${friend.focus} 중심 학습 · 연속 ${friend.streak}일`}</p>
                </div>
                <span className="mapingo-list-meta">{friend.score}점</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CommunityFriendsPage;
