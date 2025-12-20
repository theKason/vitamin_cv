import { ChevronDown, ChevronRight } from 'lucide-react';
import type { SidebarItemProps } from '../types';

export default function SidebarItem({ section, isExpanded, onToggle, resumeData, onInputChange }: SidebarItemProps) {
  return (
    <div className="mb-3 px-2">
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between p-4 text-sm font-medium transition-all duration-300 rounded-2xl border
          ${isExpanded 
            ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-200 border-blue-500/30 shadow-lg shadow-blue-900/10 backdrop-blur-md' 
            : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10 hover:text-slate-200 hover:scale-[1.02]'}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg ${isExpanded ? 'bg-blue-500/20 text-blue-300' : 'bg-transparent'}`}>
            <section.icon size={18} />
          </div>
          {section.label}
        </div>
        {isExpanded ? <ChevronDown size={16} className="text-blue-400" /> : <ChevronRight size={16} className="opacity-50" />}
      </button>

      {isExpanded && (
        <div className="mt-2 mx-1 p-5 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 space-y-5 animate-in slide-in-from-top-2 fade-in duration-300">
          {section.id === 'basic' && (
            <>
              <div className="space-y-1.5 group">
                <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors">姓名</label>
                <input value={resumeData.name} onChange={(e) => onInputChange('name', e.target.value)} className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-2.5 text-sm text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
              <div className="space-y-1.5 group">
                <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors">职位</label>
                <input value={resumeData.title} onChange={(e) => onInputChange('title', e.target.value)} className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-2.5 text-sm text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
              <div className="space-y-1.5 group">
                <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors">邮箱</label>
                <input value={resumeData.email} onChange={(e) => onInputChange('email', e.target.value)} className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-2.5 text-sm text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
              <div className="space-y-1.5 group">
                <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors">电话</label>
                <input value={resumeData.phone} onChange={(e) => onInputChange('phone', e.target.value)} className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-2.5 text-sm text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
              </div>
            </>
          )}
          {section.id === 'summary' && (
            <div className="space-y-1.5 group">
              <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors">个人简介</label>
              <textarea rows={6} value={resumeData.summary} onChange={(e) => onInputChange('summary', e.target.value)} className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-3 text-sm text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all leading-relaxed" />
            </div>
          )}
          {section.id !== 'basic' && section.id !== 'summary' && (
             <div className="text-center py-6 text-xs text-slate-500 bg-white/5 rounded-xl border border-dashed border-white/10">
               更多 {section.label} 字段配置...
             </div>
          )}
        </div>
      )}
    </div>
  );
}

