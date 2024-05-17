"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "../ui/Button";
import LogoutIcon from "../ui/icons/LogoutIcon";
import UserCircleIcon from "../ui/icons/UserCircleIcon";
import { getLocalStorage, removeLocalStorage } from "@/shared/utils/localStorageUtils";
import { THEME, USER_VARIABLE } from "@/shared/constants/localStorageVariables";
import { URL_LOGIN } from "@/shared/constants/urlPaths";
import { useRouter } from "next/navigation";

enum ModeType {
  LIGHT = "Light",
  DARK = "Dark",
}

export function NavbarMenu() {
  const [modeType, setModeType] = React.useState(ModeType.LIGHT);
  const { setTheme } = useTheme();
  const router = useRouter();
  const currentTheme = getLocalStorage(THEME);

  React.useEffect(() => {
    if(currentTheme){ 
      setModeType(ModeType[currentTheme.toUpperCase() as keyof typeof ModeType]);
      setTheme(currentTheme)
    }
  }, [])
  

  const handleModeType = () => {
    setModeType((prev) => (prev === ModeType.LIGHT ? ModeType.DARK : ModeType.LIGHT));
    setTheme(modeType === ModeType.LIGHT ? "dark" : "light");
  };

  const handleLogout = () => {
    removeLocalStorage(USER_VARIABLE);
    router.push(URL_LOGIN);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-10 border-none bg-transparent hover:bg-transparent focus:outline-none focus:border-transparent"
        >
          <UserCircleIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-custom text-icon dark:text-icon" onClick={handleModeType}>
          {modeType === ModeType.LIGHT ? (
            <SunIcon width={20} className="text-icon dark:text-icon" />
          ) : (
            <MoonIcon width={20} className="text-icon dark:text-icon" />
          )}
          &nbsp; {modeType} Mode
        </DropdownMenuItem>
        <DropdownMenuItem className="font-custom text-icon dark:text-icon" onClick={handleLogout}>
          <LogoutIcon /> &nbsp; Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
