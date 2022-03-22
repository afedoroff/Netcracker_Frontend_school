import React, {useContext, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Box} from "native-base";
import {ColorTheme} from "../../Constant/Colors";
import {ThemeContext} from "../../Providers/ThemeProvider.";
import {IUser} from "../../Interfaces/Interfaces";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


type UserStatisticProps = {
  users: IUser[],
    specialization: string,
    nameSpec: string
}

function UsersStatistic({users, specialization, nameSpec}: UserStatisticProps) {

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (
        <Box style={styles.statistic__item_container}>
            <Box style={styles.statistic__item}>
                <MaterialCommunityIcons style={{marginLeft: 3}} name="account" color="#fff" size={25}/>
                <Text style={styles.statistic__item_text}>{
                    users.filter(i => specialization.includes(i.specialization)).length
                }</Text>
            </Box>
            <Text style={styles.statistic__item_subText}>{nameSpec}</Text>
        </Box>
    )
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        statistic__item: {
            borderRadius: 90,
            height: 80,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            marginLeft: 15,
            marginRight: 15,
            borderWidth: 4,
            borderColor: '#fff'
        },
        statistic__item_text: {
            fontSize: 16,
            color: '#fff'
        },
        statistic__item_container: {
            alignItems: 'center',
            marginLeft: 8,
            marginRight: 8
        },
        statistic__item_subText: {
            fontSize: 12,
            fontFamily: 'main',
            marginTop: 8,
            color: 'white'
        }
    })
    return styles};

export default UsersStatistic;
