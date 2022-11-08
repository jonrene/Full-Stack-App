import React, { useEffect, useState} from 'react';
import {useParams} from 'react-router';
import { Link } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import { useNavigate } from 'react-router';

const UpdateCourse = (props) =>{
    const navigate = useNavigate();
    const httpMethods = new props.http();

    // Initial Course Details
    const {id} = useParams();
    const [courseUser, setCourseUser] = useState([])
    const [courseDetail, setCourseDetail] = useState([]);
    const[errors, setErrors] = useState(null)

    // Updated Course details
    const [newTitle, setTitle] = useState('');
    const [newDescription, setDescription] = useState('');
    const [newTime, setTime] = useState('');
    const [newMaterials, setMaterials] = useState('');

    // updates course title in form
    const changeTitle = (e) =>{
        e.preventDefault();
        setTitle(e.target.value);
    }

    // updates course description in form
    const changeDescription = (e) =>{
        e.preventDefault();
        setDescription(e.target.value)
    }

    // updates course time in form
    const changeTime = (e) =>{
        e.preventDefault();
        setTime(e.target.value);
    }

    // updates course material in form
    const changeMaterials = (e) =>{
        e.preventDefault();
        setMaterials(e.target.value);
    }
    

    // sets up initial course information
    useEffect(()=>{
        const initCourse = () =>{
            fetch(`http://localhost:5000/api/courses/${id}`)
                .then(data=>data.json())
                .then((json)=> {
                    setCourseDetail(json);
                    setCourseUser(json.User);
                    setTitle(json.title);
                    setDescription(json.description);
                    setTime(json.estimatedTime);
                    setMaterials(json.materialsNeeded);
                })
        }

        initCourse();
    },[]) 

    // updates course information
    const updateCourse = async (e) =>{
        e.preventDefault();
        let course = {
            id: parseInt(id),
            title: newTitle, 
            description: newDescription, 
            estimatedTime: newTime, 
            materialsNeeded: newMaterials,
            userId: props.user.id
        }

        let httpResponse = await httpMethods.updateCourse(props.user.emailAddress, props.password, course)

        console.log(httpResponse);
        if(httpResponse.status === 204){
            navigate(`/courses/${id}`);
        }else{
            httpResponse.json()
                .then(json=>{
                    setErrors(json)
                })
            
        }

    }

    return(
        <div>
        <main>
            <div className="wrap">
                {
                    errors ? 
                    <>
                            <div className="validation--errors">
                            <ValidationErrors errors={errors}></ValidationErrors>
                        </div>
                    </>:
                    <></>
                }
                <h2>Update Course</h2>
                <form onSubmit={updateCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={courseDetail.title} spellCheck="false" onInput={changeTitle}/>
                            <p>By {courseUser['firstName']} {courseUser['lastName']}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={courseDetail.description} onInput={changeDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={courseDetail.estimatedTime} onInput={changeTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={courseDetail.materialsNeeded} onInput={changeMaterials}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><Link className="button button-secondary" to={`/courses/${id}`}>Cancel</Link>
                </form>
            </div>
        </main>
    </div>
    )
}

export default UpdateCourse;