import {StackNavigationProp} from '@react-navigation/stack';
import {Spinner, View} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import CardTask from '../Cards/CardTask';
import {RootStackParamList} from '../Navigations/NavigationProjects';
import {ITask} from '../Interfaces/Interfaces';
import {ProfileScreenNavigationProp} from '../Projects/Projects';
import LinearGradient from "react-native-linear-gradient";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {getMyTasks} from "../Tasks/services/tasks";
import {useAppContext} from "../Context/AppContext";

export type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Task'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

function MyTasks({navigation}: Props) {

    const [data, setData] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);
    const {userID, reloadTasks, token} = useAppContext();

    useEffect(() => {
        if(!userID) return;
        getMyTasks(userID, token).then(result => {
            setLoading(false)
            setData(result);
        })
    }, [reloadTasks])

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );


    return (<SafeAreaView style={styles.container}>
        <LinearGradient colors={colors.gradient} style={styles.header__gradient}>
            <View style={styles.header}>
                <Text style={styles.header__label}>Задачи</Text>
            </View>
            </LinearGradient>
            {loading ? (
                <View style={styles.spinner__wrapper}>
                   <Spinner/>
                </View>
            ) : (
                (data.length !== 0) ? (<><FlatList
                        data={data}
                        renderItem={({item}) => <CardTask task={item} navigation={navigation} key={item._id}/>}/></>)
                : <Text style={styles.error_text}>У вас пока нет задач</Text>
            )}
        </SafeAreaView>
    );
}

export default MyTasks;

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        height: '100%',
        paddingBottom: 55
    },
    header: {
        borderBottomRightRadius: 24,
        height: 54,
    },
    header__gradient: {
        borderBottomRightRadius: 24,
    },
    header__label: {
        fontFamily: 'main',
        fontSize: 26,
        lineHeight: 26,
        color: 'white',
        marginTop: 15,
        marginLeft: 16,
    },
    spinner__wrapper: {
        height: '90%',
        justifyContent: 'center'
    },
    error_text: {
        marginTop: '80%',
        color: colors.text,
        fontFamily: 'main',
        fontSize: 24,
        width: '100%',
        textAlign: "center"
    }
})
    return styles};


