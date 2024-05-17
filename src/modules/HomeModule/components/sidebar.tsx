import { Button } from "@/components/ui/Button";
import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";

import { cn } from "@/lib/utils";
import { ResultCategory } from "@/services/category/categoryTypes";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  list: ResultCategory[] | [];
  currentValue: string;
  navigateToSection: (value: string) => void;
}

export function SidebarMenu(props: SidebarProps) {
  const { isLoading, list, className, currentValue, navigateToSection } = props;

  const handleNavigateToSection = (value: string) => {
    navigateToSection && navigateToSection(value);
  };

  if (isLoading || list.length === 0) return <>Cargando...</>;

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Categorías</h2>
          <div className="space-y-1">
            <Button
              variant={currentValue === GET_ALL_VALUE ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigateToSection(GET_ALL_VALUE)}
            >
              Todas
            </Button>
            {(list as ResultCategory[]).map((category) => (
              <Button
                key={category.id}
                variant={currentValue === category.name ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleNavigateToSection(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
