import { useMemo, useState } from 'react';
import {
    CURRENT_USER_ID,
    TODAY,
    initialFriendshipRows,
    initialUserReportRows,
    recommendedFriendSeeds,
    userDirectory,
} from '../../mocks/user/friendMockData';

export function useCommunityFriends() {
    const currentUserId = CURRENT_USER_ID;

    const [friendshipRows, setFriendshipRows] = useState(initialFriendshipRows);
    const [userReportRows, setUserReportRows] = useState(initialUserReportRows);
    const [inviteQuery, setInviteQuery] = useState('');
    const [reportTargetId, setReportTargetId] = useState('2');
    const [reportReason, setReportReason] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const isMyRelation = (row) =>
        row.requester_id === currentUserId || row.addressee_id === currentUserId;

    const acceptedFriends = useMemo(
        () =>
            friendshipRows.filter(
                (row) => row.status === 'ACCEPTED' && isMyRelation(row),
            ),
        [friendshipRows],
    );

    const pendingRequests = useMemo(
        () =>
            friendshipRows.filter(
                (row) => row.status === 'PENDING' && isMyRelation(row),
            ),
        [friendshipRows],
    );

    const archivedRelations = useMemo(
        () =>
            friendshipRows.filter(
                (row) =>
                    ['REJECTED', 'BLOCKED'].includes(row.status) && isMyRelation(row),
            ),
        [friendshipRows],
    );

    const availableUsers = useMemo(
        () =>
            Object.values(userDirectory).filter(
                (user) => user.userId !== currentUserId,
            ),
        [currentUserId],
    );

    const hasExistingRelation = (targetUserId) =>
        friendshipRows.some(
            (row) =>
                (row.requester_id === currentUserId &&
                    row.addressee_id === targetUserId) ||
                (row.requester_id === targetUserId &&
                    row.addressee_id === currentUserId),
        );

    const recommendedFriends = useMemo(
        () =>
            recommendedFriendSeeds.filter(
                (item) =>
                    !hasExistingRelation(item.userId) && userDirectory[item.userId],
            ),
        [friendshipRows],
    );

    const sendFriendRequest = (targetUserId) => {
        const targetUser = userDirectory[targetUserId];

        if (!targetUser) {
            setFeedbackMessage('요청할 사용자를 찾지 못했어요.');
            return;
        }

        if (hasExistingRelation(targetUserId)) {
            setFeedbackMessage('이미 친구 요청을 보냈거나 연결된 사용자예요.');
            return;
        }

        setFriendshipRows((current) => [
            {
                friendship_id: current.length + 1,
                requester_id: currentUserId,
                addressee_id: targetUserId,
                status: 'PENDING',
                requested_at: `${TODAY} 09:00:00`,
                responded_at: null,
            },
            ...current,
        ]);

        setFeedbackMessage(`${targetUser.name}님에게 친구 요청을 보냈어요.`);
    };

    const handleInvite = () => {
        const normalizedQuery = inviteQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            setFeedbackMessage('닉네임이나 이메일을 입력해 주세요.');
            return;
        }

        const targetUser = availableUsers.find(
            (user) =>
                user.name.toLowerCase().includes(normalizedQuery) ||
                user.email.toLowerCase().includes(normalizedQuery),
        );

        if (!targetUser) {
            setFeedbackMessage('일치하는 사용자를 찾지 못했어요.');
            return;
        }

        sendFriendRequest(targetUser.userId);
        setInviteQuery('');
    };

    const handleAccept = (friendshipId) => {
        setFriendshipRows((current) =>
            current.map((row) =>
                row.friendship_id === friendshipId
                    ? {
                        ...row,
                        status: 'ACCEPTED',
                        responded_at: `${TODAY} 11:00:00`,
                    }
                    : row,
            ),
        );

        setFeedbackMessage('친구 요청을 수락했어요.');
    };

    const handleReject = (friendshipId) => {
        setFriendshipRows((current) =>
            current.map((row) =>
                row.friendship_id === friendshipId
                    ? {
                        ...row,
                        status: 'REJECTED',
                        responded_at: `${TODAY} 11:00:00`,
                    }
                    : row,
            ),
        );

        setFeedbackMessage('친구 요청을 거절했어요.');
    };

    const handleDelete = (friendshipId) => {
        setFriendshipRows((current) =>
            current.filter((row) => row.friendship_id !== friendshipId),
        );

        setFeedbackMessage('친구 관계 또는 요청을 취소했어요.');
    };

    const handleBlock = (friendshipId) => {
        setFriendshipRows((current) =>
            current.map((row) =>
                row.friendship_id === friendshipId
                    ? {
                        ...row,
                        status: 'BLOCKED',
                        responded_at: `${TODAY} 11:00:00`,
                    }
                    : row,
            ),
        );

        setFeedbackMessage('친구를 차단했어요. 차단 이력에서 확인할 수 있어요.');
    };

    const handleUnblock = (friendshipId) => {
        setFriendshipRows((current) =>
            current.map((row) =>
                row.friendship_id === friendshipId
                    ? {
                        ...row,
                        status: 'ACCEPTED',
                        responded_at: `${TODAY} 11:30:00`,
                    }
                    : row,
            ),
        );

        setFeedbackMessage('차단을 취소했어요. 다시 친구 목록에서 확인할 수 있어요.');
    };

    const handleSubmitReport = () => {
        if (!reportReason.trim()) {
            setFeedbackMessage('신고 사유를 입력해 주세요.');
            return;
        }

        setUserReportRows((current) => [
            {
                report_id: current.length + 1,
                reporter_id: currentUserId,
                reported_user_id: Number(reportTargetId),
                reason: reportReason.trim(),
                status: 'PENDING',
                created_at: `${TODAY} 14:00:00`,
                processed_at: null,
                admin_memo: null,
            },
            ...current,
        ]);

        setReportReason('');
        setFeedbackMessage('신고가 접수되었어요.');
    };

    return {
        currentUserId,
        userDirectory,
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
    };
}