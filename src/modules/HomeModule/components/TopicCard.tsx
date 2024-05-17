"use client";
import { ImageComponent } from "@/components/ImageComponent";
import { SkeletonCard } from "@/components/Skeletons/SkeletonCard";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/ContextMenu/context-menu";

import { cn } from "@/lib/utils";
import { Topic } from "@/services/topic/topicTypes";

interface CardProductProps extends React.HTMLAttributes<HTMLDivElement> {
  hideBtnActions?: boolean;
  topic: Topic | {};
  state: {};
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  handleAction: (id: string) => void;
}

export const TopicCard = (carProductProps: CardProductProps) => {
  const {
    state,
    topic,
    aspectRatio = "portrait",
    hideBtnActions = false,
    width,
    height,
    handleAction,
    className,
    ...props
  } = carProductProps;
  const currentState = state as {id: string, state: boolean}
  const currentTopic = topic as Topic
  const handleCurrentAction = (id: string) => {
    handleAction && handleAction(id);
  };
  const currentSRC = currentTopic.image !== undefined ? currentTopic.image : "/no_available.jpg"
  
  if (currentState.id === currentTopic.id && currentState.state) return  <SkeletonCard />;
  

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md" onClick={() => handleCurrentAction(currentTopic.id)}>
            <ImageComponent
              className={cn(
                " h-auto w-full object-cover transition-all hover:scale-105 rounded-md",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
              src={currentSRC}
              name={currentTopic.title}
              width={width as number}
              height={height as number}
              verticalPosition="-16px"
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-bold leading-none">{currentTopic.title}</h3>
      </div>
    </div>
  );
};
