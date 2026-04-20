import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMapingoStore } from '../../../store/useMapingoStore';

const planCopy = {
  monthly: {
    label: 'Monthly Plan',
    title: '1개월',
    price: '₩9,900',
    description: '가볍게 시작하는 프리미엄 플랜',
    points: ['AI 회화 코칭 무제한', '발음·자연스러움 평가', '학습 리포트 열람'],
    button: '월간 구독 시작',
    status: '매달 유연하게 이용하는 플랜',
  },
  yearly: {
    label: 'Yearly Plan',
    title: '1년',
    price: '₩99,000',
    description: '가장 경제적인 장기 학습 플랜',
    subcopy: '월 구독 대비 할인',
    points: ['월간 플랜 혜택 전체 포함', '장기 학습 목표·배지 확장', '우선 피드백 기능 제공'],
    button: '연간 구독 시작',
    status: '장기 학습에 맞춘 베스트 플랜',
  },
};

function PremiumPlansPage() {
  const navigate = useNavigate();
  const subscriptionPlan = useMapingoStore((state) => state.subscriptionPlan);
  const subscriptionProductId = useMapingoStore((state) => state.subscriptionProductId);
  const setSubscriptionPlan = useMapingoStore((state) => state.setSubscriptionPlan);
  const setSubscriptionProductId = useMapingoStore((state) => state.setSubscriptionProductId);
  const markSubscriptionUpdated = useMapingoStore((state) => state.markSubscriptionUpdated);
  const isPremium = subscriptionPlan === 'Premium';
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timerId = window.setTimeout(() => setToastMessage(''), 2200);
    return () => window.clearTimeout(timerId);
  }, [toastMessage]);

  const handleSelectPlan = (planId) => {
    setSubscriptionProductId(planId);
    setSubscriptionPlan('Premium');
    markSubscriptionUpdated();
    setToastMessage(planId === 'monthly' ? '월간 프리미엄 플랜이 적용되었어요.' : '연간 프리미엄 플랜이 적용되었어요.');
  };

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-premium-hero">
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/premium')}>
            프리미엄 메인으로
          </button>
        </div>
        <p className="mapingo-premium-eyebrow">프리미엄</p>
        <h1>구독 플랜 선택</h1>
        <p className="mapingo-premium-hero-copy">월간 · 연간 플랜을 비교해 보고 바로 구독할 수 있어요.</p>
        {toastMessage ? (
          <div className="mapingo-premium-toast" role="status" aria-live="polite">
            <strong>구독 완료</strong>
            <span>{toastMessage}</span>
          </div>
        ) : null}
      </section>

      <section className="mapingo-premium-layout">
        {Object.entries(planCopy).map(([planId, plan]) => (
          <article
            key={planId}
            className={`mapingo-premium-plan-card ${planId === 'yearly' ? 'is-highlighted' : ''} ${subscriptionProductId === planId ? 'is-selected' : ''}`}
          >
            {planId === 'yearly' ? <span className="mapingo-premium-best-value">Best Value</span> : null}
            <p className="mapingo-premium-plan-label">{plan.label}</p>
            <h2>{plan.title}</h2>
            <p className="mapingo-premium-plan-description">{plan.description}</p>
            <p className="mapingo-premium-plan-price">{plan.price}</p>
            {plan.subcopy ? <p className="mapingo-premium-plan-subcopy">{plan.subcopy}</p> : null}
            <ul className="mapingo-premium-plan-points">
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button type="button" className={`mapingo-premium-plan-button ${planId === 'monthly' ? 'is-monthly' : 'is-yearly'} ${subscriptionProductId === planId ? 'is-selected' : ''}`} onClick={() => handleSelectPlan(planId)}>
              {subscriptionProductId === planId ? '선택한 플랜' : isPremium ? '현재 프리미엄 이용 중' : plan.button}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PremiumPlansPage;
