import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Layout, 
  Award
} from 'lucide-react';

export const RESUME_SECTIONS = [
  { id: 'basic', label: '基本信息', icon: User },
  { id: 'summary', label: '个人总结', icon: FileText },
  { id: 'experience', label: '工作经历', icon: Briefcase },
  { id: 'education', label: '教育背景', icon: GraduationCap },
  { id: 'projects', label: '项目经验', icon: Layout },
  { id: 'skills', label: '技能特长', icon: Award },
];

