import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTitle } from "../../globaldata";
import axios from "axios";

function Create() {
  const data = useGetTitle()[0];
  const title = data?.title?.filter((t) => t !== "id");
  const nav = useNavigate();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const formRef = useRef(null);

  function create(e) {
    e.preventDefault();
    let payload = {};
    title.forEach((element, i) => {
      payload = { ...payload, [element]: e.target[i].value };
    });
    axios.post("http://127.0.0.1:8000/api/task", payload).then(nav("/"));
  }

  useEffect(() => {
    let getProjects = axios.get("http://127.0.0.1:8000/api/project");
    let getUsers = axios.get("http://127.0.0.1:8000/api/user");
    Promise.all([getProjects, getUsers])
      .then((res) => {
        setProjects(res[0].data);
        setUsers(res[1].data);
      })
      .catch((e) => {
        console.log("err: ", e);
      });
  }, []);
  // console.log("projects: ", projects);
  // console.log("users: ", users);

  console.log("title: ", title);
  return (
    <div className="text-2xl w-[800px]">
      <form onSubmit={create} ref={formRef}>
        {title.map((label, index) => {
          return (
            <div key={index} className="flex text-left p-2">
              <label
                htmlFor={label.replace(" ", "_")}
                className="capitalize w-1/3"
              >
                {label.replace("_id", "").replace("_", " ")}
              </label>
              {label === "description" ? (
                <textarea
                  name={label.replace(" ", "_")}
                  id={label.replace(" ", "_")}
                  rows={7}
                  className="border-2 rounded w-2/3 px-2"
                />
              ) : label === "project_id" ? (
                <select
                  className="border-2 rounded w-2/3 px-2"
                  name={label.replace(" ", "_")}
                  id={label.replace(" ", "_")}
                >
                  <option value={0}>-- Chọn project --</option>
                  {projects.map((p, i) => {
                    return (
                      <option key={i} value={p.id}>
                        {p.title}
                      </option>
                    );
                  })}
                </select>
              ) : label === "assigned_user_id" || label === "user_id" ? (
                <select
                  className="border-2 rounded w-2/3 px-2"
                  name={label.replace(" ", "_")}
                  id={label.replace(" ", "_")}
                >
                  <option value={0}>-- Chọn user --</option>
                  {users.map((u, i) => {
                    return (
                      <option key={i} value={u.id}>
                        {u.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  name={label.replace(" ", "_")}
                  id={label.replace(" ", "_")}
                  className="border-2 rounded w-2/3 px-2"
                />
              )}
            </div>
          );
        })}
        <div className="flex flex-row p-2 justify-end">
          <button
            type="submit"
            className="border-2 w-1/5 border-gray-300 rounded-full
                 p-2 bg-emerald-600 text-yellow-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
