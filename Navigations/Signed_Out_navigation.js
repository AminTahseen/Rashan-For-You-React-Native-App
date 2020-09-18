import Sign_in from '../SignedOut_Screens/Sign_in';
import Sign_up from '../SignedOut_Screens/Sign_up';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const screens = {
    sign_in: {
      screen: Sign_in,
      title: 'Sign in',
    },
    sign_up: {
      screen: Sign_up,
      title: 'Sign Up'
    },
  };

  const stackNavigator = createStackNavigator(screens, {
    initialRouteName: 'sign_in',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ecf0f1',
        },
        headerTintColor: '#2c3e50',
        headerTitleStyle: {
            fontWeight: 'normal',
        },
    },
});


const AppContainer = createAppContainer(stackNavigator);

export default AppContainer;