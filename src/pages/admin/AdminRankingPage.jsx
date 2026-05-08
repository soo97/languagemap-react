import { useAdminRanking } from "../../hooks/community/useAdminRanking";

const rankingScopeOptions = [
    { id: 'overall', label: '전체랭킹' },
    { id: 'weekly', label: '주간랭킹' },
];

function AdminRankingPage() {
    const {
        totalUserCount,
        isLoading,
        errorMessage,
        rankingSearch,
        setRankingSearch,
        rankingScope,
        setRankingScope,
        filteredRanking,
    } = useAdminRanking();

    return (
        <section className="mapingo-page-section">
            <div className="mapingo-list-card admin-ranking-panel">
                <div className="mapingo-card-header-row admin-result-head">
                    <div>
                        <h3>랭킹 리스트 조회</h3>
                        <p className="mapingo-muted-copy">전체랭킹과 주간랭킹을 구분해서 확인합니다.</p>
                    </div>

                    <span className="mapingo-inline-badge">랭킹 {filteredRanking.length}명</span>
                </div>

                <div className="admin-ranking-toolbar">
                    <div className="admin-content-tags admin-ranking-tags">
                        <span>전체 사용자 수 {totalUserCount ?? overallRanking.length}명</span>
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

                {!isLoading ? (
                    <div className="admin-content-empty-state">{errorMessage}</div>
                ) : null}

                {!isLoading ? (
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