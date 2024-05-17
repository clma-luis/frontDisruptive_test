import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { BtnActions } from "@/modules/HomeModule/containers/GenericContainer";

interface DataTablePaginationProps {
  hideFirstBox?: boolean;
  currentPage: number;
  totalPages: number;
  handleBtnActions: (action: BtnActions) => void;
  size: string;
  handleSize: (value: string) => void;
}

export const PaginationComponent = (props: DataTablePaginationProps) => {
  const { hideFirstBox = false, currentPage, totalPages, handleBtnActions, size, handleSize } = props;
 
  const disableLeftBtn = () => {
    if (currentPage === 1)  return true;
    
    return false;
  }

  const disableRightBtn = () => {
    if (currentPage === totalPages) return true;
   
    return false;
  }

  return (
    <div className={` flex items-center ${!hideFirstBox ?  "justify-between" : " justify-center lg:justify-end"}`}>
      {!hideFirstBox && <div className="flex-1 text-sm text-muted-foreground"> { `${0} of ${100} row(s) selected.`}</div>}
      <div className="grid grid-cols-3 items-center px-4">
        <div className="flex items-center justify-around">
          <p className="text-sm font-medium mr-2">Cantidad</p>
          <Select value={size} onValueChange={(value) => handleSize(value)}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">Pág. {currentPage} de {totalPages}</div>
        <div className="flex items-center space-x-2 justify-center">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => handleBtnActions(BtnActions.firtPage)} disabled={disableLeftBtn()}>
            <span className="sr-only">Ir a la primera página</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => handleBtnActions(BtnActions.prevPage)} disabled={disableLeftBtn()}>
            <span className="sr-only">Anterior página</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => handleBtnActions(BtnActions.nextPage)} disabled={disableRightBtn()}>
            <span className="sr-only">Siguiente página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => handleBtnActions(BtnActions.lastPage)} disabled={disableRightBtn()}>
            <span className="sr-only">Ir a la última página</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
