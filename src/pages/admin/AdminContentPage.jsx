import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/adminService';

function AdminContentPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(adminService.fetchAdminContent());

  const handleCycleStatus = (contentId) => {
    const statusOrder = ['초안', '검수 중', '운영 중'];

    setItems((current) =>
      current.map((item) => {
        if (item.id !== contentId) return item;

        const nextIndex = (statusOrder.indexOf(item.status) + 1) % statusOrder.length;
        return { ...item, status: statusOrder[nextIndex] };
      }),
    );
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="학습 콘텐츠 관리"
        description="장소, 학습 미션, 시나리오 콘텐츠를 분류하고 상태를 변경하는 관리자용 프론트 프로토타입입니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/admin')}>
            관리자 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-list-card">
          <div className="mapingo-card-header-row">
            <h3>콘텐츠 목록</h3>
            <span className="mapingo-muted-copy">장소 · 미션 · 시나리오</span>
          </div>

          <div className="mapingo-selectable-list">
            {items.map((item) => (
              <article key={item.id} className="mapingo-post-card">
                <div className="mapingo-admin-item-head">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{`${item.type} 콘텐츠 · 난이도 ${item.difficulty} · 최근 수정 ${item.updatedAt}`}</p>
                  </div>
                  <div className="mapingo-inline-badges">
                    <span className="mapingo-inline-badge">{item.type}</span>
                    <span className="mapingo-inline-badge">{item.status}</span>
                  </div>
                </div>
                <div className="mapingo-admin-action-row">
                  <button type="button" className="mapingo-submit-button" onClick={() => handleCycleStatus(item.id)}>
                    상태 변경
                  </button>
                  <button type="button" className="mapingo-ghost-button">
                    편집
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminContentPage;
