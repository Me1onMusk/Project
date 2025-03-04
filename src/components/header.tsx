import React from 'react';

const Header: React.FC = () => {
  // 가상의 탭 메뉴 예시
  const tabs = ['차트', 'Whook', '이벤트', '뉴스', '스토어', '충전소'];

  return (
    <header
      className="
        fixed top-0 w-[425px] h-[50px]
        bg-pink-300 flex items-center justify-center z-50
      ">
      <nav className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => alert(`${tab} 탭 클릭`)}
            className="text-sm font-semibold px-2 py-1 rounded hover:bg-pink-400"
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
