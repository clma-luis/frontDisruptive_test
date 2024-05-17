"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { DrawerMenuContent } from "./components/DrawerMenuContent";
import { SidebarMenu } from "./components/sidebar";
import GenericContainer from "./containers/GenericContainer";

import { useDebounce } from "@/shared/hooks/useDebounse";
import useSheet from "@/shared/hooks/useSheet";
import { Anchor } from "@/shared/interfaces/general";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";
import { MIN_THREE_LETTERS_REGEX } from "@/shared/constants/regex";
import { getAllCategories } from "@/services/category";
import { ErrorResponse } from "@/shared/interfaces";
import useHandleError from "@/shared/hooks/useHandleAlerts";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import { CategoriesResponseService, ResultCategory } from "@/services/category/categoryTypes";
import useDialogModal from "@/shared/hooks/useDialogModal";
import { CreateTopicForm } from "./components/CreateTopicForm";

const HomeModule = () => {
  const { setDialogModal } = useDialogModal();
  const isDesktop = useMediaQuery("( max-width: 1023px )");
  const { setOpenSheet } = useSheet();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [currentCategory, setCurrentCategory] = useState(GET_ALL_VALUE);
  const [isLoading, setisLoading] = useState(false);
  const [list, setList] = useState<ResultCategory[] | []>([]);
  const { handleErrorAlert } = useHandleError();

  useEffect(() => {
    handleSearchProduct();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getAllCategoriesService();
  }, []);

  const handleSearchProduct = () => {
    const currentInputValue = debouncedSearchTerm;
    if (MIN_THREE_LETTERS_REGEX.test(currentInputValue)) {
      setSearchTerm(debouncedSearchTerm);
      setCurrentCategory(GET_ALL_VALUE);
    } else if (currentInputValue === "" && currentCategory === GET_ALL_VALUE) {
      setSearchTerm("");
    }
  };

  const getAllCategoriesService = async () => {
    setisLoading(true);
    try {
      const response = await getAllCategories();

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error al iniciar sesión";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }
      const result = (response as CategoriesResponseService).result;
      setList(result);
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setisLoading(false);
    }
  };

  const handleResponsiveHomeMenu = () => {
    return !currentCategory && isDesktop;
  };

  const navigateToSection = (value: string) => {
    setSearchTerm("");
    setCurrentCategory(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const openDialogToCreateTopin = () => {
    setDialogModal((prev) => {
      return { ...prev, state: true, children: <CreateTopicForm categoryList={list}/> };
    });
  }

  return (
    <div
      className={
        handleResponsiveHomeMenu()
          ? ""
          : "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-4 max-[1023px]:border-none border rounded mb-6"
      }
    >
      <div className="w-full">
        <div className="bg-background">
          <div className={handleResponsiveHomeMenu() ? "" : "grid lg:grid-cols-5"}>
            <SidebarMenu
              className="hidden lg:block"
              isLoading={isLoading}
              list={list}
              currentValue={currentCategory}
              navigateToSection={navigateToSection}
            />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full pt-6 pb-4 lg:px-8">
                <div className=" px-4 space-center lg:space-between flex flex-col lg:flex-row items-center">
                  <div className="w-full flex  justify-between items-center">
                    <div className="block lg:hidden">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOpenSheet({
                            anchor: Anchor.right,
                            children: (
                              <DrawerMenuContent
                                isLoading={isLoading}
                                list={list}
                                currentValue={currentCategory}
                                navigateToSection={navigateToSection}
                              />
                            ),
                          });
                        }}
                      >
                        Opciones
                      </Button>
                    </div>
                  </div>

                  <div className="hidden lg:flex px-4 w-full  justify-center lg:justify-end mt-4 lg:mt-0 ml-auto ">
                    <Button onClick={() => openDialogToCreateTopin()}>
                      <PlusCircledIcon className="mr-2 h-4 w-4" />
                      Crear una temática
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="w-full flex justify-start p-4">
                    <Input
                      value={searchTerm}
                      placeholder="Buscar..."
                      className="h-10 w-full lg:w-[250px]"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <GenericContainer category={currentCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModule;
