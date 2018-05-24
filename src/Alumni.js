import React, { Component } from 'react';
import { Text, AsyncStorage, Alert, View, DatePickerAndroid, Button, StyleSheet,
    TouchableOpacity } from 'react-native';
import Ls from 'react-native-local-storage';
import moment from 'moment';
import { ButtonN, Card, CardSection, Input, header } from './common';


class Alumni extends Component {
    
  constructor(props) {
      super(props);
    this.state = { data: []
      };
    }
    componentDidMount() {
        fetch('https://snippt-javid.herokuapp.com/alumnus/5b045ad529f4510004c7fad7', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMDQ1NWIwMjlmNDUxMDAwNGM3ZmFkNSIsIm5hbWUiOiJTdHVkZW50IE9uZSIsImVtYWlsIjoic3R1ZGVudDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJpbmNvcnJlY3QiLCJyb2xlIjoic3R1ZGVudCIsIl9fdiI6MH0sImlhdCI6MTUyNzA2MTU0NCwiZXhwIjoxNTI3MTQ3OTQ0fQ.Ia7esDO-k_HDC8c7VxfqCSWTtbBC3q-E3zhK0MSfsy8'
          },
          }).then((response) => response.json())
          .then((responseJson) => {
              this.setState({ data: responseJson });
              console.log(this.state.data);
            })
            .catch((error) => {
              Alert.alert('No data or Error might occured');
          })
          .done();
    }

  delete(id) {
      const BaseUri = 'https://snippt-javid.herokuapp.com/booking/delete/';
      const uri = BaseUri.concat(id);
      console.log(uri);
      fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMDQ1NWIwMjlmNDUxMDAwNGM3ZmFkNSIsIm5hbWUiOiJTdHVkZW50IE9uZSIsImVtYWlsIjoic3R1ZGVudDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJpbmNvcnJlY3QiLCJyb2xlIjoic3R1ZGVudCIsIl9fdiI6MH0sImlhdCI6MTUyNzA2MTU0NCwiZXhwIjoxNTI3MTQ3OTQ0fQ.Ia7esDO-k_HDC8c7VxfqCSWTtbBC3q-E3zhK0MSfsy8'
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          Alert.alert('Booking Successfully Deleted');
          console.log(responseJson);
          this.componentDidMount();
          })
          .catch((error) => {
            Alert.alert('Error occured');
        })
        .done();
  }

  accept(id) {
    const BaseUri = 'https://snippt-javid.herokuapp.com/booking/update/';
    const uri = BaseUri.concat(id);
    console.log(uri);
    fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMDQ1NWIwMjlmNDUxMDAwNGM3ZmFkNSIsIm5hbWUiOiJTdHVkZW50IE9uZSIsImVtYWlsIjoic3R1ZGVudDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJpbmNvcnJlY3QiLCJyb2xlIjoic3R1ZGVudCIsIl9fdiI6MH0sImlhdCI6MTUyNzA2MTU0NCwiZXhwIjoxNTI3MTQ3OTQ0fQ.Ia7esDO-k_HDC8c7VxfqCSWTtbBC3q-E3zhK0MSfsy8'
      },
      }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert('Booking Successfully accepted');
        console.log(responseJson);
        this.componentDidMount();
        })
        .catch((error) => {
          Alert.alert('No data or Error might occured');
      })
      .done();
}


    selectedSlot(time_slot) {
      switch(time_slot) {
      case 'A' :
        return '1 pm - 2 pm';
      case 'B' :
        return '4 pm - 5 pm';
      case 'C' :
        return '6 pm - 7 pm';
    }
  }
      render() {
        const { welcome, container } = styles;
        return (
           <View>
          <Card>
          <CardSection>
          <Text style={styles.welcome}>
               Student Name
              </Text>
              <Text style={styles.welcome}>
              Date
             </Text>
             <Text style={styles.welcome}>
             Time Slot
            </Text>
            <Text style={styles.welcome}>
             Actions
            </Text>
            </CardSection>
            {this.state.data.map((item) => {
              return (<CardSection key={item._id} >
                <Text style={styles.welcome}> {item.student_name} </Text>
                <Text style={styles.welcome}> {moment(item.date).format('DD-MMM-YYYY')} </Text>
                <Text style={styles.welcome}> {this.selectedSlot(item.time_slot)} </Text>
                <CardSection>
                <Button
                  onPress={() => this.delete(item._id)}
                  title="Delete"
                  color="#007aff"
                  />
                <Button
                  onPress={() => {this.accept(item._id); }}
                  title="Accept"
                  color="#003afe"
                  />
                </CardSection>
                </CardSection>);
          })}
            <CardSection>
              <ButtonN onPress={this.props.handleClick}>
                Log Out
              </ButtonN>
            </CardSection>
          </Card>
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
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
      },
    });

    export default Alumni;
