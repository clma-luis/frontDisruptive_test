"use client";
import useDialogModal from "@/shared/hooks/useDialogModal";
import { Dialog, DialogContent } from "../ui/Dialog";

export function DialogModal() {
  const { openDialogModal, setDialogModal, closeWithBtn } = useDialogModal();
  const { state, children } = openDialogModal;

  const handleOnChange = () => {
    if (closeWithBtn) return;
    setDialogModal((prev) => {
      return { ...prev, state: false };
    });
  };

  return (
    <>
      <Dialog open={state} onOpenChange={() => handleOnChange()}>
        <DialogContent className="sm:max-w-[500px]">{children}</DialogContent>
      </Dialog>
    </>
  );
}
