import React from "react"

import { useColorScheme } from "react-native"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"

import { observer } from "mobx-react-lite"

import { WelcomeScreen } from "screens"
import { navigationRef } from "./navigationUtilities"

import { AppStackParamList, NavigationProps } from "./props"

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  )
})

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
