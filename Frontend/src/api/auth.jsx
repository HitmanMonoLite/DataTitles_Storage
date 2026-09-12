import api from "./axios";

export async function login(username, password) {
  const { data }= await api.post(
    "/users/login-cookie/",
    {},
    {
      auth: { username, password },
    }
  );
  return data;
}

export async function getMe() {
  try {

    const { data } = await api.get("/users/validate-session-id/");
    console.log(data)
    return data;

  } catch (err) {

    if (err.response?.status === 401) return null;
    throw err;

  }
}

export async function logout() {
  const response = await api.post("/users/logout-cookie/");
  return response.data;
}

export async function recallSession(sessionId) {
  const { data } = await api.post("/users/recall-session-user/",
    null,
    {
      params: { session_id: Number(sessionId) }
    }
  );
  return data;
}

// Added
export async function getUserSessions() {
  try {
    const { data } = await api.get("/users/info-sessions-user/");
    return data;
  } catch (err) {
    console.error("Ошибка получения сессий:", err);
    throw err;
  }
}