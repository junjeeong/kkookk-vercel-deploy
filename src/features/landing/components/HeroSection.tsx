/**
 * HeroSection
 * 히어로 섹션 - 핵심 메시지 + CTA + 교차 캐러셀
 */

import { Coffee, Stamp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-20 pb-10 overflow-hidden">
      {/* Headline + CTA - 중앙 배치 */}
      <div className="px-6 mx-auto mb-12 text-center max-w-7xl">
        <AnimatedHeadline />
        <button
          className={`px-8 py-4 text-lg font-bold text-white shadow-lg rounded-2xl bg-kkookk-orange-500 hover:bg-kkookk-orange-600 active:scale-95 shadow-kkookk-orange-500/30 hover:shadow-kkookk-orange-500/40 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          무료 스탬프 만들기
        </button>
      </div>

      {/* Carousel - 2개 레이어 교차 */}
      <CrossCarousel />
    </section>
  );
}

/**
 * AnimatedHeadline
 * 헤드라인 - 글자별 슬라이드 애니메이션
 */
function AnimatedHeadline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 텍스트를 줄과 부분별로 구성
  const line1 = "매출로 이어지는 맞춤형 스탬프,";
  const line2Part1 = "꾸욱"; // 오렌지 강조
  const line2Part2 = "으로 시작하세요!";

  let charIndex = 0;

  // 각 글자를 애니메이션 span으로 렌더링
  const renderChar = (char: string, isOrange = false) => {
    const index = charIndex++;
    return (
      <span
        key={index}
        className={`inline-block transition-all duration-300 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        } ${isOrange ? "font-bold text-kkookk-orange-500" : ""}`}
        style={{ transitionDelay: `${index * 20}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  };

  return (
    <h1
      className="mb-8 text-4xl font-semibold tracking-normal lg:text-5xl text-kkookk-navy"
      style={{ lineHeight: "1.15" }}
    >
      {line1.split("").map((char) => renderChar(char))}
      <br />
      {line2Part1.split("").map((char) => renderChar(char, true))}
      {line2Part2.split("").map((char) => renderChar(char))}
    </h1>
  );
}

/**
 * CrossCarousel
 * 2개 레이어 교차 캐러셀 (위: 오른쪽, 아래: 왼쪽)
 */
function CrossCarousel() {
  // 카드 데이터
  const cardsData = [
    {
      backgroundImage: "/mock/mock-background1.png",
      storeName: "스타벅스 강남점",
      stampCount: 8,
      expiryDays: 12,
    },
    {
      backgroundImage: "/mock/mock-background2.png",
      storeName: "투썸플레이스 역삼",
      stampCount: 5,
      expiryDays: 20,
    },
    {
      backgroundImage: "/mock/mock-background4.png",
      storeName: "베이커리 온리",
      stampCount: 12,
      expiryDays: 25,
    },
    {
      backgroundImage: "/mock/mock-background5.png",
      storeName: "폴바셋 테헤란",
      stampCount: 6,
      expiryDays: 15,
    },
    {
      backgroundImage: "/mock/mock-background6.png",
      storeName: "블루보틀 성수",
      stampCount: 9,
      expiryDays: 10,
    },
    {
      backgroundImage: "/mock/mock-background7.png",
      storeName: "상수 Breing",
      stampCount: 1,
      expiryDays: 13,
    },
    {
      backgroundImage: "/mock/mock-background8.png",
      storeName: "홍대 콤마",
      stampCount: 9,
      expiryDays: 16,
    },
    {
      backgroundImage: "/mock/mock-background9.png",
      storeName: "합정 블루스",
      stampCount: 4,
      expiryDays: 10,
    },
  ];

  return <CarouselLayer cards={cardsData} direction="right" />;
}

/**
 * CarouselLayer
 * 단일 캐러셀 레이어 (드래그 가능)
 */
interface CarouselLayerProps {
  cards: Array<{
    backgroundImage: string;
    storeName: string;
    stampCount: number;
    expiryDays: number;
  }>;
  direction: "left" | "right";
}

