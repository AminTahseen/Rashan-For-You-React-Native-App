import firebase, {auth} from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {Alert, AsyncStorage} from 'react-native';

var userData = '';
var receiverData = '';

export function CreateUser(user) {
  const resp = firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.pass);
  resp
    .then(result => {
      firebase
        .database()
        .ref(`/users/${result.user.uid}`)
        .set(user)
        .then(() => {
          Alert.alert('Success');
        })
        .catch(err => {
          Alert.alert(err);
        });
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    });
}

export function Login(email, pass) {
  const resp = firebase.auth().signInWithEmailAndPassword(email, pass);
  resp
    .then(result => {
      if (result.user) {
        Alert.alert('Login Success');
        firebase
          .database()
          .ref('users/' + result.user.uid)
          .once('value')
          .then(function(snapshot) {
            if (!snapshot) {
              console.log('An error occured');
              //return "error"
            } else {
              console.log('logged : ' + snapshot.val().account_type);
              var type = snapshot.val().account_type;
              AsyncStorage.setItem('loggedINUSER', type).then(() =>
                console.log('Session Saved User'),
              );
            }
          });
      } else {
        Alert.alert('Login Failed');
      }
    })
    .catch(err => {
      Alert.alert('Login Failed');
    });
}

export function Logout() {
  Alert.alert('Successfully Logged out');
  AsyncStorage.setItem('loggedIN', 'null').then(() =>
    console.log('Session Changed'),
  );
  AsyncStorage.setItem('loggedINUSER', 'null').then(() =>
    console.log('User Session Changed'),
  );
}

export function fetchUserData(userID) {
  firebase
    .database()
    .ref('users/' + userID)
    .once('value')
    .then(function(snapshot) {
      if (!snapshot) {
        console.log('An error occured');
        //return "error"
      } 
      else {
        userData = {
          fullname: snapshot.val().fullname,
          account_type: snapshot.val().account_type,
          city: snapshot.val().city,
          email: snapshot.val().email,
          phoneNo: snapshot.val().phoneNo,
          pass: snapshot.val().pass,
        };
      }
    });
  return userData;
}

export function fetchReceiverUserData(userID) {
  firebase
    .database()
    .ref('users/' + userID)
    .once('value')
    .then(function(snapshot) {
      if (!snapshot) {
        console.log('An error occured');
        //return "error"
      } else {
        console.log(
          'Value for ' + userID + ' : ' + snapshot.val().location_lat,
        );
        receiverData = {
          key:snapshot.key,
          fullname: snapshot.val().fullname,
          account_type: snapshot.val().account_type,
          city: snapshot.val().city,
          email: snapshot.val().email,
          phoneNo: snapshot.val().phoneNo,
          pass: snapshot.val().pass,
          lat: snapshot.val().location_lat,
          lon: snapshot.val().location_lon,
        };
      }
    });
  return receiverData;
}
