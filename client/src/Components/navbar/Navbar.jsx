import "./navbar.css"
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
    const history = useHistory();


    function logoff() {
        localStorage.removeItem('token');
        history.push('/login');
    }


    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <span className="logo">InstaJacked</span>
            </div>
            <div className="navbarCenter">
                <div className="searchbar">
                    <input placeholder="Search for friends, workouts, and posts" className="searchInput"/>
                </div>
            </div>
            <div className="navbarRight">
                <Link to="/workout" className="navbarLink">My Workouts</Link>
                <span className="navbarLink">Friends</span>
            </div>
            <div className="navbarIcons">
                <img src="/assets/person.jpg" className="navbarImg"/>
            </div>
            <button onClick={logoff}>
                Log Off
            </button>
              
        </div>
    )

}