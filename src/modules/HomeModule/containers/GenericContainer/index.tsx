"use client";
import { PaginationComponent } from "@/components/PaginationComponent";
import { SkeletonCard } from "@/components/Skeletons/SkeletonCard";
import { TopicPagination, getAllTopics, getOneTopic, getTopicsByCategoryId } from "@/services/topic";
import { OneTopicResponseService, Topic, TopicResponseService, TopicResult } from "@/services/topic/topicTypes";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import useDialogModal from "@/shared/hooks/useDialogModal";
import useHandleError from "@/shared/hooks/useHandleAlerts";
import { ErrorResponse } from "@/shared/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TopicCard } from "../../components/TopicCard";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";
import DialogTopicContent from "../../components/DialogTopicContent";

interface GenericContainerProps {
  category: string;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export enum BtnActions {
  firtPage = "firtPage",
  prevPage = "prevPage",
  nextPage = "nextPage",
  lastPage = "lastPage",
}

export interface ProductItem {
  data: any[];
  page: number;
  total: number;
  totalPages: number;
}
export const initialTopicItem: TopicResult = {
  data: [],
  page: 0,
  total: 0,
  totalPages: 0,
};

const GenericContainer = (props: GenericContainerProps) => {
  const { category, searchTerm } = props;
  const { setDialogModal } = useDialogModal();
  const { handleErrorAlert } = useHandleError();
  const [currentData, setCurrentData] = useState<TopicResult>(initialTopicItem);
  const [isLoading, setisLoading] = useState(false);
  const [topicState, setTopicState] = useState({
    id: "",
    state: false,
  })

  const [size, setSize] = useState<string>("10");
  const firtPage = "1";
  const currentTerm = searchTerm as string;

  useEffect(() => {
    if (category === GET_ALL_VALUE) {
      handleExecute({ page: firtPage, size, category });
      return;
    }
  }, [category]);

  useEffect(() => {
    if (category && currentTerm === "") {
      category.length >= 4 && getTopicsByCategory(category);
      return;
    }
  }, [category]);

  useEffect(() => {
    if (category === GET_ALL_VALUE) {
      handleExecute({ page: firtPage, size, category, term: currentTerm });
      return;
    }
  }, [currentTerm]);

  const handleSize = (value: string) => {
    if (!value) return;
    setSize(value);
    handleExecute({ page: firtPage, size: value, category, term: currentTerm });
  };

  const actionsBtns: Record<BtnActions, any> = {
    firtPage: 1,
    prevPage: currentData.page - 1,
    nextPage: currentData.page + 1,
    lastPage: currentData.totalPages,
  };

  const handleBtnActions = (action: BtnActions) => {
    const page = `${actionsBtns[action]}`;

    handleExecute({ page, size, category, term: currentTerm });
  };

  const handleExecute = async (pagination: TopicPagination) => {
    const { page, size, category, term } = pagination;
    setisLoading(true);
    try {
      const response = await getAllTopics({ page, size, category, term });

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error en la busqueda";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }
      const result = (response as TopicResponseService).result;
      setCurrentData(result);
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setisLoading(false);
    }
  };

  const getTopicsByCategory = async (id: string) => {
    setisLoading(true);
    try {
      const response = await getTopicsByCategoryId(id);
      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error en la busqueda";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }
      const result = (response as TopicResponseService).result;
      setCurrentData(result);
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setisLoading(false);
    }
  };

  const handleModal = async (id: string) => {
    setTopicState({id, state: true});
    try {
      const response = await getOneTopic(id);
      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error en la busqueda";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }
      const result = (response as OneTopicResponseService).result;
      setDialogModal((prev) => {
        return { ...prev, state: true, children: <DialogTopicContent data={result as Topic} /> };
      });
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setTopicState({ id: "", state: false });
    }
  };

  if (isLoading)
    return (
      <div className="w-full">
        <div className="w-full grid max-[480px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 justify-center px-4">
          <SkeletonCard length={10} />
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full ">
        <div className="w-full grid max-[480px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 justify-center px-4">
          {currentData.data.map((item, index) => (
            <TopicCard
              state={topicState}
              key={`${index}${item.id}`}
              topic={item}
              className="w-[100%]"
              aspectRatio="square"
              width={200}
              height={200}
              handleAction={handleModal}
            />
          ))}
        </div>
        <div className="mt-6">
          <PaginationComponent
            hideFirstBox
            currentPage={currentData.page}
            totalPages={currentData.totalPages}
            handleBtnActions={handleBtnActions}
            size={size}
            handleSize={handleSize}
          />
        </div>
      </div>
    </>
  );
};

export default GenericContainer;
