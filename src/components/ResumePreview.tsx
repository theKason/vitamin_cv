import { Mail, Phone, MapPin, Globe, User, Briefcase, Award } from 'lucide-react';
import type { ResumePreviewProps } from '../types';

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="bg-white text-gray-800 w-full max-w-[210mm] min-h-[297mm] mx-auto shadow-2xl p-[15mm] md:p-[20mm] relative">
      {/* 头部 */}
      <div className="border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">{resumeData.name}</h1>
        <p className="text-xl text-gray-600 font-medium mb-4">{resumeData.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5"><Mail size={14} /> {resumeData.email}</div>
          <div className="flex items-center gap-1.5"><Phone size={14} /> {resumeData.phone}</div>
          <div className="flex items-center gap-1.5"><MapPin size={14} /> {resumeData.location}</div>
          <div className="flex items-center gap-1.5"><Globe size={14} /> {resumeData.website}</div>
        </div>
      </div>

      {/* 简介 */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
          <User size={16} /> 个人简介
        </h3>
        <p className="text-gray-700 leading-relaxed text-sm text-justify">
          {resumeData.summary}
        </p>
      </div>

      {/* 经验 */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
          <Briefcase size={16} /> 工作经历
        </h3>
        <div className="space-y-6">
          {resumeData.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-800">{exp.role}</h4>
                <span className="text-sm text-gray-500 font-medium">{exp.time}</span>
              </div>
              <div className="text-sm text-blue-600 font-medium mb-2">{exp.company}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

       {/* 技能 */}
       <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
          <Award size={16} /> 技能特长
        </h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

