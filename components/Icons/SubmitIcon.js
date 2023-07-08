import React from 'react'
import { StyleSheet,View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const SubmitIcon = ({antIconName,size,color,onPress,style}) => {
  return (

      <AntDesign  name={antIconName}
      size={size || 24}
      color={color || Colors.LIGHT}
      style={[styles.icon, { ...style}]}
      onPress={onPress}/>

  )
}

export default SubmitIcon

const styles = StyleSheet.create({})