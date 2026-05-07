import { useEffect, useMemo, useState } from "react";
import { adminRankingService } from "../../api/admin/community/adminRankingService";

const rankingScopeOptions = [
    { id: 'overall', label: '전체랭킹' },
    { id: 'weekly', label: '주간랭킹' },
];

function includesSearch(fields, query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return true;
    }

    return fields.join(' ').toLowerCase().includes(normalizedQuery);
}

function AdminRankingPage() {
    const [overallRanking, setOverallRanking] = useState([]);
    const [weeklyRanking, setWeeklyRanking] = useState([]);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [rankingSearch, setRankingSearch] = useState('');
    const [rankingScope, setRankingScope] = useState('overall');

    useEffect(() => {
        const fetchAdminRankingData = async () => {
            setIsLoading(true);
            setErrorMessage('');

            try {
                const [overallResponse, weeklyResponse, totalUserCountResponse] = await Promise.all([
                    adminRankingService.getRankings(),
                    adminRankingService.getWeeklyRankings(),
                    adminRankingService.getTotalUserCount(),
                ]);

                setOverallRanking(overallResponse.data ?? []);
                setWeeklyRanking(weeklyResponse.data ?? []);
                setTotalUserCount(totalUserCountResponse.data ?? 0);
            } catch (error) {
                console.error('관리자 랭킹 조회 실패', error);
                setErrorMessage('랭킹 정보를 불러오지 못했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminRankingData();
    }, []);

    const rankingList = rankingScope === 'weekly' ? weeklyRanking : overallRanking;

    const normalizedRankingList = useMemo(
        () =>
            rankingList.map((item, index) => ({
                id: item.id ?? item.userId ?? index + 1,
                rank: item.rank ?? index + 1,
                name: item.name ?? item.userName ?? `사용자 ${item.userId ?? index + 1}`,
                score: item.score ?? item.totalScore ?? 0,
            })),
        [rankingList],
    );

    const filteredRanking = useMemo(
        () =>
            normalizedRankingList
                .filter((item) =>
                    includesSearch([item.name, String(item.score), String(item.rank)], rankingSearch),
                )
                .sort((left, right) => left.rank - right.rank),
        [normalizedRankingList, rankingSearch],
    );

    return (
        <section className="mapingo-page-section">
            <div className="mapingo-list-card admin-ranking-panel">
                <div className="mapingo-card-header-row admin-result-head">
                    <div>
                        <h3>랭킹 리스트 조회</h3>
                        <p className="mapingo-muted-copy">전체랭킹과 주간랭킹을 구분해서 확인합니다.</p>
                    </div>

                    <span className="mapingo-inline-badge">{filteredRanking.length}명</span>
                </div>

                <div className="admin-ranking-toolbar">
                    <div className="admin-content-tags admin-ranking-tags">
                        <span>전체 사용자 수 {totalUserCount}명</span>
                        <span>{rankingScope === 'weekly' ? '주간랭킹' : '전체랭킹'}</span>
                    </div>

                    <div className="mapingo-admin-action-row admin-ranking-toggle">
                        {rankingScopeOptions.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                className={rankingScope === option.id ? 'mapingo-submit-button' : 'mapingo-ghost-button'}
                                onClick={() => setRankingScope(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <input
                        className="mapingo-input admin-notice-search admin-ranking-search"
                        type="search"
                        value={rankingSearch}
                        onChange={(event) => setRankingSearch(event.target.value)}
                        placeholder="이름, 점수 검색"
                    />
                </div>

                {isLoading ? (
                    <div className="admin-content-empty-state">랭킹 정보를 불러오는 중입니다.</div>
                ) : null}
                
                {!isLoading && errorMessage ? (
                    <div className="admin-content-empty-state">{errorMessage}</div>
                ) : null}

                {!isLoading && !errorMessage ? (
                    <div className="admin-entity-stack admin-growth-stack admin-ranking-list">
                        {filteredRanking.map((item) => (
                            <article key={item.id} className="mapingo-post-card admin-content-card admin-ranking-card">
                                <div className="mapingo-admin-item-head">
                                    <div>
                                        <strong>
                                            {item.rank}위 · {item.name}
                                        </strong>
                                        <p>{rankingScope === 'weekly' ? '주간 랭킹' : '전체 랭킹'}</p>
                                    </div>

                                    <span className="mapingo-inline-badge">{item.score.toLocaleString('ko-KR')}점</span>
                                </div>
                            </article>
                        ))}

                        {filteredRanking.length === 0 ? (
                            <div className="admin-content-empty-state">랭킹 결과가 없습니다.</div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
}

export default AdminRankingPage;