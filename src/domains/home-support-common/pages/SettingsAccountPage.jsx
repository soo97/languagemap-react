import { useNavigate } from 'react-router-dom';
import { MapingoInfoGrid, MapingoPageSection } from '../components/MapingoPageBlocks';

function SettingsAccountPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow="환경설정" title="계정 연결" description="프로필과 연결된 계정 흐름을 확인하는 화면이에요.">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/settings')}>
            환경설정 메인으로
          </button>
        </div>
      </MapingoPageSection>
      <MapingoInfoGrid
        items={[
          { title: '프로필 보기', description: '현재 프로필과 구독 상태를 확인하는 화면으로 이어집니다.' },
          { title: '로그인 정보', description: '로그인 및 계정 관련 흐름을 한곳에서 정리할 수 있어요.' },
          { title: '환경 동기화', description: '설정한 표시 방식과 학습 흐름을 프로필과 함께 유지합니다.' },
        ]}
      />
    </div>
  );
}

export default SettingsAccountPage;
