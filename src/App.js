import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.component'
import StudentAssignment from './components/StudentAssignment.component'
import StudentPage from './components/StudentPage.component'
import TeacherPage from './components/TeacherPage.component'
import Login from './components/Login.component'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
        <Route path="/student" component={StudentPage}/>
        <Route path="/teacher" component={TeacherPage}/>
        <Route path="/assignment/:id" component={StudentAssignment}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
