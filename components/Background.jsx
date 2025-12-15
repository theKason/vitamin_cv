'use client';

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-900 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-indigo-500/10 rounded-full blur-[100px]"></div>
    </div>
  );
}

