import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset lỗi

    if (!email.trim() || !password) {
      setError("Vui lòng điền đầy đủ email và mật khẩu");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email không hợp lệ");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/users?email=${email}&password=${password}`
      );
      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "admin") {
          navigate("/dashboard");
        } else if(user.role !== "admin") {
          navigate("./home")        
        }else{
          setError("Sai email hoặc mật khẩu!");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-2 text-center text-2xl font-bold">Đăng nhập</h2>
        <p className="mb-6 text-center text-gray-500">
          Đăng nhập tài khoản để sử dụng hệ thống quản lý
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-blue-500"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-blue-500"
            />
          </div>

          {/* Checkbox & Quên mật khẩu */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Nhớ tài khoản</span>
            </label>
            <a href="#" className="text-blue-600 underline">
              Quên mật khẩu?
            </a>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
          >
            Đăng nhập
          </button>
        </form>

        {/* Chuyển qua đăng ký */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
