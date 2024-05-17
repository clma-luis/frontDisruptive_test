"use client";
import { Sheet, SheetContent } from "../ui/Sheet";

import useSheet from "@/shared/hooks/useSheet";
import { Anchor } from "@/shared/interfaces/general";
import { useEffect } from "react";

export function SheetComponent() {
  const { openSheet, setOpenSheet } = useSheet();
  const { anchor } = openSheet;

  useEffect(() => {
    if (!openSheet.children) setOpenSheet({ ...openSheet, anchor: "" });
  }, [openSheet.children]);

  return (
    <Sheet open={!!anchor} onOpenChange={() => setOpenSheet({ ...openSheet, anchor: "" })}>
      <SheetContent side={!!anchor ? anchor : Anchor.right} >
        {openSheet.children}
      </SheetContent>
    </Sheet>
    
  );
}
