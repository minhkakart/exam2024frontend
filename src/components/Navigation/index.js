import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import styles from "./Nav.module.scss";

const cx = classnames.bind(styles);

function Navigation() {
  return (
    <div className={cx("container")}>
      <Link to={"/"} className={cx("link")}>
        <FontAwesomeIcon icon={faHouse} size="lg" />
      </Link>
    </div>
  );
}

export default Navigation;
