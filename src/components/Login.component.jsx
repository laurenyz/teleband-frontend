import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FetchURL } from '../env/url'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import '../style/Login.style.css'

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        padding: 20,
        width: 500,
        // backgroundColor: "#dcdcdc",
        //borderColor: theme.secondary,
        borderRadius: 20,
        marginTop: 20,
    }
  }));

function Login(props) {
    const { handleSubmit: handleSubmitStudent, register: registerStudent, errors: errorsStudent } = useForm();
    const { handleSubmit: handleSubmitTeacher, register: registerTeacher, errors: errorsTeacher } = useForm()
    let history = useHistory();
    const classes = useStyles();
    const onSubmitTeacher = (values) => {
        //console.log("teacher", values)
        loggingIn({ email: values["email"], password: values["password"] }, "teacher")
    }
    const onSubmitStudent = (values) => {
         //console.log("school-id", values)
        loggingIn({ school_id: values["school-id"] }, "student")
    }

    function loggingIn(payload, type) {
        fetch(`${FetchURL}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    alert(json.message)
                } else {
                    localStorage.setItem('jwt', json.token)
                    localStorage.setItem('type', type)
                    props.setCurrentUser(json)
                    props.setCurrentUserType(type)
                }
            }).then(history.push("/"))
    }

    const [student, setStudent] = useState(false)

    return (
        <Grid container justify="center">
            <Paper className={classes.paper} variant="outlined">
                <Typography variant="h2" id="login-header">Teleband Login</Typography>
                <div className="switch-box" >
                    <div className={`teacher-btn ${!student ? "highlight" : "no-highlight"}`}>Teacher</div>
                    <label className="switch">
                        <input onClick={() => setStudent(student => !student)} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <div className={`student-btn ${student ? "highlight" : "no-highlight"}`}>Student</div>
                </div>
                {
                    student ?
                        <React.Fragment>
                            <form className={classes.form} onSubmit={handleSubmitStudent(onSubmitStudent)}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="school-id"
                                    label="School Id"
                                    name="school-id"
                                    autoComplete="school-id"
                                    autoFocus
                                    type = "text" 
                                    inputRef={registerStudent({
                                        required: "Required"
                                    })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                            </form>
                        </React.Fragment> 
                        :
                        <React.Fragment>
                            <form className={classes.form} onSubmit={handleSubmitTeacher(onSubmitTeacher)}>
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type = "text" 
                                inputRef={registerTeacher({
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })}
                                />
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                type = "password" 
                                inputRef={registerTeacher({
                                    required: "Required"
                                })}
                                />
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                Sign In
                                </Button>
                            </form>
                        </React.Fragment>
                }
            </Paper>
        </Grid>
    )
}

export default Login