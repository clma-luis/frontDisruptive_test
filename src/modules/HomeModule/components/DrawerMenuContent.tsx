"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { ResultCategory } from "@/services/category/categoryTypes";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";
import useSheet from "@/shared/hooks/useSheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";

interface SheetMenuChildProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  list: ResultCategory[] | [];
  currentValue: string;
  navigateToSection: (value: string) => void;
}

export const DrawerMenuContent = (props: SheetMenuChildProps) => {
  const { isLoading, list, currentValue, navigateToSection } = props;
  const { setOpenSheet } = useSheet();

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
      <Button className="absolute bottom-0 w-full">
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Crear una temática
      </Button>
    </div>
  );
};
