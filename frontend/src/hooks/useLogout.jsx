import { useAuthContext } from "./useAuthContext";
import { useNotContext } from "./useNotContext";
export const useLoguot = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: notDisparch } = useNotContext();
  const logout = () => {
    localStorage.removeItem("kullanici");
    notDisparch({ type: "LOGOUT", payload: null });
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
