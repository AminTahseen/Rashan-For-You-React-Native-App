import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Picker,
} from 'native-base';
import {View, Image, StyleSheet} from 'react-native';
import {CreateUser} from '../Services/UserService';
import Geolocation from '@react-native-community/geolocation';

class Sign_up extends React.Component {
  static navigationOptions = {
    headerTitle: 'Rashan | Sign Up',
  };
  constructor(props) {
    super(props);
    this.state = {
      selected2: '',
      fullname: '',
      city: '',
      email: '',
      phoneNo: '',
      pass: '',
      location_lat:0.0,
      location_lon:0.0,
    };
    this.CreateUserAccount = this.CreateUserAccount.bind(this);
  }
  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }

  componentDidMount(){
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude+" "+longitude);

        this.setState({
          location_lat:latitude,
          location_lon:longitude,
        })
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );  
  }


  CreateUserAccount() {
    var type=this.state.selected2;
    if(type === 'Reciever')
    {
      let user_obj = {
        fullname: this.state.fullname,
        account_type: this.state.selected2,
        city: this.state.city,
        email: this.state.email,
        phoneNo: this.state.phoneNo,
        pass: this.state.pass,
        location_lat:this.state.location_lat,
        location_lon:this.state.location_lon,
      };

      console.log(user_obj);
      CreateUser(user_obj);
    }
    else if(type === 'Supplier')
    {
      let user_obj = {
        fullname: this.state.fullname,
        account_type: this.state.selected2,
        city: this.state.city,
        email: this.state.email,
        phoneNo: this.state.phoneNo,
        pass: this.state.pass,
      };
      
    console.log(user_obj);
    CreateUser(user_obj);
    }
    
  }
  render() {
    return (
      <Container>
        <Content padder>
          <View style={{margin: 10}} />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 30}}>Create An Account</Text>
            <Text style={{}}>Please provide correct details</Text>
          </View>
          <View style={{margin: 10}} />

          <Form>
            <View style={styles.container}>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Full Name</Label>
                  <Input
                    onChangeText={text => this.setState({fullname: text})}
                  />
                </Item>
              </View>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Account Type</Label>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{width: undefined}}
                      placeholder="Select account type"
                      placeholderStyle={{color: '#bfc6ea'}}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.selected2}
                      onValueChange={this.onValueChange2.bind(this)}>
                      <Picker.Item label="Supplier" value="Supplier" />
                      <Picker.Item label="Reciever" value="Reciever" />
                    </Picker>
                  </Item>
                </Item>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Phone No</Label>
                  <Input
                    onChangeText={text => this.setState({phoneNo: text})}
                  />
                </Item>
              </View>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>City</Label>
                  <Input onChangeText={text => this.setState({city: text})} />
                </Item>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Email Address</Label>
                  <Input onChangeText={text => this.setState({email: text})} />
                </Item>
              </View>
              <View style={styles.item}>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input
                    secureTextEntry={true}
                    onChangeText={text => this.setState({pass: text})}
                  />
                </Item>
              </View>
            </View>
          </Form>

          <View style={{margin: 20}} />

          <Button
            dark
            block
            style={{backgroundColor: '#1e272e'}}
            onPress={this.CreateUserAccount}>
            <Text> Sign Up </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '50%', // is 50% of container width
  },
});

export default Sign_up;
