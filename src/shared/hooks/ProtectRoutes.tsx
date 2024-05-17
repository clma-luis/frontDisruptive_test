"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { USER_VARIABLE } from "../constants/localStorageVariables";
import { getLocalStorage } from "../utils/localStorageUtils";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = getLocalStorage(USER_VARIABLE);
  const pathname = usePathname();

  useEffect(() => {
    handleProtectRoute();
  }, [pathname]);

  const handleProtectRoute = () => {
 /*    if (!user) {
      router.push(URL_LOGIN);
      return;
    }

    if(user.role === STUDENT_ROLE) {
      router.push(URL_STUDENT_DETAILS);
      return
    }

    if(pathname === URL_STUDENT_DETAILS && user.role !== STUDENT_ROLE) {
      router.push(URL_HOME);
      return
    }

    if (pathname === URL_LOGIN && user) {
      router.push(URL_HOME);
      return;
    }
 */
    
  };

  return children;
};

export default ProtectRoute;
