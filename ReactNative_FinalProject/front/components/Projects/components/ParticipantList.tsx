import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from "native-base";
import {Avatar} from 'react-native-elements';
import {avatarDefault} from "../../Auth/utils/avatarDefault";
import {ColorTheme} from "../../Constant/Colors";
import {ThemeContext} from "../../Providers/ThemeProvider.";


type ParticpantProps = {
    username: string,
    avatar: string
}

function ParticipantList({username, avatar}: ParticpantProps) {

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (
        <View style={styles.container}>
            <Avatar
                size={54}
                rounded
                //отрефакторю после внесения базы юзеров
                source={{uri: (avatar) ? avatar : avatarDefault}}
                icon={{name: 'adb', type: 'material'}}
                containerStyle={{backgroundColor: 'orange'}}
            />
            <Text style={styles.text}>{username}</Text>
        </View>
    );
}

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginLeft: 24,
        marginRight: 6
    },
    text: {
        fontSize: 14,
        fontFamily: "main",
        color: colors.text
    },
})
    return styles};

export default ParticipantList;
