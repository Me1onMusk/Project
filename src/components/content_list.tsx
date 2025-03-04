import React, { useState, useEffect, useRef } from 'react';

interface Item {
  id: number;
  title: string;
}

interface InfiniteListProps {
  category: string;  // 선택된 카테고리 이름
}

// 카테고리에 맞춰 "카테고리1 아이템", "카테고리2 아이템" 식으로 문구 생성
function generateMockData(startId: number, count: number, catLabel: string): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    title: `${catLabel} 아이템 ${startId + i}`,
  }));
}

const InfiniteList: React.FC<InfiniteListProps> = ({ category }) => {
  const [items, setItems] = useState<Item[]>(() => generateMockData(1, 10, category));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // (중요) 카테고리가 바뀔 때마다 목록 리셋
  useEffect(() => {
    setItems(generateMockData(1, 10, category));
    setPage(1);
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newItems = generateMockData(page * 10 + 1, 10, category);
      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold mb-2">{category}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="border p-2 rounded bg-gray-50 text-sm">
            {item.title}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-2 text-gray-500">로딩 중...</div>
      )}
      <div ref={observerRef} className="h-1" />
    </div>
  );
};

export default InfiniteList;
