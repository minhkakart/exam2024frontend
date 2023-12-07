import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { useGetTitle } from "../../globaldata";

function Modify() {
  const params = useParams();
  const navigator = useNavigate();

  const [taskData, setTaskData] = useState({});
  const [isLoad, setIsLoad] = useState(true);

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  const formRef = useRef(null);
  const label = useGetTitle()[0];

  console.log('users: ', users);

  useEffect(() => {
    let getTask = axios.get("http://localhost:8000/api/task/" + params.id, {
      params: {
        id: params.id,
      },
    });
    let getProjects = axios.get("http://127.0.0.1:8000/api/project");
    let getUsers = axios.get("http://127.0.0.1:8000/api/user");
    Promise.all([getProjects, getUsers, getTask])
      .then((res) => {
        setProjects(res[0].data);
        setUsers(res[1].data);
        setTaskData(res[2].data[0]);
      })
      .catch((e) => {
        console.log("err: ", e);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [params.id]);

  useEffect(() => {
    setTitle(taskData.title);
    setDescription(taskData.description);
    setDeadline(taskData.deadline);
    setStatus(taskData.status);
  }, [taskData]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const submit = (e) => {
    setIsLoad(true);
    e.preventDefault();
    let payload = {};

    console.log("title: ", label.title);
    label?.title?.forEach((element, i) => {
      payload = { ...payload, [element]: e.target[i].value };
      console.log('payload: ', payload);
    });
    axios
      .put("http://localhost:8000/api/task/" + params.id, payload)
      .finally(() => {
        setIsLoad(false);
        navigator("/");
      });
  };

  return (
    <div className="text-xl w-[800px]">
      {isLoad ? (
        <Loading />
      ) : (
        <form onSubmit={submit} ref={formRef}>
          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">Id</label>
            <input
              name="id"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
              value={taskData.id}
              disabled
            />
          </div>
          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">Title</label>
            <input
              name="title"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">Project</label>
            <select
              name="project_id"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
            >
              {projects.map((val, i) => {
                return (
                  <Fragment>
                    {taskData.project_id === val.title ? (
                      <option key={i} value={val.id} selected>
                        {val.title}
                      </option>
                    ) : (
                      <option key={i} value={val.id}>
                        {val.title}
                      </option>
                    )}
                  </Fragment>
                );
              })}
            </select>
          </div>
          {/* remove if its not nessessory */}
          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">Description</label>
            <textarea
              name="description"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
              rows={7}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">User</label>
            <select
              name="assigned_user_id"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
            >
              {users.map((val, i) => {
                return (
                  <Fragment>
                    {taskData.assigned_user_id === val.name ? (
                      <option key={i} value={val.id} selected>
                        {val.name}
                      </option>
                    ) : (
                      <option key={i} value={val.id}>
                        {val.name}
                      </option>
                    )}
                  </Fragment>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">Deadline</label>
            <input
              name="deadline"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>
          <div className="flex flex-row p-2">
            <label className="w-1/3 text-left">Status</label>
            <input
              name="status"
              className="border-2 w-2/3 border-gray-300 rounded-lg p-2"
              value={status}
              onChange={handleStatusChange}
            />
          </div>
          <div className="flex flex-row p-2 justify-end">
            <button
              type="submit"
              className="border-2 w-2/5 border-gray-300 rounded-full
                 p-2 bg-emerald-600 text-yellow-300"
            >
              Save changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Modify;
