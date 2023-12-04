"use client";

import { ToastService } from "@/services/toast";
import { loginAPI } from "@/utils/ApiRequests";
import { jwtDecode } from "jwt-decode";
import { LoginForm } from "@/components";
import { useRouter } from "next/navigation";
import HttpService from "@/services/httpService";

export default function Login() {
  const router = useRouter();

  const handleLogin = (data) => {
    HttpService.fetch("POST", loginAPI, data)
      .then((res) => {
        ToastService.success("Login success.");

        // Get the token
        const token = res.data.token;

        // // Set token
        localStorage.setItem("user", JSON.stringify(jwtDecode(token)));
        localStorage.setItem("token", token);

        router.replace("/users/dashboard");
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
