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
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset lỗi
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: "",
    };

    // Validate cơ bản
    if (!firstName.trim()) newErrors.firstName = "Vui lòng nhập họ và tên đệm";
    else newErrors.firstName = ""
    if (!lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
    if (!email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Email không hợp lệ";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (password.length < 8)
      newErrors.password = "Mật khẩu phải ít nhất 8 ký tự";
    if (!confirmPassword)
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!agree) newErrors.agree = "Bạn phải đồng ý với điều khoản";

    // Nếu có lỗi, dừng lại
    if (Object.values(newErrors).some((msg) => msg !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/users?email=${email}`);
      if (res.data.length > 0) {
        setErrors((prev) => ({ ...prev, email: "Email này đã được đăng ký" }));
        return;
      }

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
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-2 text-center text-2xl font-bold">
          Đăng ký tài khoản
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Đăng ký tài khoản để sử dụng dịch vụ
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên đệm
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded border px-3 py-2 focus:outline-blue-500"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded border px-3 py-2 focus:outline-blue-500"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

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
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
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
          {errors.agree && (
            <p className="text-sm text-red-500">{errors.agree}</p>
          )}

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
