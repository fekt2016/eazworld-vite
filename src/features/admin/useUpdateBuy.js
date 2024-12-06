import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBuy as updateBuyApi } from "../../services/apibuy";
import { toast } from "react-hot-toast";

export function useUpdateBuy() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id, status) => updateBuyApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buy"] });
      toast.success("order completed");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
