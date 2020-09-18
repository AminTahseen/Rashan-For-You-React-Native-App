import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Signed_out_navigation from './Navigations/Signed_Out_navigation'
import Signed_in_navigation from './Navigations/Signed_in_navigation'
import Signed_in_navigation_reciever from './Navigations/Signed_in_navigation_reciever'

//import {fetchUserData} from './Services/UserService';
import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class Verifylogin_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedInUser:'',
        acc_type:"",
    };
  }

  componentDidMount() {

    const user=firebase.auth().currentUser;
    if(user===null)
    {
      AsyncStorage.setItem("loggedIN", "null").then(  
        () => console.log('Session Changed')
     )
     AsyncStorage.setItem("loggedINUSER", "null").then(  
      () => console.log('USER Session Changed')
   )
    }
    console.disableYellowBox = true;
    this.t = setInterval(() => {
      AsyncStorage.getItem("loggedINUSER").then(result => {
        console.log("value :"+result);
        if (result != null) //result exists
        {
          this.setState({
            loggedInUser:result,
          })
        }
        else {
  
        }
      }).catch(err => {
    
      })
      console.log("state : "+this.state.loggedInUser);
    }, 3000);

  }
  render() 
  {
    if (this.state.loggedInUser === 'Supplier') 
    {
      return (<Signed_in_navigation />);
    } 
    else if (this.state.loggedInUser === 'Reciever') 
    {
      return (<Signed_in_navigation_reciever />);
    } 
    else if (this.state.loggedInUser === 'null') 
    {
      return (<Signed_out_navigation />);
    } 
    else 
    {
      return (<Signed_out_navigation />);
    }

  }
}



export default Verifylogin_screen;