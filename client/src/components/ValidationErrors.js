import React from 'react';

// react component for displaying a list of validation errors
const ValidationErrors = (props) =>{

    return(
        <div className="validation--errors">
                
            <h3>Validation Errors</h3>
            <ul>
                {
                    props.errors.error.map((error, index)=><li key={index}>{error}</li>)
                }
            </ul>
    
        </div> 
    )

}



export default ValidationErrors;

