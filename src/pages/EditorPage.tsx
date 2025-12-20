import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, LogOut } from 'lucide-react';
import Background from '../components/Background';
import SidebarItem from '../components/SidebarItem';
import ResumePreview from '../components/ResumePreview';
import { RESUME_SECTIONS } from '../constants/resumeSections';
import type { EditorPageProps } from '../types';

export default function EditorPage({ uploadedFile, resumeData, onInputChange }: EditorPageProps) {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden relative">
      <Background />
      
      {/* Top Bar - Glass Effect */}
      <header className="h-16 bg-slate-900/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-20 flex-shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <FileText size={18} />
          </div>
          <span className="font-bold text-lg text-white tracking-tight drop-shadow-sm">Resume.AI</span>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-blue-200 border border-white/10 backdrop-blur-sm">
             {uploadedFile?.name || 'resume.pdf'}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 border border-white/10">
             <Sparkles size={14} className="animate-pulse" /> AI 智能优化
           </button>
           <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm">
             导出 PDF
           </button>
           <div className="w-px h-6 bg-white/10 mx-1"></div>
           <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="h-9 w-9 rounded-full bg-gradient-to-tr from-fuchsia-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white/10 hover:border-white/30 transition-all shadow-lg">
              AL
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* 左侧编辑器 Sidebar - Glass Effect + Rounded Cards */}
        <aside className="w-80 md:w-96 bg-slate-900/40 backdrop-blur-xl border-r border-white/5 flex flex-col z-10 shadow-2xl overflow-y-auto custom-scrollbar">
          <div className="p-6 pb-2">
             <h2 className="text-xs font-bold text-blue-200/50 uppercase tracking-widest mb-4 ml-1">CONTENT EDITOR</h2>
          </div>
          <div className="flex-1 px-4">
            {RESUME_SECTIONS.map(section => (
              <SidebarItem 
                key={section.id} 
                section={section}
                isExpanded={expandedSection === section.id}
                onToggle={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                resumeData={resumeData}
                onInputChange={onInputChange}
              />
            ))}
          </div>
          <div className="p-6 text-center">
            <button className="w-full py-3 border border-dashed border-white/20 rounded-2xl text-slate-400 text-sm hover:bg-white/5 hover:text-white hover:border-white/40 transition-all duration-300">
              + 添加自定义模块
            </button>
          </div>
        </aside>

        {/* 右侧预览区域 */}
        <main className="flex-1 overflow-y-auto p-8 relative flex justify-center items-start scroll-smooth">
          <div className="relative w-full max-w-[800px] mt-4 transform transition-transform duration-500 origin-top scale-[0.85] xl:scale-95 hover:scale-[0.86] xl:hover:scale-[0.96]">
             {/* 预览背后的光效 */}
             <div className="absolute -inset-4 bg-white/5 rounded-2xl blur-xl"></div>
             <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-lg blur-sm"></div>
             <ResumePreview resumeData={resumeData} />
          </div>
        </main>
      </div>

      {/* 用户菜单 - Glass Effect */}
      {isUserMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
          <div className="absolute top-20 right-6 w-56 bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
             <button onClick={() => navigate('/')} className="w-full text-left px-5 py-3 text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 flex items-center gap-3 transition-colors">
               <LogOut size={16} /> 退出编辑
             </button>
          </div>
        </>
      )}
    </div>
  );
}

