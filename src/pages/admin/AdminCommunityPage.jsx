import { useSearchParams } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import AdminLearningGoalPage from './AdminLearningGoalPage';
import AdminFriendPage from './AdminFriendPage';
import AdminRankingPage from './AdminRankingPage';
import '../../styles/admin/AdminCommunityPage.css';

const communityTabs = [
  {
    id: 'goals',
    label: '목표 관리',
    kicker: '학습 관리',
    description: '사용자가 선택할 수 있는 학습 목표를 등록하고 수정하며 상태를 관리합니다.',
  },
  {
    id: 'friends',
    label: '친구 관리',
    kicker: '소셜 관리',
    description: '친구 차단/거절 이력과 소셜 신고 관련 데이터를 확인합니다.',
  },
  {
    id: 'ranking',
    label: '랭킹 관리',
    kicker: '순위 확인',
    description: '전체 랭킹과 주간 랭킹 리스트를 구분해 조회합니다.',
  },
];

function AdminCommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const panelParam = searchParams.get('panel');

  const activePanel = communityTabs.some((tab) => tab.id === panelParam) ? panelParam : null;
  const activeTab = communityTabs.find((tab) => tab.id === activePanel);

  const handlePanelSelect = (panel) => {
    setSearchParams({ panel });
  };

  const handlePanelBack = () => {
    setSearchParams({});
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="커뮤니티 관리"
        description="목표, 친구, 랭킹을 관리자 화면 안에서 조회하고 운영 처리합니다."
      />

      {!activePanel ? (
        <section className="mapingo-page-section">
          <div className="mapingo-domain-entry-grid admin-entry-grid admin-community-entry-grid">
            {communityTabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className="mapingo-domain-entry-card admin-entry-card admin-community-entry-card"
                onClick={() => handlePanelSelect(tab.id)}
              >
                <div className="community-entry-card-top">
                  <span className="community-entry-accent">{tab.kicker}</span>
                  <span className="community-entry-index">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <div className="community-entry-card-body">
                  <h3>{tab.label}</h3>
                  <p>{tab.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {activePanel ? (
        <section className="mapingo-page-section">
          <div className="mapingo-card-header-row admin-result-head admin-community-panel-head">
            <div>
              <p className="mapingo-eyebrow">Community Admin</p>
              <h3>{activeTab?.label}</h3>
              <p className="mapingo-muted-copy">{activeTab?.description}</p>
            </div>

            <button
              type="button"
              className="mapingo-ghost-button admin-community-action-button"
              aria-label="커뮤니티 메인으로"
              title="커뮤니티 메인으로"
              onClick={handlePanelBack}
            >
              커뮤니티 관리
            </button>
          </div>
        </section>
      ) : null}

      {activePanel === 'goals' ? <AdminLearningGoalPage /> : null}

      {activePanel === 'friends' ? <AdminFriendPage /> : null}

      {activePanel === 'ranking' ? <AdminRankingPage /> : null}
    </div>
  );
}

export default AdminCommunityPage;
