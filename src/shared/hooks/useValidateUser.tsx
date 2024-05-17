"use client";
import SpinnerLoading from "@/components/SpinnerLoading";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { USER_VARIABLE } from "../constants/localStorageVariables";
import { URL_HOME, URL_LOGIN, URL_REGISTER } from "../constants/urlPaths";
import { getLocalStorage } from "../utils/localStorageUtils";

const ValidateUser = ({ children }: { children: React.ReactNode }) => {
  const [isLaoding, setIsLaoding] = useState(true);
  const user = getLocalStorage(USER_VARIABLE);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    handleIntial();
  }, []);

  const handleIntial = () => {
    if (user) {
      router.push(URL_HOME);
      setIsLaoding(false);
    } else if (pathname === URL_LOGIN || (pathname === URL_REGISTER && !user)) {
      setIsLaoding(false);
    }
  };

  if (isLaoding)
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <SpinnerLoading />
      </div>
    );

  return <>{children}</>;
};

export default ValidateUser;
