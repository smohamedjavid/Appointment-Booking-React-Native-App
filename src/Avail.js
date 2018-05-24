import React, { Component } from 'react';
import { Text, AsyncStorage, Alert, View, Button, StyleSheet } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import Ls from 'react-native-local-storage';
import moment from 'moment';
import { ButtonN, Card, CardSection, } from './common';

class Avail extends Component {
  constructor(props) {
    super(props);
  this.state = { minD: null,
    maxD: null,
    slot: '',
    disabled: true,
    selectedDate: null,
    dateText: '',
    apDis: false,
    token: ''
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
      this.setState({ apDis: false });
      this.check();
    }

    maxDateCal() {
      Ls.get('jwt').then((data) => {
        this.setState({
          token: data
        });
        const { token } = this.state;
        console.log('In Avail.js get: ', token); });
      const date = new Date();
      const last = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      return last;
    }
    check() {

      const BaseUri = 'https://snippt-javid.herokuapp.com/alumnus/alumni/';
      const date = new Date(this.state.selectedDate).toISOString();
      const uri = BaseUri.concat(date);
      console.log(uri);

      const { token } = this.state;
      console.log(token);

      fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson === null) {
            Alert.alert('Booking slots is not currently available Please choose another date','You cant book on this date until alumni confirms a booking on this date ');
          }
          })
          .catch((error) => {
            Alert.alert('Check back later');
        })
        .done();
    }

    bookBtn() {
      const { selectedDate, slot, token } = this.state;

      fetch('https://snippt-javid.herokuapp.com/booking/alumni/5b045ad529f4510004c7fad7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          date: selectedDate,
          time_slot: slot
        })
        }).then((response) => response.json())
        .then((responseJson) => { Alert.alert('Appointment successfully placed', 'You cant book another slot on this date until alumni confirms the booking');
        this.setState({ apDis: true });
      }).catch((error) => {
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
       <Text style={styles.content} >
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
          <Text style={styles.content}>
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
    margin: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 15,
    paddingLeft: 130,
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

export default Avail;
