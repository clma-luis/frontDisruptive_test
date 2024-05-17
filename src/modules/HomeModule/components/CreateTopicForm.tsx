"use client";
import * as React from "react";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ResultCategory } from "@/services/category/categoryTypes";
import { OneTopicResponseService, Topic } from "@/services/topic/topicTypes";
import { createTopic } from "@/services/topic";
import useHandleError from "@/shared/hooks/useHandleAlerts";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import { ErrorResponse } from "@/shared/interfaces";

interface Form {
  title: string;
  categories: string;
  videoYoutube?: string;
  image?: File;
  pdf?: File;
}

const initialForm: Form = {
  title: "",
  categories: "",
};

interface CreateTopicFormProps {
  categoryList: ResultCategory[];
}

export function CreateTopicForm(props: CreateTopicFormProps) {
  const { categoryList } = props;
  const [form, setForm] = React.useState(initialForm);
  const { handleErrorAlert } = useHandleError();
  const [isLoading, setisLoading] = React.useState(false);

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const hadleSelectValue = (e: string) => {
    const currentvalue = form.categories.length === 0 ? e : `, ${e}`;
    setForm((prev) => ({ ...prev, categories: `${prev.categories.replaceAll(`${e},`, "")}${currentvalue}` }));
  };

  const adapterCategories = () => {
    const categories = categoryList.filter((item) => form.categories.includes(item.id));
    return categories;
  };

  const handleDeleteCategory = (e: string) => {
    const newCategories = form.categories.replaceAll(`${e}, `, "").replace(e, "");
    setForm((prev) => ({ ...prev, categories: newCategories }));
  };

  const handleOnchangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, [name]: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    const currentForm: Record<string, any> = form;
   
    const formData = new FormData();
    formData.append('title', "asfasdf"); // Ajusta según el nombre de tus campos
    form.categories && formData.append('categories', form.categories); // Si 'categories' es un array
    form.pdf && formData.append('pdf', form.pdf); // Si 'pdf' es un archivo File
    form.image && formData.append('image', form.image);

    try {
      setisLoading(true);
      const response = await createTopic(formData);

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error al iniciar sesión";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }
      const result = (response as OneTopicResponseService).result;
  
    } catch (error) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Card className="w-full mt-6 border-none">
      <CardHeader>
        <CardTitle>Crea una nueva tematica</CardTitle>
        <CardDescription>Es tu momento de ser un pro!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Titulo</Label>
            <Input name="title" id="name" placeholder="Titulo de la tematica" onChange={handleOnchange} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Categorias</Label>
            <Select onValueChange={(e) => hadleSelectValue(e)}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Selecciona una opcion" />
              </SelectTrigger>
              <SelectContent position="popper">
                {categoryList.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {adapterCategories().map((item) => (
              <div key={item.id}>
                {item.name !== "videoYoutube" ? (
                  <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="framework">{item.name}</Label>
                    <div className="flex w-full items-center mt-2 mb-2">
                      <Input
                        name={item.name}
                        placeholder={`Ingresa un ${item.name}`}
                        type="file"
                        accept={item.name === "image" ? "image/*" : "application/pdf"}
                        onChange={handleOnchangeFiles}
                      />
                      <Button className="ml-1" variant="outline" onClick={() => handleDeleteCategory(item.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">{item.name}</Label>
                    <div className="flex w-full items-center mt-2 mb-2">
                      <Input name={item.name} placeholder={`Ingresa un ${item.name}`} onChange={handleOnchange} />{" "}
                      <Button className="ml-1" variant="outline" onClick={() => handleDeleteCategory(item.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit}>Aceptar</Button>
      </CardFooter>
    </Card>
  );
}
