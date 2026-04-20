import { useNavigate } from 'react-router-dom';
import DemoFlowCompact from '../components/DemoFlowCompact';

const supportCards = [
  {
    id: 'notices',
    title: '공지사항',
    description: '서비스 변경과 주요 업데이트 내용을 먼저 확인해요.',
    path: '/support/notices',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: '자주 묻는 질문을 빠르게 찾아볼 수 있어요.',
    path: '/support/faq',
  },
  {
    id: 'inquiry',
    title: '문의하기',
    description: '게시판 형태로 문의를 남기고 상태를 확인해요.',
    path: '/support/inquiry',
  },
];

function SupportPage() {
  const navigate = useNavigate();

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <p className="mapingo-eyebrow">고객지원</p>
        <h1>공지 · FAQ · 문의</h1>
        <p className="mapingo-domain-entry-copy">필요한 지원 항목을 먼저 고른 뒤 상세 페이지로 들어갈 수 있어요.</p>
        <div className="mapingo-domain-entry-grid">
          {supportCards.map((card) => (
            <button key={card.id} type="button" className="mapingo-domain-entry-card" onClick={() => navigate(card.path)}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </section>

      <DemoFlowCompact activePath="/support" />
    </div>
  );
}

export default SupportPage;
