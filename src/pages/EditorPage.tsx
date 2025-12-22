import { useState } from 'react';
import Background from '../components/Background';
import TopBar from '../components/TopBar';
import SidebarItem from '../components/SidebarItem';
import ResumePreview from '../components/ResumePreview';
import { RESUME_SECTIONS } from '../components/resumeSections';
import type { EditorPageProps } from '../types';

export default function EditorPage({ uploadedFile, resumeData, onInputChange }: EditorPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden relative">
      <Background />
      <TopBar fileName={uploadedFile?.name || 'resume.pdf'} />

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* 左侧编辑器 Sidebar - Glass Effect + Rounded Cards */}
        <aside className="w-96 md:w-[28rem] bg-slate-900/40 backdrop-blur-xl border-r border-white/5 flex flex-col z-10 shadow-2xl overflow-y-auto custom-scrollbar">
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
    </div>
  );
}

