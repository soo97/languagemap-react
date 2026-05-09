import axiosInstance from "../axiosInstance";

export const getLearningProfile = async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
};