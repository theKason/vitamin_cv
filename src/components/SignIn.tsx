import { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, UserPlus, Loader2 } from 'lucide-react';
import Background from './Background';
import { supabase } from '../lib/supabase';

interface SignInProps {
  onSignIn: () => void;
}

export default function SignIn({ onSignIn }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // Set up global callback for Google Sign-In
  useEffect(() => {
    (window as any).handleSignInWithGoogle = async (response: any) => {
      setGoogleLoading(true);
      setError('');
      try {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        });
        if (error) throw error;
        onSignIn();
      } catch (err: any) {
        setError(err.message || 'Google 登录失败');
      } finally {
        setGoogleLoading(false);
      }
    };

    return () => {
      delete (window as any).handleSignInWithGoogle;
    };
  }, [onSignIn]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setConfirmationSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSignIn();
      }
    } catch (err: any) {
      setError(err.message || '认证失败');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMsg('');
    setError('');
    try {
      // Supabase v2 resend method
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      } as any);
      if (error) throw error;
      setResendMsg('确认邮件已重新发送！请检查您的收件箱。');
    } catch (err: any) {
      setError(err.message || '重新发送失败');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center justify-center p-4 relative font-sans">
      <Background />
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 relative z-10 flex flex-col gap-6">
        
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm flex items-center justify-center gap-3">
            Vitamin CV
          </h1>
          <p className="text-blue-100/70 mt-2 text-sm font-medium">
            {mode === 'signin' ? '登录您的账户' : '创建新账户'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5 group">
            <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors flex items-center gap-2">
              <Mail size={14} /> 邮箱
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              required
              disabled={confirmationSent || loading}
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-xs font-medium text-slate-400 pl-1 group-focus-within:text-blue-400 transition-colors flex items-center gap-2">
              <Lock size={14} /> 密码
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              required
              disabled={confirmationSent || loading}
            />
          </div>

          {mode === 'signup' && confirmationSent ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-3">
              <div className="text-green-200 text-sm text-center">
                <p className="font-medium mb-1">确认邮件已发送！</p>
                <p className="text-green-300/80 text-xs">
                  请检查您的收件箱并点击链接以激活您的账户。
                  <br />
                  确认后即可登录。
                </p>
              </div>
              <button
                type="button"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={handleResend}
                disabled={resendLoading}
              >
                {resendLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>发送中...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>重新发送确认邮件</span>
                  </>
                )}
              </button>
              {resendMsg && (
                <div className="text-green-300 text-xs text-center">{resendMsg}</div>
              )}
            </div>
          ) : (
            <button
              type="submit"
              className={`
                w-full py-3 rounded-xl font-medium text-sm text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
                ${loading
                  ? 'bg-white/10 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-white/20 shadow-blue-500/20'}
              `}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>处理中...</span>
                </>
              ) : (
                <>
                  {mode === 'signup' ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>注册</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>登录</span>
                    </>
                  )}
                </>
              )}
            </button>
          )}

          <div className="text-sm text-center text-slate-400">
            {mode === 'signin' ? (
              <span>
                还没有账户？{' '}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setConfirmationSent(false);
                  }}
                >
                  立即注册
                </button>
              </span>
            ) : (
              <span>
                已有账户？{' '}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  onClick={() => {
                    setMode('signin');
                    setError('');
                    setConfirmationSent(false);
                  }}
                >
                  立即登录
                </button>
              </span>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm text-center">
              {error}
            </div>
          )}
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-slate-400">或</span>
          </div>
        </div>

        <div className="space-y-2">
          <div
            id="g_id_onload"
            data-client_id="459290572396-egkc9kg4l52q5j5nqtl3kjfr14nga0ui.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleSignInWithGoogle"
            data-itp_support="true"
            data-use_fedcm_for_prompt="true"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
          {googleLoading && (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Google 登录中...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

