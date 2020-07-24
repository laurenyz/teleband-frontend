import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {FetchURL} from '../env/url'
import './Login.style.css'


export default function Login(){
    const { handleSubmit: handleSubmitStudent, register: registerStudent, errors: errorsStudent } = useForm();
    const { handleSubmit: handleSubmitTeacher, register: registerTeacher, errors: errorsTeacher} = useForm()

    

    const onSubmitTeacher = (values) => {
         console.log("teacher", values)
        loggingIn({email: values["email"], password: values["password"]})
    }
    const onSubmitStudent = (values) => {
        console.log("school-id", values)
        loggingIn({school_id: values["school-id"]})
    }

    function loggingIn(payload){
        fetch(`${FetchURL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        })
        .then(resp=>resp.json())
        .then(json => {
            if (json.error){
                alert(json.message)
                } else {
                localStorage.setItem('jwt', json.token)
             }})
        }   
  
    

    const [student, setStudent] = useState(false)
    const {login, handleLogin} = useForm()
 
    return(
        <div id="login">
            <h2>Login</h2>
            <div className="switch-box" >
                <div className={!student ? "highlight" : "no-highlight"}>Teacher</div>
                <label className="switch">
                    
                    <input onClick={() => setStudent(student => !student)} type="checkbox"/>
                    <span className="slider round"></span>
                </label>
                <div className={student ? "highlight" : "no-highlight" }>Student</div>
            </div>
            
            
                
                {
                    student ? 
                    <React.Fragment>
                        <form onSubmit={handleSubmitStudent(onSubmitStudent)} >
                            <div id='login-form'>
                                <label>School ID</label>
                                <input name="school-id" type="text" ref={registerStudent({
                                    required: "Required"
                                })} />
                            </div>
                            <button>login</button>
                        </form>
                        
                    </React.Fragment> :
                    <React.Fragment>
                        <form onSubmit={handleSubmitTeacher(onSubmitTeacher)} >
                            <div id='login-form'>
                            <label>Email</label>
                            <input name="email" type="text" ref={registerTeacher({
                                required: "Required",
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }})}/>
                            <label>Password</label>
                            <input name="password" type="password" ref={registerTeacher({
                                required: "Required"
                            })}/>
                            </div>
                            <button>login</button>
                        </form>
                        
                    </React.Fragment>
                }
                
                
           
        </div>
        )
}

