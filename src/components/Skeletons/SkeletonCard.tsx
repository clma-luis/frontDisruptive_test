import { Skeleton } from "../ui/Skeleton";

export function SkeletonCard({length = 1}: {length?: number}) {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[200px] w-[100%] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[50%]" />
          </div>
        </div>
      ))}
    </>
  );
}
