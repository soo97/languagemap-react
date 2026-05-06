import axiosInstance from "../axiosInstance";

export const adminSocialService = {

    async getReports() {
        const res = await axiosInstance.get('/api/admin/social/reports');
        return res.data.data;
    },

    async getReportDetail(reportId) {
        const res = await axiosInstance.get(`/api/admin/social/reports/${reportId}`);
        return res.data.data;
    },

    async updateReportStatus(reportId, status) {
        const res = await axiosInstance.patch(
            `/api/admin/social/reports/${reportId}/status`,
            { status }
        );

        return res.data.data;
    },

    async getBlockedFriendships() {
        const res = await axiosInstance.get('/api/admin/social/friendships/blocked');
        return res.data.data;
    },

    async getRejectFriendships() {
        const res = await axiosInstance.get('/api/admin/social/friendships/rejected');
        return res.data.data;
    },
}