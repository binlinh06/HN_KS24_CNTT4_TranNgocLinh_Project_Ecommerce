import React from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  MobileOutlined,
  LaptopOutlined,
  CameraOutlined,
  CustomerServiceOutlined,
  DesktopOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <span className="text-black">▽</span>
          <span className="text-gray-800">cyber</span>
        </div>

        {/* Search */}
        <div className="flex-1 mx-10 relative">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
          />
          <SearchOutlined className="absolute left-3 top-2.5 text-gray-400 text-lg" />
        </div>

        {/* Menu */}
        <nav className="flex items-center space-x-6 text-gray-700">
          <a href="#" className="font-medium border-b-2 border-black">
            Trang chủ
          </a>
          <a href="#">Giới thiệu</a>
          <a href="#">Liên hệ</a>
          <HeartOutlined />
          <ShoppingCartOutlined />
          <UserOutlined />
        </nav>
      </div>

      {/* Submenu */}
      <div className="bg-[#2E2E2E] text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {[
            { icon: <MobileOutlined />, text: "Điện thoại" },
            { icon: <LaptopOutlined />, text: "Laptop" },
            { icon: <DesktopOutlined />, text: "Đồng hồ thông minh" },
            { icon: <CameraOutlined />, text: "Cameras" },
            { icon: <CustomerServiceOutlined />, text: "Tai nghe" },
            { icon: <ConsoleSqlOutlined />, text: "Gaming" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center px-5 py-2 space-x-2 hover:bg-gray-700 cursor-pointer transition"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Banner (đã căn đúng với header trên) */}
      <div className="bg-[#211C24] text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-20 px-6">
          {/* Left Content */}
          <div className="max-w-lg">
            <p className="text-gray-400 mb-2">Đột phá công nghệ</p>
            <h1 className="text-6xl font-light mb-4 leading-tight">
              IPhone 14 <span className="font-bold">Pro</span>
            </h1>
            <p className="text-gray-400 mb-6">
              Được tạo ra để thay đổi mọi thứ để tốt hơn. Cho tất cả mọi người
            </p>
            <button className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition">
              Mua ngay
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764129/20ae4cc7d95ed194279d337796d951679b146d4a_tm2a7f.png"
              alt="Iphone"
              className="w-[400px] object-contain h-80"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
