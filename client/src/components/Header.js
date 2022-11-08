import React from 'react';
import { Link } from 'react-router-dom';

// React header component
const Header = (props) =>{
    
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to={"/"}>Courses</Link></h1>
                <nav>
                    {
                       props.user ?

                       <>   
                            <ul className="header--signedin">
                                <li><p role="status">Welcome, {props.user.firstName} {props.user.lastName}</p></li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </ul>
                       </> :

                       <>
                            <ul className="header--signedout">
                                <li><Link to={"/signup"}>Sign Up</Link></li>
                                <li><Link to={"/signin"}>Sign In</Link></li>
                            </ul>
                       </>
                    }
                </nav>
            </div>
        </header>
    )
}


export default Header