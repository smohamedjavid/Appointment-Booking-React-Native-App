import React, { Component } from 'react';
import { Text, AsyncStorage, Alert, Picker } from 'react-native';
import Ls from 'react-native-local-storage';
import { ButtonN, Card, CardSection, Input, header } from './common';


class LoginForm extends Component {

  constructor(props) {
    super(props);
  this.state = { email: '', password: '', error: '', role: 'student', jwt: '' };
  }


  onButtonPress() {
      const { email, password, role } = this.state;

      fetch('https://snippt-javid.herokuapp.com/login', {
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
            this.setState({ json: responseData });
            console.log(this.state.json.jwt);
            Alert.alert(
                'Successfully logged in',
                'response ' + JSON.stringify(responseData)
            );
            const jsonD = JSON.parse(responseData);
            const jwt = jsonD.jwt;
            this.setState({ jwt: jwt });
            console.log(this.state.jwt);
            Ls.save('jwt', jwt)
            .then(() => {
            Ls.get('jwt').then((data) => {console.log('get: ', data)});
            // output should be "get: Kobe Bryant"
            })
            this.props.roleClick(role);
        }).catch((error) => {
            Alert.alert('Incorrect Email ID or Password');
            console.log(error);
        })
        .done();
      }
      saveJWT = async (token) => {
        try {
          const t = token;
          AsyncStorage.clear().then(() => console.log ('Async is cleared'));
          AsyncStorage.setItem('jwt', t);
           const jwt = AsyncStorage.getItem('jwt');
           console.log(jwt);
        } catch (error) {
          Alert.alert('Error on saving JWT');
        }
      }

  render() {
    return (
      <Card>         
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
        <Text>
        Choose role:
        </Text>
        <Picker
          selectedValue={this.state.role}
          style={{ height: 50, width: null }}
          onValueChange={(itemValue, itemIndex) => this.setState({ role: itemValue })}>
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Alumni" value="alumni" />
        </Picker> 

        <CardSection>    
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

export default LoginForm;
