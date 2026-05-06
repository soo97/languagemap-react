async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const payload = await parseJsonSafe(response);

  if (!response.ok) {
    const error = new Error(payload?.message ?? 'AI Coaching 요청에 실패했습니다.');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload?.data ?? payload;
}

function startCoachingFlow({ sessionId, optionType }) {
  return request('/api/coaching/flow/start', {
    method: 'POST',
    body: JSON.stringify({ sessionId, optionType }),
  });
}

function prepareCoachingScript({
  sessionId,
  optionType,
  placeName,
  country,
  city,
  placeAddress,
  evaluation,
  previousMessages,
}) {
  return request('/api/coaching/conversation/script', {
    method: 'POST',
    body: JSON.stringify({
      sessionId,
      optionType,
      placeName,
      country,
      city,
      placeAddress,
      evaluation,
      previousMessages,
    }),
  });
}

function startConversation(coachingSessionId) {
  return request(`/api/coaching/conversation/${coachingSessionId}/start`, {
    method: 'POST',
  });
}

async function processUserSpeech(coachingSessionId, audioFile) {
  const formData = new FormData();
  formData.append('audioFile', audioFile, audioFile.name ?? 'speech.webm');

  const response = await fetch(`/api/coaching/conversation/${coachingSessionId}/speech`, {
    method: 'POST',
    body: formData,
  });

  const payload = await parseJsonSafe(response);

  if (!response.ok) {
    const error = new Error(payload?.message ?? '사용자 음성 처리에 실패했습니다.');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload?.data ?? payload;
}

function finishConversation(coachingSessionId) {
  return request(`/api/coaching/conversation/${coachingSessionId}/finish`, {
    method: 'POST',
  });
}

export const coachingService = {
  startCoachingFlow,
  prepareCoachingScript,
  startConversation,
  processUserSpeech,
  finishConversation,
};
