import PingPopCharacterImage from '../user/PingPopCharacterImage';
import { getLevelTone } from '../../utils/community/friendUtils';

function RecommendFriendCard({ user, recommendation, onAdd }) {
    const levelTone = getLevelTone(user.levelNumber);

    return (
        <article className="community-friends-recommend-card">
            <div className="community-friends-recommend-head">
                <div className="community-friends-recommend-profile">
                    <div className="community-friends-avatar-frame is-small">
                        <div
                            className="mapingo-profile-avatar mapingo-friend-avatar"
                            aria-hidden="true"
                        >
                            <PingPopCharacterImage
                                className="mapingo-profile-avatar-logo"
                                level={user.levelNumber}
                            />
                        </div>
                    </div>

                    <div className="community-friends-copy is-recommend">
                        <div className="community-friends-title-row">
                            <h4>{user.name}</h4>
                            <span className="community-friends-match-pill">
                                {recommendation.matchLabel}
                            </span>
                        </div>

                        <p>{user.goalText}</p>

                        <span className={`community-friends-badge-pill is-${levelTone}`}>
                            {user.badgeText}
                        </span>

                        <small>{recommendation.reason}</small>
                    </div>
                </div>

                <button
                    type="button"
                    className="mapingo-submit-button"
                    onClick={() => onAdd(user.userId)}
                >
                    친구 추가
                </button>
            </div>
        </article>
    );
}

export default RecommendFriendCard;