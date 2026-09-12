import { createContext, useState, useEffect } from 'react';
import { login as loginApi, getMe, logout as logoutApi, getUserSessions, recallSession } from '@/api/auth';
import { useNotification } from "@/components/providers/NotificationProvider";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(true);

  const { notify } = useNotification();

  const loadSessionsIfAuthenticated = async (currentUser) => {
    if (!currentUser) return;
    try {
      const sessionData = await getUserSessions();
      setSessions(sessionData);
    } catch (sessionErr) {
      console.warn("Не удалось загрузить сессии:", sessionErr);
      setSessions(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        await loadSessionsIfAuthenticated(userData);
      } catch (err) {
        console.error("Unexpected error while fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logoutSession = async (sessionId) => {
    try {
      await recallSession(sessionId);

      notify('success', 'Сессия завершена', `Сессия #${sessionId} успешно отозвана`);
      
      setSessions(prev => {
        if (!prev?.all_sessions_user) return prev;
        const updated = { ...prev };
        delete updated.all_sessions_user[sessionId];
        return updated;
      });

    } catch (err) {
      const errorMsg = err.response?.data?.detail 
        ? (typeof err.response.data.detail === 'string' 
            ? err.response.data.detail 
            : JSON.stringify(err.response.data.detail))
        : err.message || 'Не удалось отозвать сессию';
      notify('error', 'Ошибка отзыва сессии', errorMsg);
    }
  };
    
  const login = async (username, password) => {

    try {
        setLoading(true);
        const data = await loginApi(username, password);
        setUser(data);
        await loadSessionsIfAuthenticated(data);

        return data;
    } catch (err) {
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const logout = async () => {
    
    let data;

    try {
        setLoading(true);
        data = await logoutApi();
    } catch (err) {
        console.error("Logout error:", err);
    } finally {
        setUser(null);
        setLoading(false);
    }

    return data;

  };
  return (
    <AuthContext.Provider
      value={{
        user,

        // Added
        sessions,

        isAuthenticated: !!user,
        login,
        logout,
        logoutSession,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}