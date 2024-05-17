"use client";
import LoginModule from "@/modules/LoginMudule";
import ValidateUser from "@/shared/hooks/useValidateUser";
import React from "react";

const LoginPage = () => {
  return (
    <ValidateUser>
      <main className="flex h-screen w-full items-center justify-center">
        <LoginModule />
      </main>
    </ValidateUser>
  );
};

export default LoginPage;
