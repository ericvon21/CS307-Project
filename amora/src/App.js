import React, { Component } from 'react';
import rebase, { auth } from "./rebase.js"
import { Route, Switch, Redirect } from "react-router-dom";
import { isObjectEmpty, buildUserFromGoogle } from "./apphelpers.js"

import Login from "./Login.js"
import Home from "./Home.js"

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { },
      userSynced: false,
      currentProject: { }
    }
  }
  
  checkIfUserIsInDatabase(user) {
    // let inDataBase = false
    rebase.fetch(`users/${user.uid}`, {
      context: this
    }).then((data) => {
      if (isObjectEmpty(data)) {
        this.postUser(user)
      }
    })
  }

  postUser(user) {
    rebase.post(`users/${user.uid}`, {
      data: user
    });
  }

  componentWillMount() {
    this.goToUrl("/dashboard")
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const newState = { ...this.state }
        const newUser = buildUserFromGoogle(user)
        newState.user = newUser
        this.setState(newState)
        this.checkIfUserIsInDatabase(newUser)

        this.bindingref = rebase.syncState(`users/${this.state.user.uid}`, {
          context: this,
          state: 'user',
          then: () => {
            const newState = { ...this.state }
            newState.userSynced = true
            this.setState(newState)
          }
          
        })

      } else {
        // User is not signed in
        if (this.bindingref) {
          rebase.removeBinding(this.bindingref)
        }
        const newState = { ...this.state }
        newState.user = { }
        this.setState(newState)
        this.goToUrl("/")
      }
    })
  }

  getAppState = () => {
    return this.state;
  }

  setAppState = (newState) => {
    this.setState(newState)
  }

  goToUrl = (url) => {
    this.props.history.push(url)
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => {
            if (!isObjectEmpty(this.state.user)) {
              return <Home getAppState={this.getAppState} setAppState={this.setAppState} goToUrl={this.goToUrl}/>
            } else {
              return <Login />
            }
          }} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
