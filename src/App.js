import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './style/Default.style.css'
import Landing from './components/Landing.component'
import StudentAssignment from './components/StudentAssignment.component'
import StudentPage from './components/StudentPage.component'
import TeacherPage from './components/TeacherPage.component'
import Login from './components/Login.component'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import { FetchURL } from './env/url'


function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentUserType, setCurrentUserType] = useState(undefined)

  useEffect(() => {

    if (localStorage.getItem('jwt') && localStorage.getItem("type") === "teacher") {
      fetch(`${FetchURL}teacher/profile`, {
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      }).then(resp => resp.json())
        .then(teacher => {
          setCurrentUser(teacher)
          setCurrentUserType("teacher")
        })
    } else if (localStorage.getItem('jwt') && localStorage.getItem("type") === "student") {
      fetch(`${FetchURL}student/profile`, {
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      }).then(resp => resp.json())
        .then(student => {
          console.log(student)
          setCurrentUser(student)
          setCurrentUserType("student")
        })
    }
  }
    , [])

  function clearUserStates() {
    window.localStorage.clear()
    setCurrentUser(undefined);
    setCurrentUserType(undefined)

  }



  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => {
          if (currentUser && currentUserType === "teacher") {
            return <Redirect to="/teacher" />
          } else if (currentUser && currentUserType === "student") {
            return <Redirect to="/student" />
          } else {
            return <Landing />
          }
        }} />
        <Route path="/login" render={(props) => {
          return < Login setCurrentUser={setCurrentUser} setCurrentUserType={setCurrentUserType} />
        }} />
        <Route path="/student" render={(props) => {
          return < StudentPage currentUser={currentUser} clearUserStates={clearUserStates}/>
        }} />
        <Route path="/teacher" render={(props) => {
          return < TeacherPage currentUser={currentUser} clearUserStates={clearUserStates} />
        }} />
        <Route path="/assignment/:id" component={StudentAssignment} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;