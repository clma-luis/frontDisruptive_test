import { Button } from "@/components/ui/Button";
import Link from "next/link";

const notFound = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full items-center justify-center px-4 text-[18px] font-bold">
        <h1 className="font-custom text-center">¡Oh, no! Esta página no existe, vuelve a la página principal.</h1>
        <Link href="/">
          <Button className="mt-4">VOLVER</Button>
        </Link>
      </div>
    </>
  );
};

export default notFound;
