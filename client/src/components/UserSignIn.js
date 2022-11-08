import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import ValidationErrors from './ValidationErrors';

// react componenet for user signing
const UserSignIn = (props) =>{
    const navigate = useNavigate();
    
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('')
    const [errors, setErrors] = useState(null)

    //updates email in form
    const changeEmail = (e) =>{
        e.preventDefault();
        updateEmail(e.target.value);
    }

    // updates password in form
    const changePassword = (e) =>{
        e.preventDefault();
        updatePassword(e.target.value)
    }

    // signs in user using sign in method from global application state
    const signIn = async (e) =>{
        e.preventDefault();

        props.signIn(email, password)
        .then(result=>{
            if(result === null){
                navigate('/');
            }else{
                setErrors(result);
            }
        })
    

        
    }

    return(
        <div>
            <main>
                <div className="form--centered">
                    {
                        errors ? 
                        <>
                             <div className="validation--errors">
                                <ValidationErrors errors={errors}></ValidationErrors>
                            </div>
                        </>:
                        <></>
                    }
                    <h2>Sign In</h2>
                    
                    <form onSubmit={signIn}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" onChange={changeEmail} required type="email"/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" onChange={changePassword} required/>
                        <button className="button" type="submit">Sign In</button><Link to="/"className="button">Cancel</Link>
                    </form>
                    <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                    
                </div>
            </main>
        </div>
    )
}

export default UserSignIn;