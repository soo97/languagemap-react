import axiosInstance from "../../axiosInstance";

export const adminRankingService = {
  async getRankings() {
    const res = await axiosInstance.get('/api/admin/rankings');
    return res.data;
  },

  async getWeeklyRankings() {
    const res = await axiosInstance.get('/api/admin/rankings/weekly');
    return res.data;
  },

  async getTotalUserCount() {
    const res = await axiosInstance.get('/api/admin/rankings/users/count');
    return res.data;
  },
};