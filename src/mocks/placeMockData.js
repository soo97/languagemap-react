export const routeCatalog = [
  {
    id: 'cafe',
    title: '카페 주문 루트',
    lat: 37.5665,
    lng: 126.978,
    category: '일상',
    difficulty: '입문',
    duration: '12분',
    description: '메뉴 묻기, 추가 요청, 결제 표현까지 실전에 자주 쓰는 흐름입니다.',
    scenario: '출근길 카페에서 메뉴를 주문하고 옵션을 변경하는 대화를 연습해요.',
    coachTip: '정중한 주문 표현과 옵션 변경 표현을 함께 익히면 좋아요.',
    feedback: {
      strengths: ['주문 시작 문장이 자연스러웠어요.', '옵션 변경 표현을 맥락에 맞게 사용했어요.'],
      improvements: ['마무리 감사 표현을 한 번 더 붙이면 더 자연스러워요.', '사이즈 확인 문장을 조금 더 짧게 말해보세요.'],
    },
    chatSteps: [
      {
        speaker: 'AI 바리스타',
        prompt: 'Welcome! What can I get for you today?',
        choices: ['Can I get a latte, please?', 'I want coffee.', 'Give me one latte.'],
      },
      {
        speaker: 'AI 바리스타',
        prompt: 'Sure. Would you like it hot or iced?',
        choices: ['Hot, please.', 'Iced, please.', 'Make it hot.'],
      },
      {
        speaker: 'AI 바리스타',
        prompt: 'Anything else before I place the order?',
        choices: ['That’s all, thank you.', 'No, I’m done.', 'Finished.'],
      },
    ],
  },
  {
    id: 'subway',
    title: '지하철 이동 루트',
    lat: 37.5655,
    lng: 126.9766,
    category: '이동',
    difficulty: '보통',
    duration: '15분',
    description: '환승, 출구, 소요 시간을 묻는 표현을 여러 장면에서 연습해요.',
    scenario: '목적지까지 가장 빠르게 가는 노선을 묻고 답하는 흐름으로 구성돼요.',
    coachTip: '노선, 환승, 출구처럼 이동 핵심 단어를 먼저 말하는 연습이 중요해요.',
    feedback: {
      strengths: ['핵심 목적지를 먼저 말해서 의도가 분명했어요.', '소요 시간을 묻는 문장이 잘 맞았어요.'],
      improvements: ['환승 여부를 묻는 표현을 더 짧게 정리해보세요.', '출구 번호를 확인하는 추가 문장을 붙여보세요.'],
    },
    chatSteps: [
      {
        speaker: 'AI 역무원',
        prompt: 'Hi there. Where are you trying to go?',
        choices: ['How can I get to City Hall?', 'I go to City Hall.', 'Where City Hall?'],
      },
      {
        speaker: 'AI 역무원',
        prompt: 'You can take line two. Do you need to transfer?',
        choices: ['Do I need to transfer?', 'Transfer there?', 'Need changing?'],
      },
      {
        speaker: 'AI 역무원',
        prompt: 'It takes around fifteen minutes. Which exit do you need?',
        choices: ['Which exit should I take?', 'What exit?', 'Exit number?'],
      },
    ],
  },
  {
    id: 'travel',
    title: '여행자 루트',
    lat: 37.5702,
    lng: 126.9826,
    category: '여행',
    difficulty: '보통',
    duration: '17분',
    description: '표 구매, 짐 맡기기, 근처 장소 묻기를 붙여서 연습하는 테마예요.',
    scenario: '공항, 호텔, 관광지에서 자주 쓰는 질문과 답변을 이어서 연습합니다.',
    coachTip: '여행 상황에서는 질문을 또렷하게, 답변은 짧고 정확하게 말하는 게 좋아요.',
    feedback: {
      strengths: ['표 구매 요청을 명확하게 말했어요.', '장소 질문에서 필요한 정보가 잘 들어갔어요.'],
      improvements: ['짐 맡기기 표현을 한 번 더 복습하면 좋아요.', '거리나 시간 질문을 추가로 연습해보세요.'],
    },
    chatSteps: [
      {
        speaker: 'AI 안내 직원',
        prompt: 'Hello. How can I help you with your trip today?',
        choices: ['I need a ticket to Busan.', 'Busan ticket, please.', 'Give ticket to Busan.'],
      },
      {
        speaker: 'AI 안내 직원',
        prompt: 'No problem. Do you also need to store your luggage?',
        choices: ['Yes, where can I leave my bag?', 'Bag store where?', 'Can leave luggage?'],
      },
      {
        speaker: 'AI 안내 직원',
        prompt: 'The desk is near gate three. Anything else?',
        choices: ['Is there a cafe nearby?', 'Nearby cafe?', 'Cafe close?'],
      },
    ],
  },
  {
    id: 'convenience',
    title: '편의점 탐험 루트',
    lat: 37.5638,
    lng: 126.9753,
    category: '일상',
    difficulty: '입문',
    duration: '8분',
    description: '원하는 물건 찾기, 계산하기, 추천 묻기 표현을 짧게 연습합니다.',
    scenario: '편의점에서 물건 위치를 묻고 결제하는 짧은 스몰토크를 연습해요.',
    coachTip: '짧은 질문과 응답을 부드럽게 이어가는 연습에 좋아요.',
    feedback: {
      strengths: ['물건 위치를 자연스럽게 질문했어요.', '결제 단계 표현이 안정적이었어요.'],
      improvements: ['추천을 묻는 표현을 한 번 더 다양하게 말해보세요.', '계산 마무리 인사를 더 또렷하게 넣어보세요.'],
    },
    chatSteps: [
      {
        speaker: 'AI 점원',
        prompt: 'Hi. Are you looking for something?',
        choices: ['Yes, where can I find water?', 'Water where?', 'I need water place.'],
      },
      {
        speaker: 'AI 점원',
        prompt: 'It is in aisle two. Do you want any snack recommendations?',
        choices: ['Yes, what do you recommend?', 'Recommend snack?', 'What snack good?'],
      },
      {
        speaker: 'AI 점원',
        prompt: 'This one is popular. Are you ready to pay?',
        choices: ['Yes, I will take this too.', 'Pay now.', 'Ready payment.'],
      },
    ],
  },
];

export const placeTabOptions = [
  { id: 'all', label: '전체' },
  { id: '일상', label: '일상' },
  { id: '이동', label: '이동' },
  { id: '여행', label: '여행' },
];
