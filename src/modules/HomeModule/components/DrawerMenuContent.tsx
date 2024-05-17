"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { ResultCategory } from "@/services/category/categoryTypes";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";
import { USER_VARIABLE } from "@/shared/constants/localStorageVariables";
import { ALLOW_ROLES_TO_CREATE } from "@/shared/constants/roles";
import useDialogModal from "@/shared/hooks/useDialogModal";
import useSheet from "@/shared/hooks/useSheet";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { CreateTopicForm } from "./CreateTopicForm";

interface SheetMenuChildProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  list: ResultCategory[] | [];
  currentValue: string;
  navigateToSection: (value: string) => void;
}

export const DrawerMenuContent = (props: SheetMenuChildProps) => {
  const { setDialogModal } = useDialogModal();
  const { isLoading, list, currentValue, navigateToSection } = props;
  const { setOpenSheet } = useSheet();
  const userData = getLocalStorage(USER_VARIABLE);

  const handleValidateUser = () => {
    return ALLOW_ROLES_TO_CREATE.includes(userData?.role);
  };

  const handleOnClickAllProducts = () => {
    navigateToSection(GET_ALL_VALUE);
    setOpenSheet((prev) => {
      return { ...prev, anchor: "" };
    });
  };

  const handleClickRestProduct = (value: string) => {
    navigateToSection(value);
    setOpenSheet((prev) => {
      return { ...prev, anchor: "" };
    });
  };

  const openDialogToCreateTopin = () => {
    if(!handleValidateUser()) return
    setDialogModal((prev) => {
      return { ...prev, state: true, children: <CreateTopicForm categoryList={list} />  };
    });
  };

  if (isLoading || list.length === 0) return <>Cargando...</>;

  return (
    <div className="h-full relative">
      <SheetHeader>
        <SheetTitle>Opciones del Menú</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      <div>
        <Button
          variant={currentValue === GET_ALL_VALUE ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={handleOnClickAllProducts}
        >
          Todas
        </Button>
        {(list as ResultCategory[]).map((category) => (
          <Button
            key={category.id}
            variant={currentValue === category.name ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleClickRestProduct(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      {handleValidateUser() && (
        <Button className="absolute bottom-0 w-full" onClick={() => openDialogToCreateTopin()}>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Crear una temática
        </Button>
      )}
    </div>
  );
};
