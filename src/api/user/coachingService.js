import axiosInstance from '../axiosInstance';

export async function getCoachingEntry(sessionId) {
  const response = await axiosInstance.get(`/api/coaching/entry/${sessionId}`);
  return response.data;
}

export async function startCoachingFlow({ sessionId, optionType }) {
  const response = await axiosInstance.post('/api/coaching/flow/start', {
    sessionId,
    optionType,
  });
  return response.data;
}

export async function prepareCoachingScript({
  sessionId,
  optionType,
  placeName,
  country,
  city,
  placeAddress,
  evaluation,
  previousMessages,
}) {
  const response = await axiosInstance.post('/api/coaching/conversation/script', {
    sessionId,
    optionType,
    placeName,
    country,
    city,
    placeAddress,
    evaluation,
    previousMessages,
  });

  return response.data;
}

export async function startConversation(coachingSessionId) {
  const response = await axiosInstance.post(
    `/api/coaching/conversation/${coachingSessionId}/start`
  );

  return response.data;
}

export async function processUserSpeech(coachingSessionId, audioFile) {
  const formData = new FormData();
  formData.append('audioFile', audioFile, audioFile.name ?? 'speech.webm');

  const response = await axiosInstance.post(
    `/api/coaching/conversation/${coachingSessionId}/speech`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}

export async function finishConversation(coachingSessionId) {
  const response = await axiosInstance.post(
    `/api/coaching/conversation/${coachingSessionId}/finish`
  );

  return response.data;
}

export async function getCoachingMessages(coachingSessionId) {
  const response = await axiosInstance.get(
    `/api/coaching/messages/${coachingSessionId}`
  );

  return response.data;
}

export const coachingService = {
  getCoachingEntry,
  startCoachingFlow,
  prepareCoachingScript,
  startConversation,
  processUserSpeech,
  finishConversation,
  getCoachingMessages,
};