import React, {Component} from 'react';
import { Container, Content, Button, Text,Form, Item, Input, Label  } from 'native-base';
import {View,Image, Alert,AsyncStorage,CheckBox} from 'react-native';
import firebase from 'firebase/app';
import {Login} from '../Services/UserService';
import 'firebase/database';

class Sign_in extends Component {
    static navigationOptions = {
        headerTitle: 'Rashan | Sign In',
      };
  constructor(props) {
    super(props);
    this.state = {
      UsersData:{},
      emailAddr:'',
      userpass:'',
    };
    this.gotoSign_up=this.gotoSign_up.bind(this);
    this.checkLogin=this.checkLogin.bind(this);
  }

  gotoSign_up(){
      this.props.navigation.navigate('sign_up');
  }

  checkLogin()
  {
    var Entered_email=this.state.emailAddr;
    var Entered_pass=this.state.userpass;

    if(Entered_email!='' && Entered_pass !='')
    {
      Login(Entered_email,Entered_pass);
    }
    else
    {
      Alert.alert("Empty email and password !");
    }
  }

componentDidMount(){
  var recentPostsRef = firebase.database().ref('users');
  recentPostsRef.on(
    'value',
    snapshot => {
      this.setState({
        UsersData: snapshot,
      })
      console.log("users : "+snapshot);
    },
    error => {
      console.log(error);
    },
  );
}

  render() {
    return (
      <Container>
        <Content padder>
          <View style={{margin: 10}} />
          <View style={{alignSelf: 'center'}}>
            <Image
              style={{width: 60, height: 60, margin: 5}}
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Food_Bank_icon.svg/100px-Food_Bank_icon.svg.png',
              }}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 70, color: '#1e272e'}}>راشن</Text>
            <Text style={{color: '#1e272e'}}>For You</Text>
          </View>
          <View style={{margin: 10}} />
          <Form>
            <Item stackedLabel>
              <Label>Email Address</Label>
              <Input
                textContentType="emailAddress"
                onChangeText={text => this.setState({emailAddr: text})}
                placeholder="Your email address"
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={!this.state.checked}
                onChangeText={text => this.setState({userpass: text})}
                placeholder="Your password"
              />
            </Item>

            <View style={{flexDirection: 'column',margin:10}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() =>
                    this.setState({checked: !this.state.checked})
                  }
                />
                <Text style={{marginTop: 5}}> Show Password</Text>
              </View>
            </View>
          </Form>

          <View style={{margin: 20}} />

          <Button
            dark
            block
            style={{backgroundColor: '#1e272e'}}
            onPress={this.checkLogin}>
            <Text> Sign In </Text>
          </Button>

          <View style={{alignItems: 'center', margin: 20}}>
            <Text style={{color: '#3498db'}} onPress={this.gotoSign_up}>
              Don't have one ? Create Now
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Sign_in;