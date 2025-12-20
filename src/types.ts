export interface Experience {
  id: number;
  role: string;
  company: string;
  time: string;
  desc: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  skills: string[];
}

import type { LucideIcon } from 'lucide-react';

export interface ResumeSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface UploadPageProps {
  onFileUpload: (file: File) => void;
}

export interface EditorPageProps {
  uploadedFile: File | null;
  resumeData: ResumeData;
  onInputChange: (field: keyof ResumeData, value: string | Experience[] | string[]) => void;
}

export interface SidebarItemProps {
  section: ResumeSection;
  isExpanded: boolean;
  onToggle: () => void;
  resumeData: ResumeData;
  onInputChange: (field: keyof ResumeData, value: string | Experience[] | string[]) => void;
}

export interface ResumePreviewProps {
  resumeData: ResumeData;
}

