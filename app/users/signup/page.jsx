// SignUpPage.js
"use client";

import React from "react";
import { signupAPI } from "@/utils/ApiRequests";
import { ToastService } from "@/services/toast";
import { SignUpForm } from "@/components";
import { useRouter } from "next/navigation";
import HttpService from "@/services/httpService";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = (data) => {
    HttpService.fetch("POST", signupAPI, data)
      .then((res) => {
        console.log(res.data);
        ToastService.success("Registered successfully.");
        router.push("/users/login");
      })
      .catch((err) => {
        if (err.response.data) {
          ToastService.error(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <form>
        <SignUpForm onSubmit={handleSubmit} />
      </form>
    </div>
  );
}
