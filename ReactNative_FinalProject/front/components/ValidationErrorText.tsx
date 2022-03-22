import {Text} from "native-base";
import React from "react";
import {StyleSheet} from "react-native";

type ValidationErrorTextProps = {
  errorMessage?: string
}

const ValidationErrorText = ({errorMessage}: ValidationErrorTextProps) => {
  return (
    errorMessage
      ?
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      :
      <Text style={styles.errorMessage}> </Text>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 12,
    color: 'red',
    marginTop: -6
  }
})

export default ValidationErrorText;