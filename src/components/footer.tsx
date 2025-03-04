import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="
        fixed bottom-0 w-[425px] h-[60px]
        bg-pink-300 flex items-center justify-center
        z-50
      ">
      <div className="text-sm font-bold">
        최하단 푸터 영역
      </div>
    </footer>
  );
};

export default Footer;
