import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVerify as apiCreateVerify } from "../../services/apiVerify";
import toast from "react-hot-toast";

export function useCreateVerify() {
  const queryClient = useQueryClient();

  const { mutate: createVerify, isLoading: isCreating } = useMutation({
    mutationFn: (newVerify) => apiCreateVerify(newVerify),
    onSuccess: () => {
      toast.success(
        "Your information has been received.Your information will be check and verified in the next 24hrs. Thank you."
      );
      queryClient.invalidateQueries({
        queryKey: ["photo_verification"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { createVerify, isCreating };
}
