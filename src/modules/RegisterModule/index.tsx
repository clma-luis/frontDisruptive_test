"use client";
import SpinnerLoading from "@/components/SpinnerLoading";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast/use-toast";
import EyeIcon from "@/components/ui/icons/EyeIcon";
import EyeSlashIcon from "@/components/ui/icons/EyeSlashIcon";
import { createUserService } from "@/services/login";
import { RegisterServiceResponse } from "@/services/login/loginTypes";
import { CREADOR_ROLE, LECTOR_ROLE } from "@/shared/constants/roles";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import { URL_LOGIN } from "@/shared/constants/urlPaths";
import useHandleError from "@/shared/hooks/useHandleAlerts";
import { ErrorResponse } from "@/shared/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface RegisterFormProps {
  userName: string;
  email: string;
  password: string;
  role: string;
}

const initialState: RegisterFormProps = {
  userName: "",
  email: "",
  password: "",
  role: "",
};

const RegisterModule = () => {
  const [form, setForm] = useState<RegisterFormProps>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { handleErrorAlert } = useHandleError();
  const { toast } = useToast();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleOnSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      form.email = form.email.trim();
      const response = await createUserService(form);

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error al iniciar sesión";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }

      const avalibleResponse = response as RegisterServiceResponse;
      if(avalibleResponse){
        toast({
          title: "Registrado con exito",
        })
      }

      router.push(URL_LOGIN);
    } catch (error: any) {
      handleErrorAlert(errorMessages[INTERNAL_SERVER_ERROR_STATUS], genericErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleDisableButton = () => {
    return !form.email || !form.password;
  };
  return (
    <Card className=" mx-4">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center space-x-2, mb-8 ">
          <span className="self-center text-[50px] font-bold whitespace-nowrap dark:text-white">RESGISTRATE</span>
        </div>

        <CardTitle className="text-base flex justify-center">Registrate a la prueba técnica de DISRUPTIVE STUDIO</CardTitle>
        <CardDescription>Ingresa tus datos para crear una cuenta</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="userName">user name</Label>
          <Input value={form.userName} name="userName" id="userName" type="text" placeholder="user name" onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Correo</Label>
          <Input value={form.email} name="email" id="email" type="text" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            value={form.password}
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0  flex top-[27px] right-[-4px] items-center px-3 bg-transparent"
          >
            {showPassword ? <EyeIcon width={20} /> : <EyeSlashIcon width={20} />}
          </button>
        </div>
        <div className="w-full">
          <Label htmlFor="role">Rol</Label>
          <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={CREADOR_ROLE}>CREADOR DE CONTENIDO</SelectItem>
                <SelectItem value={LECTOR_ROLE}>LECTOR</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex justify-center">
          <Link href="/login">Ya tengo cuenta</Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleOnSubmit} className="w-full" disabled={isLoading || handleDisableButton()}>
          {isLoading ? <SpinnerLoading width="4" height="4" border="2" /> : "CREAR CUENTA"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterModule;
