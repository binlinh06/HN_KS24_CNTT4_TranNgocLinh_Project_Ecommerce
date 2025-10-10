import React from "react";
import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = window.confirm("Bạn có muốn đăng xuất không?");
    if (result) {
      localStorage.removeItem("user");
      message.success("Đăng xuất thành công!");
      navigate("/login", { replace: true }); 
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trang thống kê</h1>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
