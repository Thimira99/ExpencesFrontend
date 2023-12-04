"use client";

import { ToastService } from "@/services/toast";
import { loginAPI } from "@/utils/ApiRequests";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { LoginForm } from "@/components";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = (data) => {
    axios
      .post(loginAPI, data)
      .then((res) => {
        ToastService.success("Login success.");

        // Get the token
        const token = res.data.token;

        // // Set token
        localStorage.setItem("user", JSON.stringify(jwtDecode(token)));
        localStorage.setItem("token", token);
        router.push("/users/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          ToastService.error(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <form>
        <LoginForm onSubmit={handleLogin} />
      </form>
    </div>
  );
}
