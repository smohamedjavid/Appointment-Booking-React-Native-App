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
  this.state = { loggedIn: false, role: 'student' };
  this.handleClick = this.handleClick.bind(this);
  this.roleClick = this.roleClick.bind(this);
  }
  handleClick() {
    this.setState({
        loggedIn: false,
        role: ''
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
    return <LoginForm roleClick={this.roleClick} />; }
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

