import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../home-support-common/components/MapingoPageBlocks';
import PingPopCharacterImage from '../../ai-content/components/PingPopCharacterImage';
import { communityService } from '../../../api/community/communityService';

const friendThemes = [
  {
    levelLabel: 'Lv.20',
    levelNumber: 20,
    badgeTitle: '길 찾는 탐험가',
    badgeDetail: 'City Explorer',
    levelClass: 'is-teal',
    badgeClass: 'is-teal',
    levelText: 'Beginner',
  },
  {
    levelLabel: 'Lv.40',
    levelNumber: 40,
    badgeTitle: '문화 정복자',
    badgeDetail: 'City Explorer',
    levelClass: 'is-purple',
    badgeClass: 'is-purple',
    levelText: 'Intermediate',
  },
  {
    levelLabel: 'Lv.10',
    levelNumber: 10,
    badgeTitle: '시내 여행자',
    badgeDetail: 'City Explorer',
    levelClass: 'is-lime',
    badgeClass: 'is-lime',
    levelText: 'Starter',
  },
];

const focusFallback = {
  '移댄럹 ?뚰솕': '카페 회화',
  '?대룞 ?쒗쁽': '이동 표현',
  '?ㅻぐ?좏겕': '스몰 토크',
};

function CommunityFriendsPage() {
  const navigate = useNavigate();
  const initialFriends = communityService.fetchFriendComparison();
  const [friends, setFriends] = useState(initialFriends);
  const [query, setQuery] = useState('');

  const cards = useMemo(
    () =>
      friends.map((friend, index) => {
        const theme = friendThemes[index % friendThemes.length];
        const safeFocus = focusFallback[friend.focus] ?? friend.focus;

        return {
          ...friend,
          email: `${friend.name.toLowerCase()}@mapingo.ai`,
          focusText: safeFocus,
          goalText: `주 ${Math.max(3, Math.ceil(friend.streak / 2))}회 말하기 연습`,
          nextPercent: Math.max(18, 58 - index * 6),
          ...theme,
        };
      }),
    [friends],
  );

  const handleRemove = (friendId) => {
    setFriends((current) => current.filter((friend) => friend.id !== friendId));
  };

  const handleInvite = () => {
    setQuery('');
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="친구 관리"
        title="친구 추가 · 삭제 · 목록 조회"
        description="친구 프로필과 학습 배지를 카드 형태로 보고 관리할 수 있습니다."
      >
        <div className="mapingo-friend-layout">
          <section className="mapingo-friend-list">
            {cards.map((friend) => (
              <article key={friend.id} className="mapingo-friend-card">
                <div className="mapingo-friend-card-head">
                  <div className="mapingo-friend-identity">
                    <div className="mapingo-friend-avatar-column">
                      <div className={`mapingo-friend-level-pill ${friend.levelClass}`}>{friend.levelLabel}</div>
                      <div className="mapingo-friend-avatar-frame">
                        <div className="mapingo-profile-avatar mapingo-friend-avatar" aria-hidden="true">
                          <PingPopCharacterImage
                            className="mapingo-profile-avatar-logo"
                            level={friend.levelNumber}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mapingo-friend-copy">
                      <h3>{friend.name}</h3>
                      <p>{friend.email}</p>
                      <span className={`mapingo-friend-badge-pill ${friend.badgeClass}`}>
                        {friend.badgeTitle} : {friend.badgeDetail}
                      </span>
                      <small>다음 레벨 배지까지 {friend.nextPercent}% 남았어요</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mapingo-ghost-button"
                    onClick={() => handleRemove(friend.id)}
                  >
                    삭제
                  </button>
                </div>

                <div className="mapingo-profile-info-grid">
                  <article className="mapingo-profile-info-tile">
                    <strong>계정 상태</strong>
                    <p>정상 이용 중 · 일반 회원</p>
                  </article>
                  <article className="mapingo-profile-info-tile">
                    <strong>학습 레벨</strong>
                    <p>{friend.levelText} · {friend.levelLabel.replace('Lv.', 'Lv. ')}</p>
                  </article>
                  <article className="mapingo-profile-info-tile">
                    <strong>학습 목표</strong>
                    <p>{friend.goalText}</p>
                  </article>
                  <article className="mapingo-profile-info-tile">
                    <strong>획득 배지</strong>
                    <p>{friend.badgeTitle} · {friend.badgeDetail}</p>
                  </article>
                </div>
              </article>
            ))}
          </section>

          <aside className="mapingo-friend-add-card">
            <h3>친구 추가</h3>
            <input
              className="mapingo-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="이메일 또는 닉네임 검색"
            />
            <button type="button" className="mapingo-submit-button" onClick={handleInvite}>
              친구 요청 보내기
            </button>
            <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/community')}>
              커뮤니티 메인으로
            </button>
          </aside>
        </div>
      </MapingoPageSection>
    </div>
  );
}

export default CommunityFriendsPage;
