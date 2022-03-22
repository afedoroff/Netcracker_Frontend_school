import {TextInput} from "react-native-paper";
import {Pressable} from "native-base";
import React, {useContext, useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {StyleSheet} from "react-native";
import {dateToSting} from "./utils/StringDate";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";

type DateInputProps = {
  label: string,
  value: Date | undefined,
  onChange: (...event: any[]) => void;
};

const DateInput = ({label, value, onChange}: DateInputProps) => {

  const setDate = (date: Date | undefined) => {
    let textDate = "";
    if (date != undefined) {
      textDate = dateToSting(date);
    }
    return textDate;
  }

  //const [date, setDateText] = useState(setDate(value));
  const [showPicker, setShowPicker] = useState(false)

  const {colors} = useContext(ThemeContext)

  const styles = React.useMemo(
      () => createStyles(colors),
      [colors]
  );

  return(
      <Pressable
          onPress={() => {
            setShowPicker(true);
          }}>
        <TextInput
            value={setDate(value)}
            mode="outlined"
            editable={false}
            theme={{
              colors: {
                text: colors.text,
                placeholder: colors.subText
              }
            }}
            label={label}
            outlineColor={colors.textInputBorder}
            activeOutlineColor={colors.textActiveInputBorder}
            underlineColor={colors.textInputBorder}
            style={styles.input}
        />
        {
          showPicker && (
              <DateTimePicker
                  value={new Date()}
                  minimumDate={new Date()}
                  onChange={(event: Event, selectedDate?: Date | undefined) => {
                    setShowPicker(false);
                    //selectedDate?.setDate(selectedDate?.getDate()+1)
                    setDate(selectedDate);
                    onChange(selectedDate);
                  }}
              />
          )
        }
      </Pressable>
  )
}
const createStyles = (colors: ColorTheme) => {
  const styles = StyleSheet.create({
    input: {
      marginTop: 5,
      height: 35,
      backgroundColor: colors.background,
    }
  })

  return styles}

export default DateInput;
