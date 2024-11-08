import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSell as deleteSellApi } from "../../services/apiSell";
import toast from "react-hot-toast";

export function useDeleteSell() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteSell } = useMutation({
    mutationFn: deleteSellApi,
    onSuccess: () => {
      toast.success("Order successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["sell"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteSell };
}
