import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [hata, setHata] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, parola) => {
    setYukleniyor(true);
    setHata(null);
    const response = await fetch(
      "https://mern-stack-todo-app-backend.vercel.app/api/kullanici/login",
      {
        method: "POST",
        body: JSON.stringify({ email, parola }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("kullanici", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setYukleniyor(false);
    }
  };
  return { login, hata, yukleniyor };
};
