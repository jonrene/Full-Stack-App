import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// signout component. renders nothing. removes user information and password from application global state
const UserSignOut = (props) =>{
  const navigate = useNavigate();
  useEffect(()=>{
    props.signOut()
    navigate('/');
  })
}

export default UserSignOut;
