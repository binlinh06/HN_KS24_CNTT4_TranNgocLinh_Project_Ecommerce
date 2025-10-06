import React, { useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

export default function MainContent() {
  // Lưu các sản phẩm được "yêu thích"
  const [favorites, setFavorites] = useState<number[]>([]);

  // Hàm toggle tim
  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      {/* Category */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-lg font-semibold">Danh mục sản phẩm</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-full hover:bg-black hover:text-white transition">
            <LeftOutlined />
          </button>
          <button className="p-2 border rounded-full hover:bg-black hover:text-white transition">
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-10 justify-between">
        {[
          "Điện thoại",
          "Đồng hồ",
          "Cameras",
          "Tai nghe",
          "Máy tính",
          "Gaming",
        ].map((cat) => (
          <button
            key={cat}
            className="px-12 py-12 bg-[#EDEDED] rounded-lg hover:bg-black hover:text-white transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Tabs */}
      <div className="flex space-x-6 pb-4 mb-6">
        <span className="font-semibold border-b-2 border-black pb-1">
          New Arrival
        </span>
        <span className="text-gray-500 hover:text-black cursor-pointer">
          Bestseller
        </span>
        <span className="text-gray-500 hover:text-black cursor-pointer">
          Featured Products
        </span>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="relative bg-gray-100 rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            {/* Heart Button */}
            <button
              onClick={() => toggleFavorite(i)}
              className={`absolute top-3 right-3 text-gray-400 transition-transform duration-300 ${
                favorites.includes(i)
                  ? "scale-125 text-red-500"
                  : "hover:scale-110 hover:text-red-500"
              }`}
            >
              {favorites.includes(i) ? <HeartFilled /> : <HeartOutlined />}
            </button>

            <img
              src={`https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764429/product1_qzzmds.png`}
              alt={`Sản phẩm ${i + 1}`}
              className="w-full h-40 object-contain mb-3"
            />

            <h3 className="text-sm font-medium mb-2">Sản phẩm {i + 1}</h3>
            <p className="font-semibold mb-3">$399</p>
            <button className="bg-black text-white w-full py-2 rounded-md">
              Mua ngay
            </button>
          </div>
        ))}
      </div>

      {/* Discount Section */}
      <h2 className="text-lg font-semibold mt-16 mb-6">Sản phẩm giảm giá</h2>
      <div className="grid grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative bg-gray-100 rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            <button
              onClick={() => toggleFavorite(i + 100)} // khác index để không trùng
              className={`absolute top-3 right-3 text-gray-400 transition-transform duration-300 ${
                favorites.includes(i + 100)
                  ? "scale-125 text-red-500"
                  : "hover:scale-110 hover:text-red-500"
              }`}
            >
              {favorites.includes(i + 100) ? (
                <HeartFilled />
              ) : (
                <HeartOutlined />
              )}
            </button>

            <img
              src={`https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764593/product9_s10d0m.png`}
              alt={`Giảm giá ${i + 1}`}
              className="w-full h-40 object-contain mb-3"
            />
            <h3 className="text-sm font-medium mb-2">Giảm giá {i + 1}</h3>
            <p className="font-semibold mb-3">$299</p>
            <button className="bg-black text-white w-full py-2 rounded-md">
              Mua ngay
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
