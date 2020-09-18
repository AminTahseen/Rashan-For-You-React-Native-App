import React, {Component} from 'react';
import {Linking} from 'react-native'
import {
  Container,
  Header,
  Body,
  Title,
  Card,
  CardItem,
  Text,
  Content,
  Button,
  Right,
  Icon,
} from 'native-base';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  _Text,
  StyleSheet,
} from 'react-native';
import {
  fetchSupplierRequestDataForPackage,
  fetchSupplierRequestData,
  UpdateSupplierRequest,
  CreateDeliveryForRashan,
} from '../Services/RequestService';
import {fetchCertainPackageData} from '../Services/RationService';

import {Logout, fetchReceiverUserData, fetchUserData,} from '../Services/UserService';
import firebase, {auth} from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {TextInput} from 'react-native-gesture-handler';
import MapView, {Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: 'auto',
    height: 300,
  },
});
class Show_map_for_delivery extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      loggedIn_location_lat:0.0,
      loggedIn_location_lon:0.0,
      logged_inUser:'',
      receiver_User:'',
      receiver_User_lat:0.0,
      receiver_User_lon:0.0,
      };
    this.Load_Data = this.Load_Data.bind(this);
    this.Delivery_button = this.Delivery_button.bind(this);
  }
  componentDidMount() 
  {
    const user = firebase.auth().currentUser;
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
            this.setState({
              loggedIn_location_lat:latitude,
              loggedIn_location_lon:longitude,
              logged_inUser:fetchUserData(user.uid),
              receiver_User:this.props.navigation.state.params.item,
            })

        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      ); 

  
  

  }
  Load_Data() 
  {
    const user = firebase.auth().currentUser;
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
          this.setState({
            loggedIn_location_lat:latitude,
            loggedIn_location_lon:longitude,
            logged_inUser:fetchUserData(user.uid),
            receiver_User:this.props.navigation.state.params.item,
          })

      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    ); 
  }

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };

  Delivery_button() {
    this.props.navigation.navigate('delivery_mark',{item:this.props.navigation.state.params.item2});
  }

  render() {
    const origin = {latitude: this.state.loggedIn_location_lat, longitude: this.state.loggedIn_location_lon};
    const destination = {latitude: this.state.receiver_User.location_lat ? this.state.receiver_User.location_lat : 0,
                         longitude: this.state.receiver_User.location_lon ? this.state.receiver_User.location_lon : 0};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAzxaxItju37BoaQ1zYMsRVIPLPxgc8s98';
    return (
      <Container>
        <Header style={{backgroundColor: '#ecf0f1'}}>
          <Body>
            <Title style={{color: '#2c3e50'}}>Rashan | Map</Title>
          </Body>
        </Header>

        <View style={styles.container}>
          <MapView
            style={styles.mapcontainer}
            zoomEnabled={true}
            region={{
              latitude: this.state.loggedIn_location_lat,
              longitude: this.state.loggedIn_location_lon,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
            }}>
            <MapView.Marker
              coordinate={origin}
              title={'You'}
              description={'Contact : '+this.state.logged_inUser.phoneNo}
            />
            <MapView.Marker
              coordinate={destination}
              title={this.state.receiver_User.fullname+' ('+this.state.receiver_User.account_type+')'}
              description={'Contact : '+this.state.receiver_User.phoneNo}
            />
            <Polyline
              coordinates={[origin,destination]}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                '#7F0000',
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              ]}
              strokeWidth={6}
            />
          </MapView>
        </View>
        <Button dark block style={{backgroundColor: '#2980b9', color: '#fff'}} onPress={this.Load_Data}>
          <Text> Refresh Location </Text>
        </Button>
        <Button dark block style={{backgroundColor: '#27ae60', color: '#fff'}} onPress={()=>{this.dialCall(this.state.receiver_User.phoneNo)}}>
          <Text> Contact Receiver </Text>
        </Button>
        <Button dark block style={{backgroundColor: '#1e272e', color: '#fff'}} onPress={this.Delivery_button}>
          <Text> Destination Reached </Text>
        </Button>
      </Container>
    );
  }
}

export default Show_map_for_delivery;
