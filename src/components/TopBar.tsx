import { useState } from 'react';
import { FileText, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth';

interface TopBarProps {
  fileName?: string;
  showExportPDF?: boolean;
}

export default function TopBar({ 
  fileName, 
  showExportPDF = true
}: TopBarProps) {
  const { userInfo } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    alert('你已退出');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Glass Effect */}
      <header className="h-16 bg-slate-900/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-20 flex-shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <FileText size={18} />
          </div>
          <span className="font-bold text-lg text-white tracking-tight drop-shadow-sm">VitaminCV.AI</span>
          {fileName && (
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-blue-200 border border-white/10 backdrop-blur-sm">
              {fileName}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {showExportPDF && (
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm">
              导出 PDF
            </button>
          )}
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
            className="h-9 w-9 rounded-full bg-gradient-to-tr from-fuchsia-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white/10 hover:border-white/30 transition-all shadow-lg overflow-hidden"
          >
            {userInfo?.avatarUrl ? (
              <img 
                src={userInfo.avatarUrl} 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              'AL'
            )}
          </button>
        </div>
      </header>

      {/* 用户菜单 - Glass Effect */}
      {isUserMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
          <div className="absolute top-20 right-6 w-56 bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={handleLogout} 
              className="w-full text-left px-5 py-3 text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 flex items-center gap-3 transition-colors"
            >
              <LogOut size={16} /> 退出编辑
            </button>
          </div>
        </>
      )}
    </>
  );
}

