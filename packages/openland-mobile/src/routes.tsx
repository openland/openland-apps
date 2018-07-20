// import React from 'react';
// import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
// import { AuthSession } from 'expo';
// import qs from 'query-string';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { LoginLoader } from './LoginLoader';
import { Login } from './pages/auth/Login';
import { Root } from './pages/main/Root';
import { Home } from './pages/main/Home';

// class App extends React.Component<{}, {}> {

//   componentDidMount() {
//     // Start check
//   }

//   componentWillUnmount() {
//     //
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Welcome to Openland!</Text>
//         <View flexDirection="column">
//           <Button title="Login with Google" onPress={this.handlePress} />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export const AppStack = createStackNavigator({
  Home: Home
});

export const LoginStack = createStackNavigator({
  Home: Login
});

export default createSwitchNavigator(
  {
    Root: LoginLoader,
    App: Root,
    Login: LoginStack
  },
  { initialRouteName: 'Root' }
);