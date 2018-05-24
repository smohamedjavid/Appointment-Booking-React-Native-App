import React, { Component } from 'react';
import { View } from 'react-native';
import Ls from 'react-native-local-storage';
import LoginForm from './src/LoginForm';
import Availablility from './src/Avail';
import Alumni from './src/Alumni';


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
  this.state = { loggedIn: false, role: 'student', token: '' };
  this.handleClick = this.handleClick.bind(this);
  this.roleClick = this.roleClick.bind(this);
  this.setToken = this.setToken.bind(this);
  }

setToken(token) {
  Ls.get('jwt').then((data) => {
    this.setState({
      token: data
    });
    console.log('In App.js get: ', data); });
}
handleClick() {
  this.setState({
      loggedIn: false,
      role: '',
      token: ''
  });
}
roleClick(role) {
  this.setState({
      loggedIn: true,
      role: role
  });
}
renderContent() {
  if (this.state.loggedIn === false) {
    return <LoginForm roleClick={this.roleClick} setToken={this.setToken} />; }
    if (this.state.loggedIn === true && this.state.role === 'student') {
      return <Availablility handleClick={this.handleClick} />; }
      if (this.state.loggedIn === true && this.state.role === 'alumni') {
        return <Alumni handleClick={this.handleClick} />; }
  }
  render() {
    return (
      <View>
      {this.renderContent()}
      </View>
    );
  }
}

