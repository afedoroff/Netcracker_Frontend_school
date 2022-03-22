import {Icon, Radio, Text} from "native-base";
import React, {useContext} from "react";
import {Avatar} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {StyleSheet} from "react-native";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";

type NewTaskOptionSelectProps = {
    value: string,
    optionsArray: { label: string; value: string; color: string, icon: string }[],
    onChange: (...event: any[]) => void
}

const ComponentOrTypeTask = ({value, optionsArray, onChange}: NewTaskOptionSelectProps) => {
    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    )

    return (
        <Radio.Group defaultValue={value} value={value} size="lg" name="typeGroup" accessibilityLabel="pick type task"
                     onChange={onChange}>
            {
                optionsArray.map(option => {
                    return (
                        <Radio _text={{
                            mx: 2
                        }} colorScheme='blue' value={option.value} key={option.value}
                               icon={<Icon as={<MaterialCommunityIcons name="check"/>}/>}
                               style={styles.radio}
                        >
                            <Avatar.Icon style={{marginRight: 8, backgroundColor: option.color, marginLeft: 10}}
                                         size={40} icon={option.icon}/>
                            <Text style={styles.option_text}>{option.label}</Text>
                        </Radio>
                    )
                })}
        </Radio.Group>
    )
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        radio: {
            marginTop: 8,
        },
        option_text: {
            color: colors.text
        }
    })

    return styles}

export default ComponentOrTypeTask;

