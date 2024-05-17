"use client";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";

import { Topic } from "@/services/topic/topicTypes";

interface DialogProductContentProps {
  data: Topic;
}

const DialogTopicContent = (props: DialogProductContentProps) => {
  const { data } = props;
  const { id, categories, title, ...rest } = data;
  const currentData: Record<string, string> = rest;
  const keys = Object.keys(rest);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <DialogHeader>
        <DialogTitle className="text-center">{data.title}</DialogTitle>
        <DialogDescription className="text-start">Aqui puedes ver la informacion del la tematica {data.title}</DialogDescription>
      </DialogHeader>
      <h3 className="mt-4 mb-4">Dale click a cualquiera de las siguientes categorias:</h3>
      <div className="mt-4">
        <ul>
          {keys.map((item) => (
            <li key={item}>
              <a href={currentData[item]} target="_blank" rel={item}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DialogTopicContent;
