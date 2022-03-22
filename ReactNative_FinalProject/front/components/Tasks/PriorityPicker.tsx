import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ButtonGroup} from "react-native-elements";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {useAppContext} from "../Context/AppContext";
import {setPriority} from "./services/tasks";

type PriorityProps = {
    value: string,
    optionsArray: { label: string; value: string; color: string }[],
    onChange: (...event: any[]) => void
    taskID?: string
}

const PriorityPicker = ({value, optionsArray, onChange, taskID}: PriorityProps) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const {setReload, token} = useAppContext();

    useEffect(() => {
        setSelectedIndex(buttons.indexOf(value))
    }, [value])

    const updatePriority = async (priority: string) => {
        if(!taskID) return
        await setPriority(priority, taskID, token)
        setReload();
    }

    const buttons = optionsArray.map(i => i.label)
    const color = optionsArray.map(i => i.color)

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    )

    return (
        <ButtonGroup
            buttons={['Высокий', 'Средний', 'Низкий']}
            selectedIndex={selectedIndex}
            onPress={(value) => {
                setSelectedIndex(value);
                onChange(buttons[value]);
                updatePriority(buttons[value]);
            }}
            Component={TouchableOpacity}
            containerStyle={{
                borderRadius: 30,
                borderWidth: 0,
                marginLeft: 0,
                height: 28,
                marginTop: 5,
                marginBottom: 0,
                width: 225,
                backgroundColor: colors.background
            }}
            buttonStyle={{
                borderRadius: 30,
                borderWidth: 1,
                backgroundColor: colors.background,
                width: 70,
                borderColor: colors.text
            }}
            buttonContainerStyle={{
                borderRadius: 30,
                borderRightWidth: 0,
                margin: 0,
                marginLeft: 5,
            }}
            selectedTextStyle={{
                color: color[selectedIndex]
            }}
            selectedButtonStyle={{
                backgroundColor: colors.background,
                borderColor: color[selectedIndex]
            }}
            textStyle={{
                fontSize: 10,
                color: colors.text
            }}
        />
    )

}
const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    radio: {
        marginTop: 5,
    },
    radio__wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 240,
        height: 50,
    }
})
    return styles}


export default PriorityPicker;
