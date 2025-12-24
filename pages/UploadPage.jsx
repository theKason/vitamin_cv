import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import Background from '../components/Background';

export default function UploadPage({ onFileUpload }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  };

  const processFile = (file) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onFileUpload(file);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center justify-center p-4 relative font-sans">
      <Background />
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 text-center relative z-10">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
          <div className="relative h-24 w-24 bg-gradient-to-br from-blue-500/80 to-indigo-600/80 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform rotate-6 border border-white/20">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-sm">简历解析</h1>
          <p className="text-blue-100/70 mt-3 text-sm font-medium">智能识别 PDF 与 DOCX 文档</p>
        </div>
        <div 
          className={`
            border-2 border-dashed rounded-2xl p-10 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center group
            ${isDragOver 
              ? 'border-blue-400 bg-blue-500/20 scale-105' 
              : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
          `}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="h-12 w-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mb-4 shadow-lg"></div>
              <p className="text-blue-200 font-medium tracking-wide">正在分析结构...</p>
            </div>
          ) : (
            <>
              <div className="bg-white/10 p-4 rounded-full mb-4 group-hover:scale-110 group-hover:bg-blue-500/80 group-hover:shadow-blue-500/50 group-hover:shadow-lg transition-all duration-300">
                <Upload className="h-8 w-8 text-blue-200 group-hover:text-white" />
              </div>
              <p className="text-gray-200 font-medium mb-1 group-hover:text-white transition-colors">拖拽文件至此</p>
              <p className="text-xs text-gray-400 mt-1">支持 .pdf / .docx</p>
            </>
          )}
          <input id="file-upload" type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} disabled={isUploading} />
        </div>
      </div>
    </div>
  );
}

