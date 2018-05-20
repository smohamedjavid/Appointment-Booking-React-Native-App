/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import { Header, Button } from './src/common';
import LoginForm from './src/LoginForm';

type Props = {};
export default class App extends Component<Props> {

  state = { loggedIn: null };

  componentWillMount(){
    firebase.initializeApp({
    apiKey: "AIzaSyCJIZ9tvCNMlLzCxD9srX1ZffF2pn2gMuY",
    authDomain: "snippt-app.firebaseapp.com",
    databaseURL: "https://snippt-app.firebaseio.com",
    projectId: "snippt-app",
    storageBucket: "snippt-app.appspot.com",
    messagingSenderId: "119184076697"
  });

  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      this.setState({ loggedIn: true });
    }
    else{
      this.setState({ loggedIn: false });
    }
  });
}

renderContent() {
  switch(this.state.loggedIn){
    case true:
      return <Button style={styles.container} onPress={() => firebase.auth().signOut()}> Log Out</Button>
    case false:
      return <LoginForm />
    default:

  }
}

  render() {
    return (
      <View>
       {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
