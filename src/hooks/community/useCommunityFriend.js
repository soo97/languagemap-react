import { useEffect, useMemo, useState } from 'react';
import { friendService } from '../../api/user/friendService';

const getResponseData = (response) => {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    if (Array.isArray(response.data)) return response.data;
    return [];
};

const normalizeRelation = (row) => ({
    friendship_id: row.friendship_id ?? row.friendshipId,
    requester_id: row.requester_id ?? row.requesterId,
    addressee_id: row.addressee_id ?? row.addresseeId,
    requester_name:
        row.requester_name ?? row.requesterName ?? `사용자 ${row.requesterId}`,
    requester_email: row.requester_email ?? row.requesterEmail ?? '-',
    addressee_name:
        row.addressee_name ?? row.addresseeName ?? `사용자 ${row.addresseeId}`,
    addressee_email: row.addressee_email ?? row.addresseeEmail ?? '-',
    status: row.status,
    requested_at: row.requested_at ?? row.requestedAt,
    responded_at: row.responded_at ?? row.respondedAt,
});

const normalizeRecommendUser = (row) => ({
    userId: row.userId ?? row.user_id,
    name: row.name,
    email: row.email,
    levelLabel: row.levelLabel ?? `Lv.${row.levelNumber ?? row.level ?? 1}`,
    levelNumber: row.levelNumber ?? row.level ?? 1,
    goalText: row.goalText ?? row.goal ?? '학습 목표 정보가 없어요.',
    badgeText: row.badgeText ?? row.badge ?? '기본 배지',
    matchLabel: row.matchLabel ?? '추천 친구',
    reason: row.reason ?? '학습 패턴이 비슷해요.',
});

export function useCommunityFriends() {
    const [friendshipRows, setFriendshipRows] = useState([]);
    const [recommendedFriends, setRecommendedFriends] = useState([]);
    const [userReportRows] = useState([]);

    const [inviteQuery, setInviteQuery] = useState('');
    const [reportTargetId, setReportTargetId] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const currentUserId = Number(localStorage.getItem('userId')) || 1;

    const loadFriendData = async () => {
        try {
            setIsLoading(true);

            const [friends, received, sent, history, recommends] = await Promise.all([
                friendService.getFriends(currentUserId),
                friendService.getReceivedFriendRequests(currentUserId),
                friendService.getSentFriendRequests(currentUserId),
                friendService.getFriendHistory(currentUserId),
                friendService.getRecommendFriends(currentUserId),
            ]);

            console.log('friends:', friends);
            console.log('received:', received);
            console.log('sent:', sent);
            console.log('history:', history);
            console.log('recommends:', recommends);

            const relationRows = [
                ...getResponseData(friends),
                ...getResponseData(received),
                ...getResponseData(sent),
                ...getResponseData(history),
            ].map(normalizeRelation);

            const uniqueRelationRows = relationRows.filter(
                (row, index, self) =>
                    row.friendship_id &&
                    index === self.findIndex(
                        (item) => item.friendship_id === row.friendship_id,
                    ),
            );

            const recommendRows = getResponseData(recommends).map(normalizeRecommendUser);

            setFriendshipRows(uniqueRelationRows);
            setRecommendedFriends(recommendRows);

            if (recommendRows.length > 0 && !reportTargetId) {
                setReportTargetId(String(recommendRows[0].userId));
            }
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 정보를 불러오지 못했어요.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadFriendData();
    }, []);

    const acceptedFriends = useMemo(
        () => friendshipRows.filter((row) => row.status === 'ACCEPTED'),
        [friendshipRows],
    );

    const pendingRequests = useMemo(
        () => friendshipRows.filter((row) => row.status === 'PENDING'),
        [friendshipRows],
    );

    const archivedRelations = useMemo(
        () =>
            friendshipRows.filter((row) =>
                ['REJECTED', 'BLOCKED'].includes(row.status),
            ),
        [friendshipRows],
    );

    const availableUsers = useMemo(() => recommendedFriends, [recommendedFriends]);

    const sendFriendRequest = async (targetUserId) => {
        try {
            await friendService.sendFriendRequest({
                addresseeId: targetUserId,
            });

            await loadFriendData();

            const targetUser = recommendedFriends.find(
                (user) => user.userId === targetUserId,
            );

            setFeedbackMessage(
                targetUser
                    ? `${targetUser.name}님에게 친구 요청을 보냈어요.`
                    : '친구 요청을 보냈어요.',
            );
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 요청에 실패했어요.');
        }
    };

    const handleInvite = async () => {
        const normalizedQuery = inviteQuery.trim();

        if (!normalizedQuery) {
            setFeedbackMessage('닉네임이나 이메일을 입력해 주세요.');
            return;
        }

        try {
            if (normalizedQuery.includes('@')) {
                await friendService.sendFriendRequestByEmail({
                    email: normalizedQuery,
                });

                await loadFriendData();
                setInviteQuery('');
                setFeedbackMessage('이메일로 친구 요청을 보냈어요.');
                return;
            }

            const targetUser = recommendedFriends.find((user) =>
                user.name?.toLowerCase().includes(normalizedQuery.toLowerCase()),
            );

            if (!targetUser) {
                setFeedbackMessage('일치하는 사용자를 찾지 못했어요.');
                return;
            }

            await sendFriendRequest(targetUser.userId);
            setInviteQuery('');
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 요청에 실패했어요.');
        }
    };

    const handleAccept = async (friendshipId) => {
        try {
            await friendService.acceptFriendRequest(friendshipId);
            await loadFriendData();
            setFeedbackMessage('친구 요청을 수락했어요.');
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 요청 수락에 실패했어요.');
        }
    };

    const handleReject = async (friendshipId) => {
        try {
            await friendService.rejectFriendRequest(friendshipId);
            await loadFriendData();
            setFeedbackMessage('친구 요청을 거절했어요.');
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 요청 거절에 실패했어요.');
        }
    };

    const handleDelete = async (friendshipId) => {
        try {
            await friendService.deleteFriend(friendshipId, currentUserId);
            setFeedbackMessage('친구 관계 또는 요청을 취소했어요.');
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 삭제 또는 요청 취소에 실패했어요.');
        }
    };

    const handleBlock = async (friendshipId) => {
        try {
            await friendService.blockFriend(friendshipId);
            await loadFriendData();
            setFeedbackMessage('친구를 차단했어요. 차단 이력에서 확인할 수 있어요.');
        } catch (error) {
            console.error(error);
            setFeedbackMessage('친구 차단에 실패했어요.');
        }
    };

    const handleUnblock = async () => {
        setFeedbackMessage(
            '차단 취소 API가 필요해요. 백엔드에 차단 해제 API가 있는지 확인해야 해요.',
        );
    };

    const handleSubmitReport = () => {
        if (!reportReason.trim()) {
            setFeedbackMessage('신고 사유를 입력해 주세요.');
            return;
        }

        setFeedbackMessage('신고 API 연동이 아직 필요해요.');
    };

    return {
        currentUserId,
        userDirectory: {},
        acceptedFriends,
        pendingRequests,
        archivedRelations,
        availableUsers,
        recommendedFriends,
        userReportRows,
        inviteQuery,
        reportTargetId,
        reportReason,
        feedbackMessage,
        isLoading,
        setInviteQuery,
        setReportTargetId,
        setReportReason,
        sendFriendRequest,
        handleInvite,
        handleAccept,
        handleReject,
        handleDelete,
        handleBlock,
        handleUnblock,
        handleSubmitReport,
        clearFeedbackMessage: () => setFeedbackMessage(''),
    };
}