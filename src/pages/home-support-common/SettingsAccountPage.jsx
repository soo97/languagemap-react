import { useNavigate } from 'react-router-dom';
import { MapingoInfoGrid, MapingoPageSection } from '../../components/MapingoPageBlocks';

function SettingsAccountPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Settings"
        title="계정 연결"
        description="프로필, 로그인 정보, 탈퇴와 같은 계정 관련 흐름을 한곳에서 확인할 수 있습니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/settings')}>
            설정 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <MapingoInfoGrid
        items={[
          { title: '프로필 보기', description: '현재 프로필과 구독 상태를 확인하는 화면으로 이동합니다.' },
          { title: '로그인 정보', description: '로그인 방식과 계정 기본 정보를 점검하는 흐름을 가정한 안내 카드입니다.' },
          { title: '회원 탈퇴', description: '탈퇴 확인 문구 입력과 세션 종료 흐름을 확인하는 프론트 프로토타입으로 이동합니다.' },
        ]}
      />

      <div className="mapingo-page-actions">
        <button type="button" className="mapingo-submit-button" onClick={() => navigate('/profile')}>
          프로필 보기
        </button>
        <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/settings/account/delete')}>
          회원 탈퇴 화면
        </button>
      </div>
    </div>
  );
}

export default SettingsAccountPage;
