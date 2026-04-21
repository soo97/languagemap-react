import { useMemo, useState } from 'react';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';

const starterSuggestions = [
  '카페에서 주문할 때 쓸 표현 연습하기',
  '지하철에서 길 묻는 대화 연습하기',
  '여행 상황에서 공손하게 말하는 법 물어보기',
];

function buildReply(message) {
  if (message.includes('카페')) {
    return '카페라면 주문, 옵션 변경, 결제까지 이어지는 표현을 함께 연습해볼 수 있어요.';
  }

  if (message.includes('지하철') || message.includes('길')) {
    return '좋아요. 목적지 묻기, 환승 질문, 출구 확인 표현을 차례로 연습해볼게요.';
  }

  if (message.includes('여행')) {
    return '여행 상황에서는 짧고 공손한 질문이 중요해요. 표 구매와 길 안내 표현부터 시작해볼까요?';
  }

  return '좋아요. 지금 입력한 상황에 맞춰 핵심 표현과 더 자연스러운 문장을 함께 정리해드릴게요.';
}

function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      speaker: 'AI 코치',
      text: '연습하고 싶은 상황을 적어주면 지도 학습과 이어지는 대화 흐름으로 도와드릴게요.',
    },
  ]);
  const [input, setInput] = useState('');

  const hasConversation = useMemo(() => messages.length > 1, [messages.length]);

  const sendMessage = (nextMessage) => {
    const trimmed = nextMessage.trim();

    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: 'user', speaker: '나', text: trimmed },
      { role: 'ai', speaker: 'AI 코치', text: buildReply(trimmed) },
    ]);
    setInput('');
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="AI Chat"
        title="장소 학습 다음 단계, AI와 바로 대화해보세요"
        description="지도에서 연습한 상황을 이어서 말해보면 AI가 표현 선택과 자연스러운 문장 흐름을 도와줍니다."
      >
        <div className="mapingo-ai-chat-layout">
          <section className="mapingo-feature-card mapingo-ai-chat-panel">
            <div className="mapingo-ai-chat-log">
              {messages.map((message, index) => (
                <article key={`${message.role}-${index}`} className={`mapingo-chat-bubble is-${message.role}`}>
                  <span>{message.speaker}</span>
                  <p>{message.text}</p>
                </article>
              ))}
            </div>

            <div className="mapingo-ai-chat-composer">
              <input
                className="mapingo-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    sendMessage(input);
                  }
                }}
                placeholder="연습하고 싶은 상황이나 문장을 입력해보세요"
              />
              <button type="button" className="mapingo-submit-button" onClick={() => sendMessage(input)}>
                보내기
              </button>
            </div>
          </section>

          <aside className="mapingo-feature-card mapingo-ai-chat-sidebar">
            <h3>추천 시작 문장</h3>
            <div className="mapingo-ai-chat-suggestions">
              {starterSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="mapingo-chat-choice"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="mapingo-ai-chat-note">
              <strong>이 페이지에서 할 수 있는 것</strong>
              <p>장소 기반 학습을 이어서 대화 연습하고, 더 자연스러운 표현으로 바꾸는 피드백을 받을 수 있어요.</p>
            </div>

            <div className="mapingo-ai-chat-note">
              <strong>현재 상태</strong>
              <p>{hasConversation ? '대화를 시작했어요. 표현을 조금씩 길게 이어가보세요.' : '아직 대화가 시작되지 않았어요. 추천 문장으로 바로 시작할 수 있어요.'}</p>
            </div>
          </aside>
        </div>
      </MapingoPageSection>
    </div>
  );
}

export default AiChatPage;
