import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function Navbar({ currentUser, clearUserStates, currentUserType }) {
    const history = useHistory();
    function handleLogout() {
        clearUserStates()
        history.push('/')
    }

    function handleAssignmentLink() {
        history.push('/student')
    }

    function handleLogin() {
        history.push('/login')
    }

    return (
        <AppBar position="static" style={{ height: "60px", padding: "15px" }}>
            <Grid container direction="row" spacing={3} justify="space-between" alignItems="flex-end">
                <Grid item>
                    <Typography>Teleband</Typography>
                </Grid>
                <Grid item>
                    <Grid container>
                        {currentUserType === "student" ?
                            <Grid item>
                                <Button onClick={handleAssignmentLink} >
                                    Assignments
                            </Button >
                            </Grid>
                            : null}
                        {currentUser ?
                            <Grid item>
                                <Button onClick={handleLogout} >
                                    Logout
                            </Button >
                            </Grid>
                            :
                            <Grid item>
                                <Button onClick={handleLogin} >
                                    Login
                            </Button >
                            </Grid>
                        }
                    </Grid>
                </Grid>

            </Grid>
        </AppBar>
    )
}

export default Navbar