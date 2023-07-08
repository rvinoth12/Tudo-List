import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Note from './screens/Note'

// navigation
const Navi = createStackNavigator(); 

const MainApp = () => {
  return (

      <NavigationContainer>
        <Navi.Navigator initialRouteName='NotePad' screenOptions={{headerShown:false}}>
          {/* <Navi.Screen  name='note' component={Intro}/> */}
          <Navi.Screen name='Note Pad' component={Note}/>
          {/* <Navi.Screen name='Inset Note' component={InsertNotes}/> */}
        </Navi.Navigator>
      </NavigationContainer>


  )
}

export default MainApp;