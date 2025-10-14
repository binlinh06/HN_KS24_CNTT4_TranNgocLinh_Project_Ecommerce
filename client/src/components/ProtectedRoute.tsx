import React, { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({
  children,
  roleRequired,
}: {
  children: JSX.Element;
  roleRequired?: string;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setIsChecking(false);
        setIsAuthorized(false);
        return;
      }

      const user = JSON.parse(userData);

      try {
        const res = await axios.get(`http://localhost:8080/users/${user.id}`);

        if (res.status === 200) {
          if (roleRequired && res.data.role !== roleRequired) {
            setIsAuthorized(false);
          } else {
            setIsAuthorized(true);
          }
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, [roleRequired]);

  if (isChecking) return <p className="text-center mt-10">Đang kiểm tra đăng nhập...</p>;

  return isAuthorized ? children : <Navigate to="/login" />;
}
