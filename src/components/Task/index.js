import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";


function Task() {
  const params = useParams();
  const [taskData, setTaskData] = useState({});
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/task/" + params.id, {
        params: {
          id: params.id,
        },
      })
      .then((res) => {
        setTaskData(res.data[0]);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [params.id]);
  return (
    <div className="text-xl w-[800px] capitalize">
      {isLoad ? (
        <Loading />
      ) : (
        <div>
          {Object.entries(taskData).map((val, i) => {
            return (
              <div key={i} className="flex flex-row p-2">
                <label className="w-1/3 text-left">{val[0].replace('_id','').replace('_', ' ')}</label>
                {val[0] === "description" ? (
                  <textarea
                    className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
                    disabled
                    rows={7}
                    value={val[1]}
                  />
                ) : (
                  <input className="border-2 w-2/3 border-gray-300 rounded-lg p-2" value={val[1]} disabled />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Task;
