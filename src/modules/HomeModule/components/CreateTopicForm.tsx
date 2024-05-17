"use client";
import * as React from "react";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ResultCategory } from "@/services/category/categoryTypes";

interface Form {
  title: string;
  categories: string;
  videoYoutube?: string;
  image?: string;
  pdf?: string;
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
  console.log({ form });

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const hadleSelectValue = (e: string) => {
    setForm({ ...form, categories: `${form.categories.replaceAll(`${e},`, "")}, ${e}` });
  };

  const adapterCategories = () => {
    const categories = categoryList.filter((item) => form.categories.includes(item.id));
    return categories;
  };

  const handleDeleteCategory = (e: string) => {
    const newCategories = form.categories.replaceAll(`${e}, `, "").replace(e, "");
    setForm({ ...form, categories: newCategories });
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
                        onChange={handleOnchange}
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
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Aceptar</Button>
      </CardFooter>
    </Card>
  );
}
