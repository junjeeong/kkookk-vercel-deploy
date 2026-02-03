/**
 * CustomerSignupForm 컴포넌트
 * OTP 인증을 포함한 신규 고객 회원가입 폼
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type SignupStep = 'input' | 'otp' | 'success';

export function CustomerSignupForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>('input');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nickname || !phone) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    // OTP 요청 시뮬레이션
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    // 인증 시뮬레이션
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="h-full flex flex-col p-6 bg-white">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-300">
            <Check size={48} className="text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-kkookk-navy text-center animate-in fade-in slide-in-from-bottom-4 delay-100">
            환영합니다!
            <br />
            멤버십이 생성되었어요.
          </h2>
          <p className="text-kkookk-steel text-center animate-in fade-in slide-in-from-bottom-4 delay-200">
            이제 스탬프를 적립하고
            <br />
            다양한 혜택을 받아보세요.
          </p>
        </div>

        <div className="w-full pb-8 animate-in fade-in slide-in-from-bottom-4 delay-300">
          <Button
            onClick={() => navigate('/customer/wallet')}
            variant="primary"
            size="full"
            className="shadow-lg shadow-orange-200"
          >
            <Sparkles size={20} className="text-white" />
            내 지갑 확인하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6 pt-12 flex flex-col bg-white">
      <div className="flex items-center mb-6 -ml-2">
        <button
          onClick={() => (step === 'otp' ? setStep('input') : navigate('/customer'))}
          className="p-2 text-kkookk-steel"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-kkookk-navy">
        첫 방문이시군요!
        <br />
        멤버십을 만들어드릴게요.
      </h2>

      {step === 'input' ? (
        <form onSubmit={handleRequestOtp} className="space-y-4 mt-8">
          <Input
            type="text"
            label="이름 (실명)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            autoComplete="name"
          />

          <Input
            type="text"
            label="닉네임 (매장에서 불릴 이름)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="길동이"
          />

          <Input
            type="tel"
            label="휴대폰 번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-0000-0000"
            autoComplete="tel"
          />

          <Button type="submit" variant="primary" size="full" className="mt-4">
            인증번호 받기
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleVerifyOtp}
          className="space-y-6 mt-8 animate-in fade-in slide-in-from-right-4"
        >
          <p className="text-kkookk-steel text-sm">
            입력하신 번호로 인증번호를 보냈어요.
          </p>

          <Input
            type="text"
            label="인증번호 6자리"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="tracking-widest font-mono text-center text-lg"
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
          />

          <Button type="submit" variant="navy" size="full" className="mt-4">
            인증 완료하고 시작하기
          </Button>
        </form>
      )}
    </div>
  );
}

export default CustomerSignupForm;
