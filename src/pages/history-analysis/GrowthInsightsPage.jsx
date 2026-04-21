import { useNavigate } from 'react-router-dom';
import { MapingoActivityList, MapingoChecklist, MapingoPageSection } from '../../components/MapingoPageBlocks';
import { domainPageContent } from '../../data/mapingoDomainData';
import { learningService } from '../../api/learningService';

function GrowthInsightsPage() {
  const navigate = useNavigate();
  const content = domainPageContent.growth;
  const checklist = learningService.fetchLearningChecklist();
  const activities = learningService.fetchLearningActivities();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="성장 리포트" title="인사이트 · 추천" description="최근 학습 흐름과 다음 추천 행동만 모아서 보는 화면이에요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/growth')}>
            성장 리포트 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <div className="mapingo-feature-grid">
        <MapingoChecklist title={content.checklistTitle} items={checklist} />
        <MapingoActivityList title={content.activityTitle} items={activities} />
      </div>
    </div>
  );
}

export default GrowthInsightsPage;
