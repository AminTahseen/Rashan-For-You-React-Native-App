import Home from '../SignedIn_Screens/Home';
import Profile from '../SignedIn_Screens/Profile';
import Rashan_packages from '../SignedIn_Screens/Rashan_screens/Rashan_packages';
import Add_Rashan_package from '../SignedIn_Screens/Rashan_screens/Add_Rashan_package';

import Sign_in from '../SignedOut_Screens/Sign_in';
import Sign_up from '../SignedOut_Screens/Sign_up';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {View} from 'react-native';

import React, { Component } from 'react';

import { Icon,Content } from 'native-base';
import Show_all_requests from '../SignedIn_Screens/Supplier_Requests/Show_all_requests';
import Provide_rashan_screen from '../SignedIn_Screens/Supplier_Requests/Provide_rashan_screen';
import Waiting_for_approval_screen  from '../SignedIn_Screens/Supplier_Requests/Waiting_for_approval_screen';
import Show_map_for_delivery  from "../SignedIn_Screens/Show_map_for_delivery";
import GotoDelivery from '../SignedIn_Screens/GotoDelivery';

const stack_for_Requests = createStackNavigator({
  home: {screen: Show_all_requests},
  provide_rashan: {screen: Provide_rashan_screen},
  waiting_for_approval: {screen: Waiting_for_approval_screen},
  show_map: {screen: Show_map_for_delivery},
  delivery_mark: {screen: GotoDelivery},
  });

const stack_for_Rashan_packages = createStackNavigator({
  rashan_Package: {screen: Rashan_packages},
  add_rashan_package: {screen: Add_Rashan_package},
  });

const screens = {
    Home: {
      screen: stack_for_Requests,
      navigationOptions: {
        tabBarLabel: 'Requests',
        tabBarIcon: ({ tintColor }) => (  
            <Content>  
          <Icon name='list-alt' type="FontAwesome" />
            </Content>)
    }
    },
    Rashan_Packages: {
      screen:stack_for_Rashan_packages,
      navigationOptions: {
        tabBarLabel: 'Ration',
        tabBarIcon: ({ tintColor }) => (  
            <Content>  
          <Icon name='gift' type="FontAwesome" />
            </Content>) 
    }
  },
    Profile: {
        screen:Profile,
        navigationOptions: {
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ tintColor }) => (  
              <Content>  
            <Icon name='user' type="FontAwesome" />
              </Content>)
      }
    }
  };

const tabNavigator = createMaterialBottomTabNavigator(screens, {
    initialRouteName:'Home',
    activeColor: '#c0392b',
    inactiveColor: '#2f3542',
    barStyle: {backgroundColor: '#ecf0f1'},
});



const AppContainer = createAppContainer(tabNavigator);

export default AppContainer;