// methods for fetching data from REST API
export default class HTTP {
    // this function takes in inputs and runs fetch api for all application GET, PUT, DELETE, and POST requests
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
      const url = 'http://localhost:5000/api' + path;

      // options for fetch api
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      if (requiresAuth) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
  
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
      
      return fetch(url, options);
    }
  
    // Function for getting a desired user information
    getUser = async (username, password) => {
      const response = await this.api('/users', 'GET', null, true, { username, password });
      return response;
    }
    
    // Function for adding new user
    createUser = async (user) => {
      const response = await this.api('/users', 'POST', user);
      return response;
      
    }
    
    // Function for authenticated user adding new course to db
    createCourse = async (username, password, course) => {
      const response = await this.api('/courses/', 'POST', course, true, { username, password });
      return response;
    }
    
    // Function for updating course info
    updateCourse = async (username, password, course) => {
      const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { username, password });
      return response;
    }
    
    // Function for authenticated user to delete course from db
    deleteCourse = async (username, password, id) => {
      const response = await this.api(`/courses/${id}`, 'DELETE', null , true, { username, password });
      return response;
    }
  }