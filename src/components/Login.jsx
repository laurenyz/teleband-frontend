import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FetchURL } from '../env/url'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import '../style/Login.css'

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
        borderRadius: 20,
        marginTop: 20,
    }
}));

function Login(props) {
    const { handleSubmit: handleSubmitStudent, register: registerStudent, errors: errorsStudent } = useForm();
    const { handleSubmit: handleSubmitTeacher, register: registerTeacher, errors: errorsTeacher } = useForm()
    const [student, setStudent] = useState(false)
    const history = useHistory();
    const classes = useStyles();

    const onSubmitTeacher = (values) => {
        loggingIn({ email: values["email"], password: values["password"] }, "teacher")
    }
    const onSubmitStudent = (values) => {
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
                if (type === "teacher") {
                    localStorage.setItem('jwt', json.token)
                } else if (type === "student") {
                    localStorage.setItem('jwt', json.school_id)
                }
                localStorage.setItem('type', type)
                props.setCurrentUser(json)
                props.setCurrentUserType(type)
                if(type==="teacher"){
                    history.push("/teacher")
                }else{
                    history.push("/student")
                }
            }
        })
    }

    return (
        <Grid container justify="center">
            <Paper className={classes.paper} variant="outlined">
                <Typography variant="h2" id="login-header">Tele.band Login</Typography>
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
                                    type="text"
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
                                    type="text"
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
                                    type="password"
                                    inputRef={registerTeacher({
                                        required: "Required"
                                    })}
                                />
                                {/* teacher input validation error here */}
                                {errorsTeacher["email"] && <p>{errorsTeacher["email"]["message"]}</p>}
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