import axiosInstance from '../axiosInstance';

export const friendService = {
    async sendFriendRequest(data) {
        const res = await axiosInstance.post('/api/friends/requests', data);
        return res.data;
    },

    async sendFriendRequestByEmail(data) {
        const res = await axiosInstance.post('/api/friends/requests/email', data);
        return res.data;
    },

    async blockFriend(friendshipId) {
        const res = await axiosInstance.patch(`/api/friends/${friendshipId}/block`);
        return res.data;
    },

    async rejectFriendRequest(friendshipId) {
        const res = await axiosInstance.patch(
            `/api/friends/requests/${friendshipId}/reject`,
        );
        return res.data;
    },

    async acceptFriendRequest(friendshipId) {
        const res = await axiosInstance.patch(
            `/api/friends/requests/${friendshipId}/accept`,
        );
        return res.data;
    },

    async getFriends(userId) {
        const res = await axiosInstance.get('/api/friends', {
            params: { userId },
        });
        return res.data;
    },

    async getSentFriendRequests(userId) {
        const res = await axiosInstance.get('/api/friends/requests/sent', {
            params: { userId },
        });
        return res.data;
    },

    async getReceivedFriendRequests(userId) {
        const res = await axiosInstance.get('/api/friends/requests/received', {
            params: { userId },
        });
        return res.data;
    },

    async getRecommendFriends(userId) {
        const res = await axiosInstance.get('/api/friends/recommend', {
            params: { userId },
        });
        return res.data;
    },

    async getFriendHistory(userId) {
        const res = await axiosInstance.get('/api/friends/history', {
            params: { userId },
        });
        return res.data;
    },

    async deleteFriend(friendshipId, loginUserId) {
        const res = await axiosInstance.delete(
            `/api/friends/${friendshipId}`,
            {
                params: { loginUserId },
            },
        );

        return res.data;
    }
};