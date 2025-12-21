import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import UploadPage from './pages/UploadPage';
import EditorPage from './pages/EditorPage';
import SignIn from './components/SignIn';
import { supabase } from './lib/supabase';
import type { ResumeData, UserInfo } from './types';
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

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Check Supabase user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      // 初始化用户信息
      if (data?.user?.identities?.[0]?.identity_data) {
        const identityData = data.user.identities[0].identity_data;
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
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user || null);
      
      // 更新用户信息
      if (session?.user?.identities?.[0]?.identity_data) {
        const identityData = session.user.identities[0].identity_data;
        setUserInfo({
          avatarUrl: identityData.avatar_url,
          email: identityData.email,
          name: identityData.full_name || identityData.name,
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>{children}</AuthContext.Provider>;
};

const ProtectedRoutes = () => {
  const { user, userInfo, setUserInfo } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: 'Alex Chen',
    title: 'Senior Product Designer',
    email: 'alex@example.com',
    phone: '+86 138 0000 0000',
    location: 'Shanghai, China',
    website: 'www.alexchen.design',
    summary: '拥有5年经验的高级产品设计师，专注于用户体验和界面设计。善于将复杂需求转化为简洁优雅的设计解决方案。曾主导多个百万级用户产品的设计重构。',
    experience: [
      { id: 1, role: 'Senior Product Designer', company: 'Tech Corp', time: '2021 - Present', desc: '负责核心产品的用户体验设计，领导设计系统的搭建与维护。' },
      { id: 2, role: 'UI Designer', company: 'Creative Studio', time: '2019 - 2021', desc: '参与多个初创公司的品牌与界面设计项目。' }
    ],
    skills: ['Figma', 'React', 'TypeScript', 'Node.js', 'UI/UX Design']
  });

  const handleInputChange = (field: keyof ResumeData, value: string | ResumeData['experience'] | string[]) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
  };



  if (!user) {
    return <SignIn setUserInfo={setUserInfo} />;
  }

  return (
    <Routes>
      <Route path="/" element={<UploadPage onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />} />
      <Route 
        path="/editor" 
        element={
          <EditorPage 
            uploadedFile={uploadedFile}
            resumeData={resumeData}
            onInputChange={handleInputChange}
            userInfo={userInfo}
          />
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