function CarouselLayer({ cards, direction }: CarouselLayerProps) {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 페이드인 애니메이션
  useEffect(() => {
    setMounted(true);
  }, []);

  // 자동 스크롤 + 무한 루프
  useEffect(() => {
    if (isDragging) return;

    const cardWidth = 380 + 16; // card width + gap
    const totalWidth = cardWidth * cards.length;

    const interval = setInterval(() => {
      setOffset((prev) => {
        const speed = 0.5;
        let newOffset = direction === "right" ? prev + speed : prev - speed;

        // 무한 루프: offset이 한 세트를 넘어가면 리셋
        if (direction === "right" && newOffset > totalWidth) {
          newOffset = newOffset - totalWidth;
        } else if (direction === "left" && newOffset < -totalWidth) {
          newOffset = newOffset + totalWidth;
        }

        return newOffset;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [direction, isDragging, cards.length]);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(offset);
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // 드래그 방향대로 스크롤: 오른쪽 드래그 → 오른쪽 컨텐츠 보기
    setOffset(scrollLeft + walk);
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 키보드 지원
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setOffset((prev) => prev - 50);
    } else if (e.key === "ArrowRight") {
      setOffset((prev) => prev + 50);
    }
  };

  // 무한 스크롤을 위한 카드 복제
  const infiniteCards = [...cards, ...cards, ...cards];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: "400ms" }}
      role="region"
      aria-label="스탬프 카드 캐러셀"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex gap-2 py-4"
        style={{
          transform: `translateX(${-offset}px)`,
          transition: isDragging ? "none" : "transform 0.1s linear",
        }}
      >
        {infiniteCards.map((card, index) => (
          <div key={index} className="shrink-0">
            <BeforeAfterCard
              backgroundImage={card.backgroundImage}
              storeName={card.storeName}
              stampCount={card.stampCount}
              expiryDays={card.expiryDays}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * BeforeAfterCard
 * 380x360 크기의 Before/After 카드 - 겹침 레이아웃
 */
interface BeforeAfterCardProps {
  backgroundImage: string;
  storeName: string;
  stampCount: number;
  expiryDays: number;
}

function BeforeAfterCard({
  backgroundImage,
  storeName,
  stampCount,
  expiryDays,
}: BeforeAfterCardProps) {
  return (
    <div
      className="relative flex p-4 transition-all duration-300 bg-white group rounded-2xl shadow-kkookk-md hover:shadow-kkookk-lg"
      style={{ width: "400px", height: "360px" }}
    >
      {/* Before - 왼쪽 상단 */}
      <div className="absolute transition-all duration-300 w-72 top-4 left-4 group-hover:opacity-50">
        <div className="p-4 w-full aspect-[1.58/1] bg-kkookk-sand rounded-xl shadow-md relative overflow-hidden border-2 border-dashed border-kkookk-steel/30 flex flex-col items-center justify-center">
          <Stamp className="w-12 h-12 mb-2 text-kkookk-steel/20" />
          <div className="text-center">
            <p className="font-semibold text-kkookk-steel/80">
              구겨지고, 잃어버리는
            </p>
            <p className="text-sm text-kkookk-steel/60">종이 스탬프 쿠폰</p>
          </div>
        </div>
      </div>

      {/* After - 오른쪽 하단 (Before와 겹침) */}
      <div className="absolute transition-all duration-300 right-2 bottom-14 w-80 group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-1">
        <div
          className="w-full aspect-[1.58/1] rounded-xl p-3.5 text-white shadow-xl relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* 배경 오버레이 (가독성 향상) */}
          <div className="absolute inset-0 bg-black/20 rounded-xl" />

          {/* StampCardItem 스타일 */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* 헤더 */}
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold opacity-90 drop-shadow-md">
                {storeName}
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] backdrop-blur-sm font-medium">
                D-{expiryDays}
              </span>
            </div>

            {/* 푸터 */}
            <div>
              <p className="text-white/80 text-[8px] font-medium mb-0.5">
                현재 스탬프
              </p>
              <p className="text-xl font-bold leading-none text-white drop-shadow-sm">
                {stampCount}개
              </p>
            </div>
          </div>

          {/* 배경 아이콘 */}
          <Coffee
            className="absolute w-20 h-20 transform -right-1 -bottom-2 text-white/10 rotate-12"
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
}
