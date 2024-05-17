import React from 'react'
import ThumbsDownIcon from "../ui/icons/ThumbsDownIcon"
import { Button } from "../ui/Button"
import Link from "next/link"

const IdNotFound = () => {
  return (
    <div className="max-w-screen-xl flex flex-col mx-auto p-4">
    <div className="flex mt-2 mb-2 w-full flex-col justify-center items-center">
      <div className="mt-16 mb-16">
        <ThumbsDownIcon width={150} height={150} />
      </div>

      <h1 className=" text-[18px] font-semibold text-center">UPS! HA SUCEDIDO UN ERROR VUELVE A LA PAGINA PRINCIPAL</h1>
      <Link href="/">
        <Button className="mt-4">VOLVER</Button>
      </Link>
    </div>
  </div>
  )
}

export default IdNotFound