/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import firebase from 'firebase';
import Verifylogin_screen from './Verifylogin_screen';

var firebaseConfig = {
  apiKey: "AIzaSyBv00esX6U0E8LK8r4sF7lYKevbNkcXtOM",
  authDomain: "rashanforyou.firebaseapp.com",
  databaseURL: "https://rashanforyou.firebaseio.com",
  projectId: "rashanforyou",
  storageBucket: "rashanforyou.appspot.com",
  messagingSenderId: "47011334370",
  appId: "1:47011334370:web:f02294f4bb729fc02fb6bb",
  measurementId: "G-T1DH95THSJ"
};


firebase.initializeApp(firebaseConfig);


const App = () => {
  return (
  
    <Verifylogin_screen/>
 
    )
}

export default App;
