/**
 * SignupForm 컴포넌트
 * 휴대폰 인증이 포함된 사장님 계정 회원가입 폼
 */

import { useState } from 'react';
import { User, Smartphone, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface SignupFormProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

export function SignupForm({
  onSubmit,
  onSwitchToLogin,
  isLoading = false,
}: SignupFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !phone) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    onSubmit({ name, phone, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-in fade-in slide-in-from-right-4"
    >
      <Input
        type="text"
        label="이름 (실명)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="홍길동"
        icon={<User size={18} />}
        autoComplete="name"
      />

      <Input
        type="tel"
        label="휴대폰 번호 (인증필요)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="010-0000-0000"
        icon={<Smartphone size={18} />}
        autoComplete="tel"
      />

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
        placeholder="8자 이상 입력"
        icon={<Lock size={18} />}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        variant="primary"
        size="full"
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            처리 중...
          </>
        ) : (
          '인증번호 받기'
        )}
      </Button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-kkookk-steel hover:text-kkookk-navy"
        >
          이미 계정이 있으신가요? 로그인
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
