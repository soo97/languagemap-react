import axiosInstance from "../axiosInstance";

export const getUserBadges = async () => {
    const response = await axiosInstance.get("/badges");
    return response.data;
};