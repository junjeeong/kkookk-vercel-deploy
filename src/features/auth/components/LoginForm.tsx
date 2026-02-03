/**
 * LoginForm 컴포넌트
 * 사장님 계정용 이메일/비밀번호 로그인 폼
 */

import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  onSubmit,
  onSwitchToSignup,
  isLoading = false,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-in fade-in slide-in-from-bottom-4"
    >
      <Input
        type="email"
        label="이메일 주소"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="boss@partner.com"
        icon={<Mail size={18} />}
        autoComplete="email"
      />

      <Input
        type="password"
        label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        icon={<Lock size={18} />}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        variant="navy"
        size="full"
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            로그인 중...
          </>
        ) : (
          '로그인'
        )}
      </Button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-sm text-kkookk-steel hover:text-kkookk-orange-500 underline decoration-slate-300 underline-offset-4"
        >
          아직 계정이 없으신가요? 회원가입
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
