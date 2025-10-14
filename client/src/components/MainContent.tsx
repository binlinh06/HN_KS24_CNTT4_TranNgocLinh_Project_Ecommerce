import React, { useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

export default function MainContent() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // 🔹 Danh sách sản phẩm mới
  const products = [
    {
      name: "Apple iPhone 14 Pro Max 128GB Deep Purple",
      price: "$900",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764429/product1_qzzmds.png",
    },
    {
      name: "Blackmagic Pocket Cinema Camera 6k",
      price: "$2535",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438705/Iphone_14_pro_1_1_jdq5eq.png",
    },
    {
      name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
      price: "$399",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438705/Iphone_14_pro_1_2_hoyscw.png",
    },
    {
      name: "AirPods Max Silver",
      price: "$549",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438704/Iphone_14_pro_1_9_asqw3p.png",
    },
    {
      name: "Samsung Galaxy Watch6 Classic 47mm Black",
      price: "$369",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438705/Iphone_14_pro_1_4_sxr55g.png",
    },
    {
      name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
      price: "$1799",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438705/Iphone_14_pro_1_5_hcoxiv.png",
    },
    {
      name: "Galaxy Buds FE Graphite",
      price: "$99.99",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438704/Iphone_14_pro_1_6_op8amj.png",
    },
    {
      name: "Apple iPad 9 10.2” 64GB Wi-Fi Silver (MK2L3J) 2021",
      price: "$398",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438704/Iphone_14_pro_1_7_nawmrq.png",
    },
  ];

  // 🔹 Sản phẩm giảm giá
  const discounts = [
    {
      name: "Apple iPhone 14 Pro 512GB Gold (MQ0233)",
      price: "$1437",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764593/product9_s10d0m.png",
    },
    {
      name: "AirPods Max Silver",
      price: "$549",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438704/Iphone_14_pro_1_9_asqw3p.png",
    },
    {
      name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
      price: "$399",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438705/Iphone_14_pro_1_2_hoyscw.png",
    },
    {
      name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
      price: "$1499",
      img: "https://res.cloudinary.com/dcti4xpqa/image/upload/v1760438704/Iphone_14_pro_1_11_h8tcga.png",
    },
  ];

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
        {["Điện thoại", "Đồng hồ", "Cameras", "Tai nghe", "Máy tính", "Gaming"].map((cat) => (
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
        {products.map((p, i) => (
          <div
            key={i}
            className="relative bg-gray-100 rounded-lg p-4 text-center hover:shadow-lg transition flex flex-col justify-between h-[360px]"
          >
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

            <div className="flex justify-center items-center h-52 mb-3">
              <img
                src={p.img}
                alt={p.name}
                className="max-h-48 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="text-sm font-medium mb-2 line-clamp-2">{p.name}</h3>
            <p className="font-semibold mb-3">{p.price}</p>
            <button className="bg-black text-white w-full py-2 rounded-md">
              Mua ngay
            </button>
          </div>
        ))}
      </div>

      {/* Discount Section */}
      <h2 className="text-lg font-semibold mt-16 mb-6">Sản phẩm giảm giá</h2>
      <div className="grid grid-cols-4 gap-8">
        {discounts.map((p, i) => (
          <div
            key={i + 100}
            className="relative bg-gray-100 rounded-lg p-4 text-center hover:shadow-lg transition flex flex-col justify-between h-[360px]"
          >
            <button
              onClick={() => toggleFavorite(i + 100)}
              className={`absolute top-3 right-3 text-gray-400 transition-transform duration-300 ${
                favorites.includes(i + 100)
                  ? "scale-125 text-red-500"
                  : "hover:scale-110 hover:text-red-500"
              }`}
            >
              {favorites.includes(i + 100) ? <HeartFilled /> : <HeartOutlined />}
            </button>

            <div className="flex justify-center items-center h-52 mb-3">
              <img
                src={p.img}
                alt={p.name}
                className="max-h-48 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="text-sm font-medium mb-2 line-clamp-2">{p.name}</h3>
            <p className="font-semibold mb-3">{p.price}</p>
            <button className="bg-black text-white w-full py-2 rounded-md">
              Mua ngay
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
