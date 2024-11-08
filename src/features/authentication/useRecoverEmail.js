import { useMutation } from "@tanstack/react-query";
import { emailLink } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useRecoverEmail() {
  const { mutate: recover, isLoading } = useMutation({
    mutationFn: (email) => emailLink(email),
    onSuccess: () => {
      toast.success("A link has been send to your email address");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email is incorrect");
    },
  });
  return { recover, isLoading };
}
