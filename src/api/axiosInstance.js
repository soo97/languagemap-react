import axios from 'axios';

const API_BASE_URL = '';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    header: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 (토큰 자동 첨부)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 (공통 에러 처리)
axiosInstance.interceptors.response.use(
    (response) => response.data,  // data만 바로 반환
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            // 토큰 만료 → 로그아웃 처리
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }

        if (status === 403) {
            alert('접근 권한이 없습니다.');
        }

        if (status === 500) {
            alert('서버 오류가 발생했습니다.');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;