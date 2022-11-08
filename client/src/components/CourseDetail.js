import React, { useEffect, useState} from 'react';
import {useParams} from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

// React component for displaying course details
const CourseDetail = (props) =>{
    let showButtons = false;
    const {id} = useParams();
    const [courseUser, setcourseUser] = useState([])
    let [courseDetail, setcourseDetail] = useState({});
    const navigate = useNavigate();

    // gets course information
    useEffect(()=>{
        const fetchUser = () =>{
            fetch(`http://localhost:5000/api/courses/${id}`)
                .then(data=>data.json())
                .then((json)=> {
                    setcourseDetail(json);
                    setcourseUser(json.User);
                })
        }

        fetchUser();
    },[])

    // displays estimated time to complete course
    const showTime = () =>{
        if(courseDetail['estimatedTime'] === "" || courseDetail['estimatedTime'] === null){
            return "Unavailable";
        }else{
            return courseDetail['estimatedTime']
        }
    }

    // displays materials needed for course
    const showMaterials = () =>{
        if(courseDetail['materialsNeeded'] === "" || courseDetail['materialsNeeded'] === null){
            return "None"
        }else{
            return <ReactMarkdown children={courseDetail.materialsNeeded}/>
        }
    }

    // method that allows authenticated user to delete course
    const deleteCourse = async (e) =>{
        e.preventDefault();
        const httpMethods = new props.http();
        if(courseUser !== []){
            try{
                await httpMethods.deleteCourse(props.user.emailAddress, props.password, id);
                navigate('/');
            }catch(error){
                console.log(error);
                navigate('/error');
            }
        }

    }

    // allows for update and delete buttons to appear if user is authenticated and course user matches
    if(props.user){
        if(props.user.id === courseUser.id){
            showButtons = true;
        }
    }

    return(
        <div>
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            showButtons ?
                            <>
                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                <Link className="button" onClick={deleteCourse}>Delete Course</Link>
                                <Link className="button button-secondary" to={"/"}>Return to List</Link>
                            </> : 
                            <> 
                                <Link className="button button-secondary" to={"/"}>Return to List</Link>
                            </>
                        }
                    </div>
                </div>
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{courseDetail['title']}</h4>
                                <p>By {courseUser['firstName']} {courseUser['lastName']}</p>
                                {<ReactMarkdown children={courseDetail.description} />}
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>
                                    {showTime()}
                                </p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {showMaterials()}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default CourseDetail;