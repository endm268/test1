"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/shared/LoginForm";

const Login = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/logoMFZ.svg"
          alt="MFZ lofo"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
