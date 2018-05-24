import React, { Component } from 'react';
import { Text, AsyncStorage, Alert, View, Button, StyleSheet } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import Ls from 'react-native-local-storage';
import moment from 'moment';
import { ButtonN, Card, CardSection, } from './common';
import App from '../App';

class Avail extends Component {
  constructor(props) {
    super(props);
  this.state = { minD: null, 
    maxD: null, 
    slot: '', 
    disabled: true, 
    selectedDate: null,
    dateText: '',
    apDis: false
    };
  }

    onDOBPress = () => {
      let selectedDate = this.state.selectedDate;
  
      if (!selectedDate || selectedDate == null) {
        selectedDate = new Date();
        this.setState({
          selectedDate: selectedDate
        });
      }
      this.refs.dobDialog.open({
        date: selectedDate,
        maxDate: this.maxDateCal(),
        minDate: new Date()
      });
    }
  
    onDOBDatePicked = (date) => {
      this.setState({
        selectedDate: date,
        dateText: moment(date).format('DD-MMM-YYYY')
      });
      console.log('https://snippt-javid.herokuapp.com/alumnus/alumni/'+ `${this.state.selectedDate}`);
      this.check();    
    }

    maxDateCal() {
      let date = new Date();
      let last = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      return last;
    }

    check() {

      const BaseUri = 'https://snippt-javid.herokuapp.com/alumnus/alumni/';
      const uri = BaseUri.concat(this.state.selectedDate);
      console.log(uri);

      fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMDQ1NWIwMjlmNDUxMDAwNGM3ZmFkNSIsIm5hbWUiOiJTdHVkZW50IE9uZSIsImVtYWlsIjoic3R1ZGVudDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJpbmNvcnJlY3QiLCJyb2xlIjoic3R1ZGVudCIsIl9fdiI6MH0sImlhdCI6MTUyNzA2MTU0NCwiZXhwIjoxNTI3MTQ3OTQ0fQ.Ia7esDO-k_HDC8c7VxfqCSWTtbBC3q-E3zhK0MSfsy8'
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson !== null) {
            Alert.alert('Booking slots is not currently available Please choose another date','You cant book on this date until alumni confirms a booking on this date ');
            this.setState({ apDis: true });
          }
          })
          .catch((error) => {
            Alert.alert('Check back later');
        })
        .done();
    }

    bookBtn() {
      const { selectedDate, slot } = this.state;
  
      fetch('https://snippt-javid.herokuapp.com/booking/alumni/5b045ad529f4510004c7fad7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMDQ1NWIwMjlmNDUxMDAwNGM3ZmFkNSIsIm5hbWUiOiJTdHVkZW50IE9uZSIsImVtYWlsIjoic3R1ZGVudDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJpbmNvcnJlY3QiLCJyb2xlIjoic3R1ZGVudCIsIl9fdiI6MH0sImlhdCI6MTUyNzA2MTU0NCwiZXhwIjoxNTI3MTQ3OTQ0fQ.Ia7esDO-k_HDC8c7VxfqCSWTtbBC3q-E3zhK0MSfsy8'
        },
        body: JSON.stringify({
          date: selectedDate,
          time_slot: slot
        }) 
        }).then((response) => response.json())
        .then((responseJson) => Alert.alert('Appointment successfully placed', JSON.stringify(responseJson)))
          .catch((error) => {
            Alert.alert('Cannot place appointment');
        })
        .done();
      }

    selectedSlot() {
      if (this.state.slot === 'A') {
        return '1 pm - 2 pm'; }
      if (this.state.slot === 'B') {
        return '4 pm - 5 pm'; }
      if (this.state.slot === 'C') {
        return '6 pm - 7 pm'; }
    }
  

  render() {
    const { welcome, container } = styles;

    return (
       <View>        
      <Card>
      <CardSection>
      <Text style={styles.welcome}>
           Alumni Availability
          </Text>
        </CardSection>
        <CardSection>
        <Text>
        Date:
       </Text>
       <Text>
          {this.state.dateText}
          </Text>
        </CardSection>
        <CardSection>
        <ButtonN onPress={this.onDOBPress.bind(this)}>
        Choose Date
       </ButtonN>
        </CardSection>
        <CardSection>
          <Text>
           Time Slot:
          </Text>
          <Text>
          {this.selectedSlot()}
          </Text>
        </CardSection>
        <CardSection style={styles.container}>
            <Button
              onPress={() => {this.setState({ slot: 'A' }); }}
              title="1 pm - 2 pm"
              color="#007aff"
              disabled={this.state.apDis}             
            />
            <Button
              onPress={() => {this.setState({ slot: 'B' }); }}
              title="4 pm - 5 pm"
              color="#007aff" 
              disabled={this.state.apDis}             
            />
            <Button
            onPress={() => {this.setState({ slot: 'C' }); }}
            title="6 pm - 7 pm"
            color="#007aff"
            disabled={this.state.apDis}
            />
            </CardSection>
       <CardSection>
          <ButtonN onPress={() => { this.bookBtn(); }} disabled={this.state.apDis}>
            Book Appointment
          </ButtonN>
        </CardSection>
        <CardSection>
          <ButtonN onPress={this.props.handleClick}>
            Log Out
          </ButtonN>
        </CardSection>
      </Card>
      <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
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
    margin: 20,
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

export default Avail;
