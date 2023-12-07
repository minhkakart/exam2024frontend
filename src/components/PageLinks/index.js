// import classname from "classnames/bind";
// import styles from "./PageLinks.module.scss";
import { NavLink } from "react-router-dom";
import { decode } from "he";

// const he = require('he')

function PageLinks({ links }) {
  const disable = (e) => {
    e.preventDefault();
  };
  // console.log(links);
  return (
    <div className="mt-3">
      {links?.map((val, i) => {
        return (
          <NavLink
            key={i}
            to={"/" + val.url !== "" ? "?" + val.url?.split("?")[1] : "#"}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset 
              ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
              ${val.active && "text-white bg-teal-400 hover:bg-teal-500"}
              ${val.url || "text-zinc-500 cursor-default hover:bg-transparent"}
            `}
            onClick={val.url === null ? disable : ""}
          >
            {decode(val.label)}
          </NavLink>
        );
      })}
    </div>
  );
}

export default PageLinks;
