import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ConnectScreen,
  ProfileScreen,
  DashboardScreen,
  ReviewScreen,
  ResourceScreen
} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Display } from '../utils';
import { Colors } from '../constants';

const BottomTabs = createBottomTabNavigator();

export default () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: Display.setHeight(6),
        backgroundColor: Colors.LIGHT_GREY,
        borderTopWidth: .5,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.DEFAULT_GREEN,
      tabBarInactiveTintColor: Colors.INACTIVE_GREY,
    }}
    op>
    <BottomTabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="view-dashboard-outline" size={23} color={color} />
        ),
      }}
    />
    {/* <BottomTabs.Screen
      name="Connect"
      component={ConnectScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="send" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Review"
      component={ReviewScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="comment-text-multiple-outline" size={23} color={color} />
        ),
      }}
    /> */}
    <BottomTabs.Screen
      name="Resource"
      component={ResourceScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="book-open" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Feather name="user" size={23} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);