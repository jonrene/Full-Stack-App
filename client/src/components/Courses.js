import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

// React compoment for home page
const Courses = (props) =>{
    const [courses, getCourses] = useState([]);

    // gets list of courses from database to display on home page 
    useEffect(()=>{
        fetch("http://localhost:5000/api/courses")
        .then(data=>data.json())
        .then(json=>{getCourses(json)})
    },[])
    
    return (
    <div>
        <main>
            <div className="wrap main--grid">
                {
                    courses.map(course=>{
                        return(
                            <Link key={course['id']} className="course--module course--link" to={`/courses/${course['id']}`}>
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course['title']}</h3>
                            </Link>
                        )
                    })
                } 
                <Link className="course--module course--add--module" to={"/courses/create"}>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    </div>
    );
}

export default Courses;