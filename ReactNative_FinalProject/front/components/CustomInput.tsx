import React, {useContext} from "react";
import {Input} from "react-native-elements";
import {ThemeContext} from "./Providers/ThemeProvider.";

export type InputProps = {
  state?: string,
  setState?: any,
  placeholder: string,
  label?: string,
  iconType?: string,
  iconName?: string,
  secure?: boolean,
  name?: string,
  error?: string
}

const CustomInput = ({state, setState, placeholder, label, iconType, iconName, secure, error}: InputProps) => {
  const {colors} = useContext(ThemeContext)

    return (<Input
      selectionColor={'white'}
      placeholder={placeholder}
      value={state}
      label={label}
      renderErrorMessage={true}
      errorMessage={error}
      errorStyle={{marginBottom: 20}}
      onChangeText={setState}
      secureTextEntry={secure}
      placeholderTextColor='rgba(255,255,255,0.7)'
        style={{
            color: 'white'
        }}
        labelStyle={{
            position: 'absolute',
            zIndex: 2,
            top: -8,
            left: 25,
            color: 'white',
            borderRadius: 30,
            paddingLeft: 4,
            paddingRight: 4,
            borderWidth: 1,
            borderColor: 'white',
            marginLeft: 23,
            fontFamily: 'main',
            fontSize: 10,
            fontWeight: 'normal',
            backgroundColor: colors.statistic_item
        }}
        inputContainerStyle={{
            height: 45,
            borderRadius: 40,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'white',
            paddingLeft: 15,
            backgroundColor: 'rgba(0,0,0,0.09)'
        }}
        inputStyle={{
            fontFamily: 'main',
            color: 'white',
            fontSize: 15
        }}
        leftIcon={{type: iconType, name: iconName, color: 'white'}}
    />)
}

export default CustomInput
