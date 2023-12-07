import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import className from "classnames/bind";
import axios from "axios";

import styles from "./Actions.module.scss";

const cx = className.bind(styles);

function Actions({ id }) {
  const layer = useRef(null);
  const wrapRef = useRef(null);
  const cancelref = useRef(null);
  const submitRef = useRef(null);
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => {
    setConfirm(true);
  };
  const handleCancel = () => {
    setConfirm(false);
  };
  const handleSubmit = () => {
    console.log(id);
    axios
      .delete("http://127.0.0.1:8000/api/task/" + id)
      .then(() => {
        window.location.reload(false);
      })
      .finally(() => {
        setConfirm(false);
      });
  };
  const removeEvent = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const layerr = layer.current;
    const wrap = wrapRef.current;
    const ccbtn = cancelref.current;
    const submit = submitRef.current;
    submit?.addEventListener("click", handleSubmit);
    layerr?.addEventListener("click", handleCancel);
    ccbtn?.addEventListener("click", handleCancel);
    wrap?.addEventListener("click", removeEvent);
    return () => {
      submit?.removeEventListener("click", handleSubmit);
      layerr?.removeEventListener("click", handleCancel);
      ccbtn?.removeEventListener("click", handleCancel);
      wrap?.removeEventListener("click", removeEvent);
    };
  });

  return (
    <div className="flex justify-between text-blue-700">
      <Link to={"/task/" + id} className="text-blue-700">
        <FontAwesomeIcon icon={faEye} />
      </Link>
      <Link to={"/task/modify/" + id} className="text-blue-700">
        <FontAwesomeIcon icon={faPenToSquare} />
      </Link>
      <button onClick={handleConfirm}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      {confirm && (
        <div className="fixed flex inset-0 bg-[rgba(0,0,0,0.3)] justify-center items-center" ref={layer}>
          <div className="bg-orange-200 p-4 rounded-xl" ref={wrapRef}>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Confirm to delete?</h2>
            <div  className="flex justify-between text-white" >
              <button ref={cancelref} className="bg-sky-700 hover:bg-sky-500 w-[45%] rounded" >Cancel</button>
              <button ref={submitRef} className="bg-rose-700 hover:bg-rose-500 w-[45%] rounded" >Ok</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Actions;