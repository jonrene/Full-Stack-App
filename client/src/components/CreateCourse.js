import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import { useNavigate } from 'react-router';

// React component to allow users to create a new course
const CreateCourse = (props) =>{
    const navigate = useNavigate();
    const httpMethods = new props.http();


    const [title, updateTitle] = useState('');
    const [description, updateDescription] = useState('');
    const [estimatedTime, updateTime] = useState('');
    const [materialsNeeded, updateMaterials] = useState('');
    const [errors, setErrors] = useState(null);

    // updates course title in form
    const changeTitle = (e) =>{
        e.preventDefault();
        updateTitle(e.target.value);
    }

    // updates course description in form
    const changeDescription = (e) =>{
        e.preventDefault();
        updateDescription(e.target.value);
    }

    // updates estimated time in form
    const changeTime = (e) =>{
        e.preventDefault();
        updateTime(e.target.value);
    }

    // updates course materials in form 
    const changeMaterials = (e) =>{
        e.preventDefault();
        updateMaterials(e.target.value);
    }

    // submits form 
    const submitForm = async (e) =>{
        e.preventDefault();
        if(props.user){
            const course = {title, description, estimatedTime, materialsNeeded, userId: props.user.id}
            const httpPromise = httpMethods.createCourse(props.user.emailAddress, props.password, course);
            httpPromise.then(async response=>{
                try{
                    let json = await response.json();
                    return json
                }catch(error){
                    return null;
                }
            })
            .then(errors=>{
                if(errors === null){
                    navigate("/")
                }else{
                    setErrors(errors)
                }
            })
            
        }else{
            const course = {title, description, estimatedTime, materialsNeeded, userId: ""}
            const response = httpMethods.createCourse('', '', course);
            response.then(async response=>{
                try{
                    let json = await response.json();
                    return json
                }catch(error){
                    return null;
                }
            })
            .then(errors=>{
                if(errors === null){
                    navigate("/")
                }else{
                    let errorObject = {error: [errors.errorMessage]}
                    setErrors(errorObject)
                }
            })

        }

    }


    return (
        <div>
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    {
                        errors ? 
                        <>
                             <div className="validation--errors">
                                <ValidationErrors errors={errors}></ValidationErrors>
                            </div>
                        </>:
                        <></>
                    }

                    <form onSubmit={submitForm}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" onChange={changeTitle} />

                                <p>By {props.user.firstName} {props.user.lastName}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription" onChange={changeDescription}></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" onChange={changeTime}/>

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" onChange={changeMaterials}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button><Link className="button button-secondary" to={"/"}>Cancel</Link>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CreateCourse;