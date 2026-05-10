import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../api/user/paymentService';
import { useMapingoStore } from '../../store/user/useMapingoStore';
import { PLAN_AMOUNT, PLAN_TYPE } from '../../data/payment/paymentData';

export function usePayment() {
    const navigate = useNavigate();
    const setSubscriptionPlan = useMapingoStore((state) => state.setSubscriptionPlan);
    const markSubscriptionUpdated = useMapingoStore((state) => state.markSubscriptionUpdated);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const checkout = async ({ productId, paymentMethod }) => {
        if (!productId || !paymentMethod) {
            setErrorMessage('플랜과 결제 수단을 선택해주세요.');
            return;
        }

        const planType = PLAN_TYPE[productId];
        const amount = PLAN_AMOUNT[productId];

        try {
            setIsSubmitting(true);
            setErrorMessage('');

            // 포트원 결제창 호출 → imp_uid 반환
            const { impUid, merchantUid } = await paymentService.requestPayment({
                planType,
                productId,
                paymentMethod,
                amount,
            });

            // 백엔드 검증 및 구독 저장
            await paymentService.verifyPayment({
                impUid,
                merchantUid,
                planType,
                paymentMethod,
                paymentAmount: amount,
            });

            // 스토어 업데이트
            setSubscriptionPlan('Premium');
            markSubscriptionUpdated();

            navigate('/premium/success');
        } catch (error) {
            setErrorMessage(error.message || '결제에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        checkout,
        isSubmitting,
        errorMessage,
        setErrorMessage,
    };
}