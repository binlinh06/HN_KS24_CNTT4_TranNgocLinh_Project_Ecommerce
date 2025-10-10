import React, { useEffect, useState } from "react";
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
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  // ✅ Lấy user từ localStorage khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  // ✅ Hàm chuyển sang trang login
  const handleLogin = () => {
    navigate("/login");
  };

  // ✅ Menu tùy theo trạng thái đăng nhập
  const menu = (
    <Menu
      items={
        user
          ? [
              {
                key: "logout",
                label: (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 font-medium"
                  >
                    Đăng xuất
                  </button>
                ),
              },
            ]
          : [
              {
                key: "login",
                label: (
                  <button
                    onClick={handleLogin}
                    className="w-full text-left text-blue-500 font-medium"
                  >
                    Đăng nhập
                  </button>
                ),
              },
            ]
      }
    />
  );

  // --- Banners ---
  const banners = [
    {
      title: (
        <>
          IPhone 14 <span className="font-bold">Pro</span>
        </>
      ),
      subtitle: "Đột phá công nghệ",
      description:
        "Được tạo ra để thay đổi mọi thứ để tốt hơn. Cho tất cả mọi người.",
      image:
        "https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764129/20ae4cc7d95ed194279d337796d951679b146d4a_tm2a7f.png",
      bg: "#211C24",
    },
    {
      title: (
        <>
          MacBook <span className="font-bold">Air M3</span>
        </>
      ),
      subtitle: "Sức mạnh vượt trội",
      description:
        "Hiệu năng cao, thời lượng pin ấn tượng, thiết kế sang trọng.",
      image:
        "https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764429/product1_qzzmds.png",
      bg: "#1E1B26",
    },
    {
      title: (
        <>
          Galaxy <span className="font-bold">S24 Ultra</span>
        </>
      ),
      subtitle: "Camera dẫn đầu xu hướng",
      description:
        "Chụp đêm ấn tượng, quay phim chuyên nghiệp, hiệu năng vượt trội.",
      image:
        "https://res.cloudinary.com/dcti4xpqa/image/upload/v1759764771/s24ultra_mk1ltq.png",
      bg: "#16202A",
    },
  ];

  const [current, setCurrent] = useState(0);

  // ✅ Auto đổi banner mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

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

          {/* ✅ Avatar + Menu động */}
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Avatar
              icon={<UserOutlined />}
              className="cursor-pointer hover:bg-gray-200 transition"
            />
          </Dropdown>
        </nav>
      </div>

      {/* Submenu */}
      <div className="bg-[#2E2E2E] text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {[{ icon: <MobileOutlined />, text: "Điện thoại" },
            { icon: <LaptopOutlined />, text: "Laptop" },
            { icon: <DesktopOutlined />, text: "Đồng hồ thông minh" },
            { icon: <CameraOutlined />, text: "Cameras" },
            { icon: <CustomerServiceOutlined />, text: "Tai nghe" },
            { icon: <ConsoleSqlOutlined />, text: "Gaming" }].map((item, index) => (
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

      {/* ✅ Banner Carousel */}
      <div
        className="relative overflow-hidden text-white transition-all duration-700"
        style={{ backgroundColor: banners[current].bg }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-20 px-6 transition-all duration-700">
          {/* Left Content */}
          <div key={current} className="max-w-lg transition-opacity duration-700">
            <p className="text-gray-400 mb-2">{banners[current].subtitle}</p>
            <h1 className="text-6xl font-light mb-4 leading-tight">
              {banners[current].title}
            </h1>
            <p className="text-gray-400 mb-6">{banners[current].description}</p>
            <button className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition">
              Mua ngay
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0">
            <img
              src={banners[current].image}
              alt="banner"
              className="w-[400px] object-contain h-80 transition-all duration-700"
            />
          </div>
        </div>

        {/* Nút chuyển tay */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
        >
          <LeftOutlined className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
        >
          <RightOutlined className="text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
