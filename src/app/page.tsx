
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import BannerSlider from '../components/banner';
import CategorySlider from '../components/category_slider';
import InfiniteList from '../components/content_list';
import Footer from '../components/footer';

export default function Home() {
  // 처음에는 "카테고리1"을 선택했다고 가정
  const [selectedCategory, setSelectedCategory] = useState('카테고리1');

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
        <Head>
            <title>Wireframe Sample (425x900)</title>
        </Head>

        {/* 고정 너비/높이: 425x900 */}
        <div className="relative bg-white w-[425px] h-[900px] overflow-hidden">
            {/* 전체 페이지를 flex-col 레이아웃 */}
            <div className="flex flex-col w-full h-full">
            {/* 상단 헤더 (고정) */}
            <Header />

            {/* 메인 영역 (헤더 높이 + 푸터 높이를 고려해 패딩, 내부 스크롤) */}
            <main className="flex-1 pt-[50px] pb-[60px] overflow-auto">
                {/* 배너 슬라이더 */}
                <BannerSlider />

                {/* 카테고리 슬라이더 (수평 스와이프 가능) */}
                <CategorySlider
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                />

                {/* 무한 스크롤 (선택된 카테고리 정보를 넘김) */}
                <InfiniteList category={selectedCategory} />
            </main>

            {/* 하단 푸터 (고정) */}
            <Footer />
            </div>
        </div>
    </div>
  );
}
