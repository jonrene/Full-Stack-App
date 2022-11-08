//Preprocessor directive
import { Outlet, Navigate } from 'react-router-dom'

// react component used for private routing
const PrivateRoute = (props) => {
    return(
        props.user ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoute