import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Paperclip } from 'lucide-react';
import Background from '../components/Background';
import TopBar from '../components/TopBar';
import type { UploadPageProps } from '../types';

export default function UploadPage({ onFileUpload }: UploadPageProps) {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartOptimize = () => {
    if (!textInput.trim() && !uploadedFile) return;
    
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      if (uploadedFile) {
        onFileUpload(uploadedFile);
      }
      navigate('/editor');
    }, 1500);
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative font-sans">
      <Background />
      <TopBar showAIOptimize={false} showExportPDF={false} />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 relative z-10 flex flex-col gap-6">
        
        <div className="text-center mb-2">
           <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm flex items-center justify-center gap-3">
             <div className="h-10 w-10 bg-gradient-to-br from-blue-500/80 to-indigo-600/80 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                <FileText className="h-6 w-6 text-white" />
             </div>
             Vitamin CV
           </h1>
           <p className="text-blue-100/70 mt-2 text-sm font-medium">粘贴简历内容 或 上传 PDF/DOCX</p>
        </div>

        <div 
          className={`
            relative group rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white/5
            ${isDragOver 
              ? 'border-blue-400 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
              : 'border-white/10 hover:border-white/20 focus-within:border-blue-400/50 focus-within:bg-white/10'}
          `}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <textarea
            className="w-full h-64 bg-transparent text-gray-200 placeholder-gray-500 p-6 resize-none focus:outline-none text-base leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            placeholder={isDragOver ? "松开鼠标上传文件..." : "在此粘贴目标岗位内容..."}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={isUploading}
          />

          <div className="absolute bottom-4 right-4 left-4 flex justify-between items-center pointer-events-none">
             <div className={`text-xs text-blue-300/70 transition-opacity duration-300 ${isDragOver ? 'opacity-100' : 'opacity-0'}`}>
                <Upload className="inline w-3 h-3 mr-1" /> 释放以上传
             </div>
             <div className="flex-1"></div>

             <div className="flex items-center gap-2 pointer-events-auto">
                <input id="file-upload" type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} disabled={isUploading} />
                
                <button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 active:scale-95"
                  title="上传文件"
                  disabled={isUploading}
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <button 
                  onClick={handleStartOptimize}
                  className={`
                    px-6 py-2.5 rounded-xl font-medium text-sm text-white shadow-lg transition-all active:scale-95 flex items-center gap-2
                    ${(!textInput.trim() && !uploadedFile) || isUploading
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-white/20 shadow-blue-500/20'}
                  `}
                  disabled={(!textInput.trim() && !uploadedFile) || isUploading}
                >
                  {isUploading ? (
                     <>
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       <span>处理中</span>
                     </>
                  ) : (
                     <>开始优化</>
                  )}
                </button>
             </div>
          </div>

          {isDragOver && (
            <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-20">
               <div className="bg-slate-900/80 p-4 rounded-2xl border border-blue-500/50 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-200">
                  <Upload className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-blue-200 font-bold">松开上传文件</span>
               </div>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-gray-500">支持 PDF, DOCX 格式，或直接粘贴文本</p>
        </div>
      </div>
    </div>
  );
}

