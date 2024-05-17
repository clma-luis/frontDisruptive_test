import React from "react";
import SpinnerLoading from "../SpinnerLoading";

interface LoadingComponentProps {
  title: string;
}

const LoadingComponent = (props: LoadingComponentProps) => {
  const { title } = props;
  return (
    <div className="max-w-screen-xl flex flex-col mx-auto p-4">
      <div className="mt-2 mb-2 w-full flex flex-col justify-center items-center">
        <h1 className=" text-[18px] font-semibold text-center">{title}</h1>
      </div>
      <div className="mt-2 mb-2 h-32 w-full flex flex-col justify-center items-center">
        <SpinnerLoading />
      </div>
    </div>
  );
};

export default LoadingComponent;
