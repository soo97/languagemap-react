import axiosInstance from "../../axiosInstance";

export const friendService = {
    async sendFriendRequest(data) {
        const res = await axiosInstance.post("/api/friends/requests", data);
        return res.data;
    },

    async sendFriendRequestByEmail(data) {
        const res = await axiosInstance.post("/api/friends/requests/email", data);
        return res.data;
    },

    async blockFriend(friendshipId) {
        const res = await axiosInstance.patch(`/api/friends/${friendshipId}/block`);
        return res.data;
    },

    async rejectFriendRequest(friendshipId) {
        const res = await axiosInstance.patch(
            `/api/friends/requests/${friendshipId}/reject`
        );
        return res.data;
    },

    async acceptFriendRequest(friendshipId) {
        const res = await axiosInstance.patch(
            `/api/friends/requests/${friendshipId}/accept`
        );
        return res.data;
    },

    async getFriends() {
        const res = await axiosInstance.get("/api/friends");
        return res.data;
    },

    async getSentFriendRequests() {
        const res = await axiosInstance.get("/api/friends/requests/sent");
        return res.data;
    },

    async getReceivedFriendRequests() {
        const res = await axiosInstance.get("/api/friends/requests/received");
        return res.data;
    },

    async getRecommendFriends() {
        const res = await axiosInstance.get("/api/friends/recommend");
        return res.data;
    },

    async getFriendHistory() {
        const res = await axiosInstance.get("/api/friends/history");
        return res.data;
    },

    async deleteFriend(friendshipId) {
        const res = await axiosInstance.delete(`/api/friends/${friendshipId}`);
        return res.data;
    },
};