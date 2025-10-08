import React from "react";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  TikTokFilled,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1e1e1e] to-[#2b2b2b] py-20 flex flex-row justify-between items-center text-center">
        <div className="flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dcti4xpqa/image/upload/v1759819052/jbl_jr_310bt_blue_1_gobm7n.png"
            alt="Iphone"
            className="w-[400px] object-contain h-80"
          />
        </div>
        <div>
          <h2 className="text-6xl font-bold mb-4 tracking-wide">
            Ưu đãi mùa hè
          </h2>
          <p className="text-[#787878] mb-8 text-base">
            Nhanh tay săn đón các sản phẩm chất lượng
          </p>
          <button className="border border-white px-8 py-2 rounded-md text-base font-medium hover:bg-white hover:text-black transition-all duration-300">
            Mua ngay
          </button>
        </div>
        <div className="flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dcti4xpqa/image/upload/v1759818772/image_7_yaxcvq.png"
            alt="Iphone"
            className="w-[400px] object-contain h-80"
          />
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 pt-16 px-6 md:px-0">
        {/* Cột 1 */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">▽ cyber</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Chúng tôi cung cấp các sản phẩm công nghệ, giúp khách hàng thỏa sức
            trải nghiệm dịch vụ tiện ích nhanh chóng và hiệu quả.
          </p>
        </div>

        {/* Cột 2 */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold mb-4 text-lg">Dịch vụ</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Chương trình khuyến mãi</li>
            <li>Gift cards</li>
            <li>Tín dụng & thanh toán</li>
            <li>Dịch vụ hợp đồng</li>
            <li>Ví điện tử</li>
            <li>Thanh toán</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold mb-4 text-lg">Hỗ trợ người mua</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Tìm kiếm đơn hàng</li>
            <li>Điều khoản giao hàng</li>
            <li>Chính sách bảo hành</li>
            <li>Câu hỏi thường gặp</li>
            <li>Chính sách & điều khoản</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto gap-10 pb-16 px-6 md:px-0">
        <div className="flex space-x-5 mt-6 text-white text-xl">
          <TwitterSquareFilled className="hover:text-blue-400 transition-colors duration-300 cursor-pointer" />
          <FacebookFilled className="hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
          <TikTokFilled className="hover:text-white transition-colors duration-300 cursor-pointer" />
          <InstagramFilled className="hover:text-pink-500 transition-colors duration-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
