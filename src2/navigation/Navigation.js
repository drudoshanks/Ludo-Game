import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LudoBoard from '../../src/screens/LudoBoard';
import {navigationRef} from '../helpers/NavigationUtil';
import HomeScreen from '../../HomeScreen';
import SplashScreen from '../../SplashScreen';
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={() => ({
          headerShown: false,
        })}>
         <Stack.Screen
          name="LudoBoard"
          options={{
            animation: 'fade',
          }}
          component={LudoBoard}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
       
        <Stack.Screen
          name="HomeScreen"
          options={{
            animation: 'fade',
          }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
