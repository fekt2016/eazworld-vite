import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: (email, password) => resetPasswordApi(email, password),
    onSuccess: () => {
      toast.success("Your password as been change successfully");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("In correct credential!!!");
    },
  });
  return { resetPassword, isLoading };
}
