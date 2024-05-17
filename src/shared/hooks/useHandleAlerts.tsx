import { useToast } from "@/components/ui/Toast/use-toast";

const useHandleAlerts = () => {
  const { toast } = useToast();

  const handleSuccessAlert = (title: string, description: string) => {
    setTimeout(() => {
      toast({
        title: title,
        description: `* ${description}`,
      });
    }, 300);
  };

  const handleErrorAlert = (title: string, description: string) => {
    setTimeout(() => {
      toast({
        title: title,
        description: `* ${description}`,
        variant: "destructive",
      });
    }, 300);
  };

  return { handleErrorAlert, handleSuccessAlert  };
};

export default useHandleAlerts;
