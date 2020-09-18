import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Title } from 'native-base';
import {View,Image,AsyncStorage} from 'react-native';
import {Logout,fetchUserData} from '../Services/UserService';
import firebase, { auth } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class Profile extends Component {
    static navigationOptions = {
        headerTitle: 'Rashan | My Profile',
      };
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      userdetails:'',
    };
    this.LogoutUser=this.LogoutUser.bind(this);
  }
  LogoutUser(){
    Logout();
  }
componentDidMount()
{
    const user=firebase.auth().currentUser;
    console.log("Profile [ "+fetchUserData(user.uid).fullname+" ]");
    AsyncStorage.getItem("loggedINUSER").then(result2 => {
      console.log("storage user : "+result2);
    })
    let user_obj = {
      fullname: fetchUserData(user.uid).fullname,
      account_type: fetchUserData(user.uid).account_type,
      city: fetchUserData(user.uid).city,
      email: fetchUserData(user.uid).email,
      phoneNo: fetchUserData(user.uid).phoneNo,
      pass: fetchUserData(user.uid).pass,
    };
    this.setState({
      userdetails:user_obj,
      user:user,
    })
}


  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#ecf0f1'}}>
          <Body>
            <Title style={{color: '#2c3e50'}}>Rashan | Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Button block dark onPress={this.LogoutUser}>
            <Text>Logout</Text>
          </Button>

          <Card>
            <CardItem cardBody>
              <Image source={{uri: 'https://profiles.utdallas.edu/img/default.png'}} style={{height: 250, width: 250, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Full Name</Text>
              </Left>
              <Right>
              <Text style={{fontWeight: 'bold'}}>{this.state.userdetails.fullname}</Text>
              </Right>
            </CardItem>
            <CardItem>
            <Left>
              <Text>Account Type</Text>
              </Left>
              <Right>
              <Text style={{fontWeight: 'bold'}}>{this.state.userdetails.account_type}</Text>
              </Right>
            </CardItem>
            <CardItem>
            <Left>
              <Text>City</Text>
              </Left>
              <Right>
              <Text style={{fontWeight: 'bold'}}>{this.state.userdetails.city}</Text>
              </Right>
            </CardItem>
            <CardItem>
            <Left>
              <Text>Phone No. </Text>
              </Left>
              <Right>
              <Text style={{fontWeight: 'bold'}}>{this.state.userdetails.phoneNo}</Text>
              </Right>
            </CardItem>
          </Card>




        </Content>
      </Container>
    );
  }
}

export default Profile;