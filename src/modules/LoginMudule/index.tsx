"use client";
import SpinnerLoading from "@/components/SpinnerLoading";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import EyeIcon from "@/components/ui/icons/EyeIcon";
import EyeSlashIcon from "@/components/ui/icons/EyeSlashIcon";
import { loginService } from "@/services/login";
import { LoginServiceResponse } from "@/services/login/loginTypes";
import { TOKEN, USER_VARIABLE } from "@/shared/constants/localStorageVariables";
import { INTERNAL_SERVER_ERROR_STATUS, errorMessages, genericErrorMessage } from "@/shared/constants/statusMessages";
import { URL_HOME } from "@/shared/constants/urlPaths";
import useHandleError from "@/shared/hooks/useHandleAlerts";
import { ErrorResponse } from "@/shared/interfaces";
import { setLocalStorage } from "@/shared/utils/localStorageUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

type CardProps = React.ComponentProps<typeof Card>;

interface LoginFormProps {
  email: string;
  password: string;
}

const initialState: LoginFormProps = {
  email: "",
  password: "",
};

const LoginModule = ({ className, ...props }: CardProps) => {
  const [form, setForm] = useState<LoginFormProps>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { handleErrorAlert } = useHandleError();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleOnSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      form.email = form.email.trim();
      const response = await loginService(form);

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        const message = errorResponse.message || errorResponse.errors[0].message || "Error al iniciar sesión";
        handleErrorAlert(errorMessages[errorResponse.statusCode], message);
        return;
      }

      const avalibleResponse = response as LoginServiceResponse;
      setLocalStorage(TOKEN, avalibleResponse.token);
      const { id, name, email, role } = avalibleResponse.user;
      setLocalStorage(USER_VARIABLE, { id, name, email, role });
      let path = URL_HOME;

      router.push(path);
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
          <span className="self-center text-[50px] font-bold whitespace-nowrap dark:text-white">DISRUPTIVE STUDIO</span>
        </div>

        <CardTitle className="text-base flex justify-center">Bienvenid@ a la prueba técnica de DISRUPTIVE STUDIO</CardTitle>
        <CardDescription>Ingresa tu correo y contraseña para continuar</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
        <div className="w-full flex justify-center">
          <Link href="/register">Crear una cuenta</Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleOnSubmit} className="w-full" disabled={isLoading || handleDisableButton()}>
          {isLoading ? <SpinnerLoading width="4" height="4" border="2" /> : " INGRESAR"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginModule;
