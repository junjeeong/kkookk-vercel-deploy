/**
 * CustomerLoginForm Component
 * Simple name + phone login for returning customers
 */

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CustomerLoginFormProps {
  onSubmit: (name: string, phone: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function CustomerLoginForm({
  onSubmit,
  onBack,
  isLoading = false,
}: CustomerLoginFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('이름과 휴대폰 번호를 입력해주세요.');
      return;
    }
    onSubmit(name, phone);
  };

  return (
    <div className="h-full p-6 pt-12 flex flex-col bg-white">
      <div className="flex items-center mb-6 -ml-2">
        <button
          onClick={onBack}
          className="p-2 text-kkookk-steel"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-kkookk-navy">
        반가워요!
        <br />
        지갑을 찾아드릴게요.
      </h2>
      <p className="text-kkookk-steel text-sm mb-10">
        가입하신 정보를 입력해주세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          autoComplete="name"
        />

        <Input
          type="tel"
          label="휴대폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-0000-0000"
          autoComplete="tel"
        />

        <Button
          type="submit"
          variant="navy"
          size="full"
          isLoading={isLoading}
          className="mt-4"
        >
          지갑 열기
        </Button>
      </form>
    </div>
  );
}

export default CustomerLoginForm;
