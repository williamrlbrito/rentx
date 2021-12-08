import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingCompleted } from '../screens/SchedulingCompleted';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { Signin } from '../screens/Signin';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';

const {Navigator, Screen} = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }} initialRouteName="Signin">
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="Signin"
        component={Signin}
      />
      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="SchedulingCompleted"
        component={SchedulingCompleted}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  );
}
