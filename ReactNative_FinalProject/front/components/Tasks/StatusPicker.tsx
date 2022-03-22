import React, {useCallback, useContext, useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";
import {ButtonGroup} from "react-native-elements";
import {setStatus} from "./services/tasks";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {useAppContext} from "../Context/AppContext";

type StatusProps = {
    value: string,
    optionsArray: { label: string; value: string; color: string }[],
    onChange: (...event: any[]) => void,
    taskID: string
}

const StatusPicker = ({value, optionsArray, onChange, taskID}: StatusProps) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const {setReload, token} = useAppContext();

    const {colors} = useContext(ThemeContext)

    useEffect(() => {
        setSelectedIndex(buttons.indexOf(value))
    }, [])

    const updateStatus = useCallback(async (status: string) => {
        await setStatus(status, taskID, token)
        setReload();
    }, []);


    const buttons = optionsArray.map(i => i.label)

    return (

        <ButtonGroup
            buttons={buttons}
            selectedIndex={selectedIndex}
            onPress={(value) => {
                setSelectedIndex(value);
                onChange(buttons[value]);
                updateStatus(buttons[value]);
            }}
            Component={TouchableOpacity}
            containerStyle={{
                borderRadius: 30,
                borderWidth: 0,
                marginLeft: 0,
                height: 27,
                marginTop: 5,
                marginBottom: 1,
                backgroundColor: colors.background
            }}
            buttonStyle={{
                borderRadius: 30,
                borderWidth: 1,
                backgroundColor: colors.background,
                borderColor: colors.borderPicker
            }}
            buttonContainerStyle={{
                borderRadius: 30,
                borderRightWidth: 0,
                margin: 0,
                marginLeft: 5,
            }}
            selectedTextStyle={{
                color: '#0090ff'
            }}
            selectedButtonStyle={{
                backgroundColor: colors.background,
                borderColor: '#0090ff',
                borderRadius: 30,
            }}
            textStyle={{
                fontSize: 10,
                color: colors.text
            }}
        />
    )
}

export default StatusPicker;
