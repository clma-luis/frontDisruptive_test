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

  console.log({form})

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const hadleSelectValue = (e: string) => {
    setForm({ ...form, categories: `${form.categories}, ${e}` });
  };

  const currentCategories = form.categories.split(" ,")

  return (
    <Card className="w-full mt-6 border-none">
      <CardHeader>
        <CardTitle>Crea una nueva tematica</CardTitle>
        <CardDescription>Es tu momento de ser un pro!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
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
                  
                  {currentCategories.map((item)=> (
                    <div key={item}>{item}</div>
                  ))}
                </SelectContent>
              </Select>

              <input type="file" accept="image/*" onChange={() => {}} />
              <button onClick={() => {}}>Subir imagen</button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
