import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [hata, setHata] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (email, parola) => {
    setYukleniyor(true);
    setHata(null);
    const response = await fetch("http://localhost:4001/api/kullanici/signup", {
      method: "POST",
      body: JSON.stringify({ email, parola }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setYukleniyor(false);
      setHata(json.hata);
    }
    if (response.ok) {
      localStorage.setItem("kullanici", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setYukleniyor(false);
    }
  };
  return { signup, hata, yukleniyor };
};
