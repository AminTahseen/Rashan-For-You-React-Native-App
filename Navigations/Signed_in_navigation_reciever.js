import Submit_request from '../SignedIn_Screens/Submit_request';
import Profile from '../SignedIn_Screens/Profile';
import Show_all_requests from '../SignedIn_Screens/Supplier_Requests/Show_all_requests';

import Sign_in from '../SignedOut_Screens/Sign_in';
import Sign_up from '../SignedOut_Screens/Sign_up';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {View} from 'react-native';

import React, { Component } from 'react';

import { Icon,Content } from 'native-base';
import Home from '../SignedIn_Screens/Home';
import Show_all_supplier_request_for_package from '../SignedIn_Screens/Show_all_supplier_request_for_package';
import Selected_request_for_approval from '../SignedIn_Screens/Selected_request_for_approval';
import Proceed_to_delivery_screen from '../SignedIn_Screens/Proceed_to_delivery_screen';

const stack_for_supplier_Requests = createStackNavigator({
  supplier_requests: {screen: Home},
  show_all_supplier_request_for_package: {screen: Show_all_supplier_request_for_package},
  selected_request_for_approval: {screen: Selected_request_for_approval},
  proceed_to_delivery: {screen: Proceed_to_delivery_screen},

  });

const screens = {
    Home: {
      screen: Submit_request,
      navigationOptions: {
        tabBarLabel: 'Make Request',
        tabBarIcon: ({ tintColor }) => (  
            <Content>  
          <Icon name='list-alt' type="FontAwesome" />
            </Content>)
    }
    },
    Supplier_Requests: {
      screen:stack_for_supplier_Requests,
      navigationOptions: {
        tabBarLabel: 'Suppliers Requests',
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