import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import ButtonWithBackground from '../../components//UI/ButtonWithBackground/ButtonWithBackground';
import { connect } from 'react-redux';
import { addTransaction, addBill } from '../../store/actions';

class SetBillScreen extends Component {
  state = {
    controls: {
      userName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
      // phoneNumber: {
      //   value: '',
      //   valid: false,
      //   touched: false,
      //   validationRules: {
      //     minLength: 9,
      //     maxLength: 9
      //   }
      // }
    }
  };

  billAddedHandler = () => {
    // sprawdzanie czy nie chcemy wprowadzic pustego miejsca w userName, trim() usuwa jakakolwiek biala przestrzen w inpucie, wiec "   " tez liczy sie jako blad/puste
    //if (this.state.userName.trim() !== '') {
    //  this.props.onAddUser(this.state.userName);


    this.props.onAddBill(
     
    );
  
    console.log(this.props.selectedUsers);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <HeadingText style={styles.headingText}>
            Enter the value which you want to get from everyone separately{' '}
          </HeadingText>
        </View>
        <View style={styles.inputContainer}>
          <DefaultInput
            placeholder="e.g. 100 PLN"
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            keyboardType={'numeric'}
          />
        </View>
        <View>
          <ButtonWithBackground
            color="#A3A3A3"
            // onPress={() => console.log(this.props.selectedUsers)}
              onPress={this.billAddedHandler}
          >
            <Text>Send it</Text>
          </ButtonWithBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#aaa',
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    borderRadius: 5
  },
  heading: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray'
  }
});

const mapStateToProps = state => {
  return {
    addedUsers: state.addedUsers.addedUsers,
    selectedUsers: state.addedUsers.selectedUsers
    // state.addedUsers.addedUsers pierwsze addedusers odnosi sie do configure store a drugie do users w reducer

    // selectedUser: state.selectedUser.selectedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddBill: (userName, phoneNumber) =>
      dispatch(addBill(userName, phoneNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetBillScreen);
