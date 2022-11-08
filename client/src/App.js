//Preprocessor directives
import './App.css';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import React, {useState} from 'react';
import HTTP from './http';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute';

// main applicatiopn
const App = () => {

  // User info and password that will be stored in global state
  const [user, updateUser] = useState(null);
  const [password, setPassword] = useState(null);

  // Global sign in method
  const signIn = async (email, password) =>{
    const httpMethods = new HTTP();
    const userAuth = await httpMethods.getUser(email, password)
                        .then(response=>response.json())
                        .then(data => data)

    if('id' in userAuth){
        updateUser(userAuth);
        setPassword(password);
        return null;
    }else{
        let errorObject = {error: [userAuth.errorMessage]}
        return errorObject;
    }
  }

  // Global sign out method
  const signOut = () =>{
    updateUser(null);
    setPassword(null);
  }

  // main application routes
  return (
    <>
      <Header user={user}/>
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail http={HTTP} user={user} password={password}/>} />
          <Route path='/signin' element={<UserSignIn user={user} signIn={signIn} http={HTTP}/>} />
          <Route path='/signup' element={<UserSignUp http={HTTP} signIn={signIn}/>} />
          <Route element={<PrivateRoute user={user}/>}>
            <Route element={<CreateCourse user={user} password={password} http={HTTP}/>} path="/courses/create"/>
            <Route element={<UpdateCourse user={user} password={password} http={HTTP}/>} path="/courses/:id/update"/>
          </Route>
          <Route path="/signout" element={<UserSignOut signOut={signOut}/>} />
        </Routes>
    </>
  );
}

export default App;
