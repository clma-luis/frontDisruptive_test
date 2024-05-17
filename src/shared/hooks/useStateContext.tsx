import { useContext } from "react";
import { StateContext } from "../providers/StateProvider";

const useStateContext = () => {
  const { id, setId, newListNotes, setNewListNotes } = useContext(StateContext);

  return { id, setId, newListNotes, setNewListNotes };
};

export default useStateContext;
