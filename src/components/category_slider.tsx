import React from 'react';

type CategorySliderProps = {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
};

const categories = [
  { id: 'cat1', label: '카테고리1' },
  { id: 'cat2', label: '카테고리2' },
  { id: 'cat3', label: '카테고리3' },
  { id: 'cat4', label: '카테고리4' },
  { id: 'cat5', label: '카테고리5' },
  { id: 'cat6', label: '카테고리6' },
  { id: 'cat7', label: '카테고리7' },
];

const CategorySlider: React.FC<CategorySliderProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div
      className="
        w-full overflow-x-auto whitespace-nowrap
        py-2 border-y border-gray-200 mb-4
        hide-scrollbar
      "
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategorySelect(cat.label)}
          className={`
            inline-block px-4 py-2 m-1 text-sm font-semibold rounded-full
            ${selectedCategory === cat.label ? 'bg-pink-400 text-white' : 'bg-gray-100'}
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
