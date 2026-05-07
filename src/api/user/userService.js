import axiosInstance from '../axiosInstance';

// 내 정보 조회
async function getMe() {
    const response = await axiosInstance.get('/api/users/me');
    return response.data;
}

// 소셜 회원가입 유저 프로필 정보 입력
async function setupProfile({ birthDate, address, phoneNumber }) {
    const response = await axiosInstance.patch('/api/users/profile', {
        birthDate,
        address,
        phoneNumber,
    });
    return response.data;
}

export const userService = {
    getMe,
    setupProfile
};