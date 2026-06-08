import { navbarStyles } from "../assets/dummyStyles";
import 'img1' from '../assets/logo.png';

const Navbar = ({user:propUser, onLogout}) => {
    return <header className={navbarStyles.header}>
        <div className={navbarStyles.container}></div>
  </header>;
};

export default Navbar;
