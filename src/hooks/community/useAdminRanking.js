import { useEffect, useMemo, useState } from "react";
import { adminRankingService } from "../../api/admin/community/adminRankingService";

function includesSearch(fields, query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return true;
    }

    return fields.join(' ').toLowerCase().includes(normalizedQuery);
}

export function useAdminRanking() {
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
                const overallResponse = await adminRankingService.getRankings();
                setOverallRanking(Array.isArray(overallResponse) ? overallResponse : overallResponse.data ?? []);
            } catch (error) {
                console.error('전체 랭킹 조회 실패', error);
                setErrorRanking([]);
                setErrorMessage('전체 랭킹 정보를 불러오지 못했습니다.');
            }

            try {
                const weeklyResponse = await adminRankingService.getWeeklyRankings();
                setWeeklyRanking(Array.isArray(weeklyRanking) ? weeklyResponse : weeklyResponse.data ?? []);
            } catch (error) {
                console.error('주간 랭킹 조회 실패', error);
                setWeeklyRanking([]);
            }

            try {
                const totalUserCountResponse = await adminRankingService.getTotalUserCount();

                setTotalUserCount(
                    totalUserCountResponse.totalUserCount ??
                    totalUserCountResponse.data?.totalUserCount ?? 
                    totalUserCountResponse.data ??
                    0,
                );
            } catch (error) {
                console.error('전체 사용자 수 조회 실패', error);
                setTotalUserCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminRankingData();
    }, []);

    const rankingList =
        rankingScope === 'weekly'
            ? weeklyRanking
            : overallRanking.length > 0
                ? overallRanking
                : weeklyRanking;

    const normalizedRankingList = useMemo(
        () =>
            rankingList.map((item, index) => ({
                id: item.userId ?? index + 1,
                rank: item.rank ?? index + 1,
                name: item.userName ?? item.name ?? `USER ${item.userId ?? index + 1}`,
                score: item.totalScore ?? 0,
            })),
        [rankingList],
    );

    const filteredRanking = useMemo(
        () =>
            normalizedRankingList
                .filter((item) =>
                    includesSearch([item.name, String(item.score), String(item.rank), String(item.id)], rankingSearch),
                )
                .sort((left, right) => left.rank - right.rank),
        [normalizedRankingList, rankingSearch],
    );

    return {
        overallRanking,
        weeklyRanking,
        totalUserCount,
        isLoading,
        errorMessage,
        rankingSearch,
        setRankingSearch,
        rankingScope,
        setRankingScope,
        filteredRanking,
    };
}
