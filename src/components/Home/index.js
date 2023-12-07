import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Actions from "../Actions";
import Loading from "../Loading";
import PageLinks from "../PageLinks";
import { useGetTitle, actions } from "../../globaldata";

function Home() {
  const dispatch = useGetTitle()[1];
  const [tasks, setTasks] = useState({});
  const [isLoad, setIsLoad] = useState(true);
  const [title, setTitle] = useState([]);
  const page = window.location.search;
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/task/" + page)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((e) => {
        console.log("error:", e);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [page]);
  useEffect(() => {
    let tempTitle = [];
    if (tasks?.data !== undefined) {
      for (let i in tasks?.data[0]) {
        tempTitle = [...tempTitle, i];
      }
      setTitle(tempTitle);
      dispatch(actions.updateTitle(tempTitle));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  // console.log(tasks);

  return (
    <div className="container">
      {isLoad ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="bg-blue-700 w-24 mb-3">
            <Link to={"/create"} className="text-white">
              <div className="p-2">New task</div>
            </Link>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                {title.map((val, i) => {
                  return (
                    <th
                      key={i}
                      className="text-left border border-black px-2 items-start capitalize"
                    >
                      {val.replace('_id','').replace('_', ' ')}
                    </th>
                  );
                })}
                <th className="text-left border border-black px-2 items-start">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.data?.map((task, i) => {
                return (
                  <tr key={i}>
                    {Object.entries(task).map((val, i) => {
                      return (
                        <td
                          key={i}
                          className="text-left border border-black px-2 items-start"
                        >
                          {val[1]}
                        </td>
                      );
                    })}
                    <td className="text-left border border-black px-2 items-start">
                      {" "}
                      <Actions id={task.id} />{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <PageLinks links={tasks?.links} />
        </Fragment>
      )}
    </div>
  );
}

export default Home;
