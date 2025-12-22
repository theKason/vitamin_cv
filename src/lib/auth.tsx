import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';
import { supabase } from './supabase';
import type { UserInfo } from '../types';
import type { User } from '@supabase/supabase-js';

// Auth context
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  userInfo: null,
  setUserInfo: () => {},
});

export const useAuth = () => useContext(AuthContext);

const USER_INFO_STORAGE_KEY = 'userInfo';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 从 localStorage 初始化 userInfo
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() => {
    try {
      const stored = localStorage.getItem(USER_INFO_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(null);

  // 包装 setUserInfo，同时保存到 localStorage
  const setUserInfo = useCallback((info: UserInfo | null) => {
    setUserInfoState(info);
    if (info) {
      localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(info));
    } else {
      localStorage.removeItem(USER_INFO_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    // 初始化时获取当前 session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user?.identities?.[0]?.identity_data) {
        const identityData = session.user.identities[0].identity_data;
        setUserInfo({
          avatarUrl: identityData.avatar_url,
          email: identityData.email,
          name: identityData.full_name || identityData.name,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      // 更新用户信息
      if (session?.user?.identities?.[0]?.identity_data) {
        const identityData = session.user.identities[0].identity_data;
        setUserInfo({
          avatarUrl: identityData.avatar_url,
          email: identityData.email,
          name: identityData.full_name || identityData.name,
        });
      } else if (event === 'SIGNED_OUT' || !session) {
        // 只在明确登出时才清空 userInfo
        setUserInfo(null);
      }
      // 其他情况（如 TOKEN_REFRESHED）保留现有的 userInfo
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUserInfo]);

  return <AuthContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>{children}</AuthContext.Provider>;
};

