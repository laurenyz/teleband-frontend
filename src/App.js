import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.component'
import StudentAssignment from './components/StudentAssignment.component'
import StudentPage from './components/StudentPage.component'
import TeacherPage from './components/TeacherPage.component'
import Login from './components/Login.component'
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'
import {FetchURL} from './env/url'

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentUserType, setCurrentUserType] = useState(undefined)
  console.log(currentUser)
  useEffect(()=>{
    
    if (localStorage.getItem('jwt') && localStorage.getItem("type") === "teacher") {
      fetch(`${FetchURL}teacher/profile`, {
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      }).then(resp => resp.json())
      .then(teacher => {
        console.log(teacher)
        setCurrentUser(teacher)
        setCurrentUserType("teacher")
      })
    }
  }
  ,[])

 

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={()=>{
          if(currentUser && currentUserType ==="teacher"){
            return<Redirect to="/teacher" />
          }else if (currentUser && currentUserType === "student"){
            return<Redirect to="/student" />
          }else {
            return <Landing />
          }
        }}/>
        <Route path="/login" render={(props) => {
          return < Login setCurrentUser={setCurrentUser} setCurrentUserType={setCurrentUserType} />
        }}/>
        <Route path="/student" component={StudentPage}/>
        <Route path="/teacher" render={(props)=>{
          return < TeacherPage currentUser={currentUser}/>
        }}/>
        <Route path="/assignment" component={StudentAssignment}/>
        {/* <Route exact path = "/posts/:id" render= {(props) => {
            if (this.props.posts.length>0){
                let postId = parseInt(props.match.params.id)
                let foundPost = this.props.posts.find(p => p.id === postId)
                if (foundPost) {
                  return<PostShowPage post = {foundPost} />
                } else {
                  alert("This post has been removed.")
                  return<Redirect to="/posts" />
                }
            } else {
              return null}
          }} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
