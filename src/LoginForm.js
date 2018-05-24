import React, { Component } from 'react';
import { Text, AsyncStorage, Alert, Picker, StyleSheet } from 'react-native';
import Ls from 'react-native-local-storage';
import { ButtonN, Card, CardSection, Input, header } from './common';


class LoginForm extends Component {

  constructor(props) {
    super(props);
  this.state = { email: '', password: '', role: 'student' };
  }

  onButtonPress() {
      const { email, password, role } = this.state;

      console.log(email, password);
      fetch('https://snippt-javid.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           email: email,
           password: password
        })
        }).then((response) => response.json())
        .then((responseData) => {
          const token = responseData.jwt;
          Ls.save('jwt', token);
          console.log(token);
          this.props.setToken(token);
          this.props.roleClick(role);
          }).catch((error) => {
            Alert.alert('Incorrect Email ID or Password');
        });
      }

  render() {
    return (
      <Card>
      <CardSection>
        <Text style={styles.welcome}>
        Login
        </Text>
        </CardSection>
      <Picker
        selectedValue={this.state.role}
        style={{ height: 50, width: null }}
        onValueChange={(itemValue, itemIndex) => this.setState({ role: itemValue })}>
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Alumni" value="alumni" />
      </Picker>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Pass"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
       <CardSection>
          <ButtonN onPress={this.onButtonPress.bind(this)}>
            Log In
          </ButtonN>
        </CardSection>
      </Card>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 15,
    paddingLeft: 155,
    color: '#333333',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  datePickerBox:{
    marginTop: 9,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#121212',
  },
});

export default LoginForm;
