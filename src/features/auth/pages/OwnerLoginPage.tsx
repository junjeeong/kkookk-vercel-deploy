/**
 * OwnerLoginPage
 * 사장님/백오피스 인증을 위한 로그인 페이지
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import { PhoneVerification } from '../components/PhoneVerification';
import type { AuthMode } from '../types';

interface OwnerLoginPageProps {
  title?: string;
  subtitle?: string;
  onLoginSuccess?: () => void;
  onBack?: () => void;
  isTabletMode?: boolean;
}

export function OwnerLoginPage({
  title = '사장님 백오피스',
  subtitle = '통합 관리자 계정으로 로그인하세요.',
  onLoginSuccess,
  onBack,
  isTabletMode = false,
}: OwnerLoginPageProps) {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      navigate('/owner/stores');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const handleLogin = (_email: string, _password: string) => {
    setIsLoading(true);
    // 로그인 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      handleLoginSuccess();
    }, 800);
  };

  const handleSignup = (data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setPhone(data.phone);
    // 회원가입 및 OTP 발송 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      setAuthMode('verify');
      alert(`[인증번호 발송됨]\n${data.phone}로 인증번호 123456을 보냈습니다.`);
    }, 1000);
  };

  const handleVerify = (code: string) => {
    if (code !== '123456') {
      alert('인증번호가 일치하지 않습니다. (123456)');
      return;
    }
    setIsLoading(true);
    // 인증 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      alert('휴대폰 인증이 완료되었습니다. 로그인해주세요.');
      setAuthMode('login');
    }, 1000);
  };

  const handleResend = () => {
    alert(`[인증번호 재발송]\n${phone}로 인증번호 123456을 보냈습니다.`);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${isTabletMode ? 'h-full w-full' : 'min-h-screen'} bg-kkookk-sand p-6`}
    >
      <div
        className={`bg-white rounded-3xl shadow-xl p-8 w-full ${isTabletMode ? 'max-w-sm border border-slate-100' : 'max-w-md border border-slate-200'}`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-kkookk-navy mb-2">{title}</h2>
          <p className="text-kkookk-steel text-sm">{subtitle}</p>
        </div>

        {authMode === 'login' && (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToSignup={() => setAuthMode('signup')}
            isLoading={isLoading}
          />
        )}

        {authMode === 'signup' && (
          <SignupForm
            onSubmit={handleSignup}
            onSwitchToLogin={() => setAuthMode('login')}
            isLoading={isLoading}
          />
        )}

        {authMode === 'verify' && (
          <PhoneVerification
            phone={phone}
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={() => setAuthMode('signup')}
            isLoading={isLoading}
          />
        )}
      </div>

      <button
        onClick={handleBack}
        className="mt-8 text-kkookk-steel text-sm hover:text-kkookk-navy flex items-center gap-1"
      >
        <ChevronLeft size={16} /> 초기 화면으로
      </button>
    </div>
  );
}

export default OwnerLoginPage;
