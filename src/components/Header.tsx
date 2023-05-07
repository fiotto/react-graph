import "./Header.css";

import { APP_TITLE } from "../consts";

const Header = () => {
  return (
    <header>
      <div className="title">{APP_TITLE}</div>
    </header>
  );
};

export default Header;
