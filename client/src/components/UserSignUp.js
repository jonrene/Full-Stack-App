import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import ValidationErrors from './ValidationErrors';

// react component for displaying sign up page
const UserSignUp = (props) =>{
    const navigate = useNavigate();
    const httpMethods = new props.http()

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errors, setErrors] = useState(null)

    // updates first name on form
    const changeFirstName = (e) =>{
        e.preventDefault();
        setFirstName(e.target.value);
    }

    // updates last name on form
    const changeLastName = (e) =>{
        e.preventDefault();
        setLastName(e.target.value);
    }
    
    // updates email on form
    const changeEmail = (e) =>{
        e.preventDefault();
        setEmail(e.target.value);
    }

    // updates password on form
    const changePassword = (e) =>{
        e.preventDefault();
        setPassword(e.target.value);
    }

    // function to sign up user/add to database. also signs in user and navigates to home page
    // uses sign in function from global application state
    const signUp = async (e) =>{
        e.preventDefault();
        const user = {firstName, lastName, password, emailAddress: email}
        const httpResponse = await httpMethods.createUser(user);

        if(httpResponse.status === 400){
            let json = await httpResponse.json();
            setErrors(json)
        } else if(httpResponse.status === 500){
            setErrors({error: ["Internal Server Error"]})
        }else{
            const authorized = props.signIn(email, password);

            if(authorized === null){
                navigate('/');
            }else{
                setErrors(authorized)
            }
        }
        
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
                    <h2>Sign Up</h2>
                    <form onSubmit={signUp}>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" onChange={changeFirstName} />
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" onChange={changeLastName} />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" onChange={changeEmail} />
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" onChange={changePassword} />
                        <button className="button" type="submit">Sign Up</button><Link to="/" className="button button-secondary">Cancel</Link>
                    </form>
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
            </main>
        </div>
    )
}


export default UserSignUp;