import { useContext } from "react";
import { SheetContext } from "../providers/SheetProvider";


const useSheet = () => {
  const { openSheet, setOpenSheet } = useContext(SheetContext);

  return { openSheet, setOpenSheet };
};

export default useSheet;
