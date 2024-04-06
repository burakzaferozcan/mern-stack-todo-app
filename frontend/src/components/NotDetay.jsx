import React from "react";
import { useNotContext } from "../hooks/useNotContext";
import { MdDeleteForever } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import tr from "date-fns/locale/tr";
import { useAuthContext } from "../hooks/useAuthContext";

function NotDetay({ not }) {
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();

  const handleClick = async () => {
    if (!kullanici) {
      return;
    }
    const response = await fetch(
      `http://localhost:4001/api/notlar/${not._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${kullanici.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "NOT_SIL", payload: json });
    }
  };

  return (
    <div className="not-detay">
      <h4>{not.baslik}</h4>
      <p>{not.aciklama} </p>
      <p className="zaman">
        {formatDistanceToNow(new Date(not.createdAt), {
          locale: tr,
          addSuffix: true,
        })}
      </p>

      <span onClick={handleClick}>
        <MdDeleteForever />
      </span>
    </div>
  );
}

export default NotDetay;
