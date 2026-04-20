import { useNavigate } from 'react-router-dom';
import { MapingoMetricGrid, MapingoPageSection, MapingoInfoGrid } from '../../home-support-common/components/MapingoPageBlocks';
import { useMapingoStore } from '../../../store/useMapingoStore';
import { learningService } from '../../../api/learning/learningService';

function GrowthProgressPage() {
  const navigate = useNavigate();
  const pronunciationScore = useMapingoStore((state) => state.pronunciationScore);
  const fluencyScore = useMapingoStore((state) => state.fluencyScore);
  const weeklyLearnCount = useMapingoStore((state) => state.weeklyLearnCount);
  const highlights = learningService.fetchGrowthHighlights();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="성장 리포트" title="성장 지표" description="핵심 수치를 먼저 확인하는 요약 페이지예요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/growth')}>
            성장 리포트 메인으로
          </button>
        </div>
        <MapingoMetricGrid
          items={[
            { label: '발음 점수', value: `${pronunciationScore}점`, hint: '지난주 대비 상승' },
            { label: '유창성 점수', value: `${fluencyScore}점`, hint: '머뭇거림 감소' },
            { label: '학습 횟수', value: `${weeklyLearnCount}회`, hint: '최근 7일 기준' },
          ]}
        />
      </MapingoPageSection>

      <MapingoPageSection title="성장 하이라이트" description="최근 학습 흐름에서 눈에 띄는 포인트만 정리했어요.">
        <MapingoInfoGrid items={highlights} />
      </MapingoPageSection>
    </div>
  );
}

export default GrowthProgressPage;
