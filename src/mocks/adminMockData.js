export const adminMemberList = [
  {
    id: 1,
    name: '김민지',
    email: 'minji@mapingo.ai',
    status: '활성',
    plan: 'Free',
    level: 'Lv.20',
    role: '일반 회원',
    goal: '주 3회 말하기 연습',
    lastActive: '오늘 오전 10:20',
    joinedAt: '2026-03-12',
    studyCount: 18,
    streakDays: 7,
    reviewReason: '특이사항 없음',
    memo: '카페 주문 루트 학습 비중이 높습니다.',
  },
  {
    id: 2,
    name: '박준호',
    email: 'joon@mapingo.ai',
    status: '활성',
    plan: 'Premium',
    level: 'Lv.40',
    role: '프리미엄 회원',
    goal: '주 5회 루트 완료',
    lastActive: '어제 오후 8:10',
    joinedAt: '2026-02-28',
    studyCount: 34,
    streakDays: 14,
    reviewReason: '프리미엄 기능 사용률 높음',
    memo: 'AI 코칭 기능을 자주 사용합니다.',
  },
  {
    id: 3,
    name: '이소라',
    email: 'sora@mapingo.ai',
    status: '검토 필요',
    plan: 'Free',
    level: 'Lv.10',
    role: '일반 회원',
    goal: '주 3회 말하기 연습',
    lastActive: '3일 전',
    joinedAt: '2026-04-01',
    studyCount: 5,
    streakDays: 1,
    reviewReason: '최근 학습 감소로 확인 필요',
    memo: '학습 알림 설정 안내가 필요해 보입니다.',
  },
];

export const adminNoticeList = [
  {
    id: 1,
    title: '4월 서비스 업데이트 안내',
    category: '업데이트',
    status: '게시 중',
    date: '2026-04-20',
    body: '지도 학습 카드와 프로필 화면 구성을 개선했습니다.',
    isPinned: true,
    author: '운영팀',
    publishAt: '2026-04-20 09:00',
  },
  {
    id: 2,
    title: '프리미엄 기능 점검 일정',
    category: '점검',
    status: '예약',
    date: '2026-04-23',
    body: 'AI 코칭 기능 점검이 예정되어 있습니다.',
    isPinned: false,
    author: '서비스관리자',
    publishAt: '2026-04-23 18:00',
  },
];

export const adminRegionOptions = [
  {
    id: 101,
    name: '서울',
    center: { lat: 37.5665, lng: 126.978 },
    querySuffix: 'Seoul',
  },
  {
    id: 102,
    name: '부산',
    center: { lat: 35.1796, lng: 129.0756 },
    querySuffix: 'Busan',
  },
  {
    id: 103,
    name: '도쿄',
    center: { lat: 35.6762, lng: 139.6503 },
    querySuffix: 'Tokyo',
  },
  {
    id: 104,
    name: '시드니',
    center: { lat: -33.8688, lng: 151.2093 },
    querySuffix: 'Sydney',
  },
];

export const adminScenarioSeeds = [
  {
    id: 201,
    prompt: '카페에서 원하는 음료를 주문하고 옵션을 자연스럽게 확인하는 연습',
    scenarioDescription: '음료 주문, 사이즈 선택, 우유 변경, 테이크아웃 여부까지 묻는 상황',
    level: '입문',
    category: '주문',
    completeExp: 120,
    status: '운영 중',
    updatedAt: '2026-04-20',
  },
  {
    id: 202,
    prompt: '공항 입국 심사에서 질문에 짧고 정확하게 답하는 연습',
    scenarioDescription: '여행 목적, 숙소, 체류 기간을 답하는 입국 심사 상황',
    level: '중급',
    category: '여행',
    completeExp: 220,
    status: '검수 중',
    updatedAt: '2026-04-18',
  },
  {
    id: 203,
    prompt: '호텔 체크인 과정에서 예약 정보를 확인하고 요청사항을 전달하는 연습',
    scenarioDescription: '예약 확인, 조식 여부, 늦은 체크아웃 요청이 포함된 체크인 상황',
    level: '중급',
    category: '체크인',
    completeExp: 180,
    status: '초안',
    updatedAt: '2026-04-17',
  },
];

export const adminMissionSeeds = [
  {
    id: 301,
    missionTitle: '주문 옵션까지 끝내기',
    missionDescription: '메뉴 선택 후 사이즈와 우유 옵션까지 직접 말해보는 미션',
    scenarioId: 201,
    scenarioTitle: '카페 주문 시나리오',
    updatedAt: '2026-04-20',
  },
  {
    id: 302,
    missionTitle: '입국 질문 3개 답하기',
    missionDescription: '여행 목적, 숙소, 체류 기간 질문에 자연스럽게 답하는 미션',
    scenarioId: 202,
    scenarioTitle: '공항 입국 심사 시나리오',
    updatedAt: '2026-04-18',
  },
];

export const adminPlaceSeeds = [
  {
    id: 401,
    googlePlaceId: 'seed-gangnam-cafe',
    placeName: 'Mapingo Gangnam Cafe',
    placeAddress: '서울 강남구 테헤란로 100',
    latitude: 37.4981,
    longitude: 127.0276,
    placeDescription: '강남역 인근에서 음료 주문과 옵션 확인을 연습하기 좋은 카페',
    scenarioId: 201,
    regionId: 101,
    scenarioTitle: '카페 주문 시나리오',
    regionName: '서울',
    updatedAt: '2026-04-20',
  },
];

export const adminPlaceSearchTypeOptions = [
  { id: 'cafe', label: '카페', query: 'cafe', googleType: 'cafe' },
  { id: 'restaurant', label: '식당', query: 'restaurant', googleType: 'restaurant' },
  { id: 'hotel', label: '호텔', query: 'hotel', googleType: 'hotel' },
  { id: 'airport', label: '공항', query: 'airport', googleType: 'airport' },
  { id: 'pharmacy', label: '약국', query: 'pharmacy', googleType: 'pharmacy' },
];

export const adminScenarioLevelOptions = ['입문', '중급', '고급'];

export const adminScenarioCategoryOptions = ['주문', '길찾기', '체크인', '여행', '응급', '대중교통'];

export const adminContentList = [
  ...adminPlaceSeeds.map((place) => ({
    id: place.id,
    type: '장소',
    title: place.placeName,
    status: '운영 중',
    difficulty: '-',
    description: place.placeDescription,
    tags: `${place.regionName}, ${place.scenarioTitle}`,
    updatedAt: place.updatedAt,
  })),
  ...adminScenarioSeeds.map((scenario) => ({
    id: scenario.id,
    type: '시나리오',
    title: scenario.scenarioDescription,
    status: scenario.status,
    difficulty: scenario.level,
    description: scenario.prompt,
    tags: `${scenario.category}, ${scenario.completeExp} EXP`,
    updatedAt: scenario.updatedAt,
  })),
  ...adminMissionSeeds.map((mission) => ({
    id: mission.id,
    type: '미션',
    title: mission.missionTitle,
    status: '운영 중',
    difficulty: '-',
    description: mission.missionDescription,
    tags: mission.scenarioTitle,
    updatedAt: mission.updatedAt,
  })),
];
