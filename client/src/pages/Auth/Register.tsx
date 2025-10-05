import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate cơ bản
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải ít nhất 6 ký tự");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!agree) {
      setError("Bạn phải đồng ý với điều khoản");
      return;
    }

    try {
      // Kiểm tra email đã tồn tại chưa
      const res = await axios.get(`http://localhost:8080/users?email=${email}`);
      if (res.data.length > 0) {
        setError("Email này đã được đăng ký");
        return;
      }

      // Tạo user mới
      await axios.post("http://localhost:8080/users", {
        firstName,
        lastName,
        email,
        password,
        role: "user",
      });

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-2 text-center text-2xl font-bold">Đăng ký tài khoản</h2>
        <p className="mb-6 text-center text-gray-500">Đăng ký tài khoản để sử dụng dịch vụ</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên đệm</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded border px-3 py-2 focus:outline-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded border px-3 py-2 focus:outline-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-blue-500"
            />
          </div>

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4"
            />
            <span>
              Bạn đồng ý với{" "}
              <a href="#" className="text-blue-600 underline">
                chính sách và điều khoản
              </a>
            </span>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
          >
            Đăng ký
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
