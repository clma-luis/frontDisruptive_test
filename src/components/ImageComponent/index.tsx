import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import ImageIcon from "../ui/icons/ImageIcon";


interface ImageComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
  width: number;
  height: number;
  verticalPosition?: string;
}

export const ImageComponent = (props: ImageComponentProps) => {
  const { name, src, height = 300, width = 400, className, verticalPosition = "0px" } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={`w-full relative `} style={{ width: `${width}px`, height: `${height}px` }}>
      {isLoading && (
        <div className={`absolute top-0 w-full  flex justify-center my-4`} style={{ top: verticalPosition, height: `${height}px` }}>
          <Skeleton className={` w-full h-auto `} />
        </div>
      )}
      {(error || !src) && (
        <div
          className={`rounded-md bg-slate-50 dark:bg-card absolute top-0 w-full  flex justify-center items-center my-4`}
          style={{ top: verticalPosition, height: `${height}px` }}
        >
          <ImageIcon width={80} height={80} />
        </div>
      )}
      <div className="w-full h-auto flex justify-center my-4">
        <Image
         src={src}
          alt={name}
          width={500}
          height={500}
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          priority
        />
      </div>
    </div>
  );
};
