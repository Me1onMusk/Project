
import React, { useState, useEffect, useRef } from 'react';

const banners = [
    { id: 1, imgUrl: '/banner.png', link: 'https://example.com/1' },
    { id: 2, imgUrl: '/banner.png', link: 'https://example.com/2' },
    { id: 3, imgUrl: '/banner.png', link: 'https://example.com/3' },
];

const SWIPE_THRESHOLD = 50;

const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 포인터 드래그 좌표 추적
  const pointerStartX = useRef<number>(0);
  const pointerMoveX = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  // 4초마다 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) return banners.length - 1;
      return prev - 1;
    });
  };

  // 드래그 시작
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    pointerStartX.current = e.clientX;
    pointerMoveX.current = e.clientX;
    // 포인터 캡처로 드래그 중 커서가 벗어나도 이벤트 추적 가능
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // 드래그 중
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    pointerMoveX.current = e.clientX;
  };

  // 드래그 종료
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const distance = pointerStartX.current - pointerMoveX.current;

    if (distance > SWIPE_THRESHOLD) {
      nextSlide();
    } else if (distance < -SWIPE_THRESHOLD) {
      prevSlide();
    }
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleClickBanner = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div
      className="relative w-full h-[150px] overflow-hidden mb-4"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* 슬라이드 전체를 가로로 이어 붙이고, currentIndex 에 따라 translateX로 이동 */}
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="w-full h-full flex-shrink-0 cursor-pointer"
            onClick={() => handleClickBanner(banner.link)}
          >
            <img
              src={banner.imgUrl}
              alt={`banner-${banner.id}`}
              className="w-full h-full object-cover select-none"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>

      {/* 하단 점(인디케이터) */}
      <div className="absolute bottom-2 w-full flex justify-center items-center gap-2">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`
              w-3 h-3 rounded-full
              ${idx === currentIndex ? 'bg-red-300' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;