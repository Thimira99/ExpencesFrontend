// SignUpPage.js
"use client";

import React from "react";
import axios from "axios";
import { signupAPI } from "@/utils/ApiRequests";
import { ToastService } from "@/services/toast";
import { SignUpForm } from "@/components";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = (data) => {
    axios
      .post(signupAPI, data)
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
