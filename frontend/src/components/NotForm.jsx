import React, { useState } from "react";
import { useNotContext } from "../hooks/useNotContext";
import { useAuthContext } from "../hooks/useAuthContext";
function NotForm() {
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [hata, setHata] = useState(null);
  const [bosAlanlar, setBosAlanlar] = useState([]);
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kullanici) {
      setHata("Lütfen giriş yapınız.");
      return;
    }
    const not = { baslik, aciklama };
    const response = await fetch(
      `https://mern-stack-todo-app-backend-qx9o.onrender.com/api/notlar`,
      {
        method: "POST",
        body: JSON.stringify(not),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${kullanici.token}`,
        },
      }
    );
    const json = await response.json();
    // console.log(json);
    if (!response.ok) {
      setHata(json.hata);
      setBosAlanlar(json.bosAlanlar);
    }
    if (response.ok) {
      setHata(null);
      setBaslik("");
      setAciklama("");
      setBosAlanlar([]);
      //console.log('yeni not eklendi',json);
      dispatch({ type: "NOT_OLUSTUR", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Yeni Bir Not Ekle</h3>
      <div className="create-group">
        <div>
          <label>Not Başlık:</label>
          <input
            className={bosAlanlar.includes("baslik") ? "error" : ""}
            type="text"
            onChange={(e) => setBaslik(e.target.value)}
            value={baslik}
          />
        </div>
        <div>
          <label>Not Açıklama:</label>
          <input
            type="text"
            onChange={(e) => setAciklama(e.target.value)}
            value={aciklama}
          />
        </div>
      </div>
      <button type="submit">EKLE</button>
      {hata && <div className="error">{hata}</div>}
    </form>
  );
}

export default NotForm;
