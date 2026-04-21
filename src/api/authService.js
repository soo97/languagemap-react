function wait(ms = 250) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function createSessionPayload(overrides = {}) {
  return {
    loginMethod: 'email',
    keepSignedIn: false,
    user: {
      id: 1,
      email: 'learner@mapingo.ai',
      name: 'Mapingo Learner',
      nickname: 'Route Runner',
      role: 'user',
      subscriptionPlan: 'Free',
      subscriptionProductId: 'yearly',
      status: 'ACTIVE',
      provider: 'local',
    },
    ...overrides,
  };
}

async function loginWithEmail({ email, password, rememberMe }) {
  await wait();

  if (!email || !password) {
    const error = new Error('이메일과 비밀번호를 입력해주세요.');
    error.status = 400;
    throw error;
  }

  return createSessionPayload({
    user: {
      ...createSessionPayload().user,
      email,
    },
    keepSignedIn: Boolean(rememberMe),
  });
}

async function signupWithEmail({ email, password, name, nickname }) {
  await wait();

  if (!email || !password || !name) {
    const error = new Error('필수 입력값을 확인해주세요.');
    error.status = 400;
    throw error;
  }

  return createSessionPayload({
    user: {
      ...createSessionPayload().user,
      email,
      name,
      nickname: nickname || name,
    },
  });
}

async function logout() {
  await wait(120);
  return { success: true };
}

export const authService = {
  loginWithEmail,
  signupWithEmail,
  logout,
};
