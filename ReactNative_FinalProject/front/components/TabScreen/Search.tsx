import {Center, Divider, FlatList, HStack, Icon, Text, View} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet,} from 'react-native';
import CardTask from '../Cards/CardTask';
import LinearGradient from 'react-native-linear-gradient';
import Filters from '../Filters';
import {ip} from '../../IPAddress';
import {ITask} from '../Interfaces/Interfaces';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileScreenNavigationProp} from '../Projects/Projects';
import {useAppContext} from '../Context/AppContext';
import {Searchbar} from "react-native-paper";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";

type Props = {
    navigation: ProfileScreenNavigationProp;
};

function SearchTab({navigation}: Props) {
    const [component, setComponent] = useState('all');
    const [type, setType] = useState('all');
    const [status, setStatus] = useState<string[]>([]);

    const [showFilter, setShowFilter] = useState(false);
    const [searchTaskName, setSearch] = useState('')
    const [data, setData] = useState<ITask[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const {reloadTasks, token} = useAppContext();
    const {colors} = useContext(ThemeContext)

    useEffect(() => {
        fetch(`https:/${ip}/task/`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            }})
            .then(response => response.json())
            .then(result => {
                setData(result);
                setFilteredTasks(result)
            })
            .catch(error => console.error(error));
    }, [reloadTasks])


    useEffect(() => {
            handleFilter()
            console.log(filteredTasks)
        }, [data, component, status, type, searchTaskName]
    )

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    const handleFilter = () => {
        let tasksSearch = searchTask()
        let tasks = tasksSearch.filter(task => (component !== 'all') ? task.component === component : (task.component))
        tasks = tasks.filter(task => (type !== 'all') ? task.type === type : (task.type))
        tasks = tasks.filter(task => (status.length !== 0) ? status.indexOf(task.status) !== -1 : task)
        setFilteredTasks(tasks)
    }

    const searchTask = () => {
        return data.filter(task =>
            task.taskName.toLowerCase().includes(searchTaskName.toLowerCase()))
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={colors.gradient} style={styles.header__gradient}>
                <HStack justifyContent='space-between' alignItems="center" w={"98%"}>
                    <View style={styles.header}>
                        <Text style={styles.header__label}>Поиск</Text>
                    </View>
                    <Icon as={MaterialCommunityIcons}
                          name="filter"
                          color="white"
                          onPress={() => setShowFilter(true)}/>
                </HStack>
            </LinearGradient>
            <Filters
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                handleFilter={handleFilter}
                setComponent={setComponent}
                setType={setType}
                setStatus={setStatus}
                status={status}
                type={type}
                component={component}
            />
            <Center style={styles.container} justifyContent="flex-start">
                <Searchbar
                    style={styles.search}
                    placeholder="Поиск..."
                    onChangeText={setSearch}
                    inputStyle={{
                        fontSize: 16,
                        lineHeight: 16
                    }}
                    iconColor={'#2948ff'}
                    value={searchTaskName}
                />
                <Divider/>
                <FlatList
                    ListHeaderComponent={
                        <Text
                            style={styles.text}
                            color={colors.text}
                            fontWeight={300}
                        >
                            {(filteredTasks.length !== 0) ? 'Результаты поиска' : 'Не найдено'}
                        </Text>
                    }
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    data={filteredTasks}
                    renderItem={({item}) => (
                        <CardTask task={item} navigation={navigation} key={item._id}/>
                    )}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                />
            </Center>
        </SafeAreaView>
    );
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        search: {
            marginTop: 15,
            marginBottom: 15,
            borderRadius: 33,
            marginLeft: 21,
            marginRight: 21,
            height: 40,
            backgroundColor: 'white'
        },
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
            marginLeft: 16
        },
        spinner__wrapper: {
            height: '90%',
            justifyContent: 'center'
        },
        text: {
            fontSize: 23,
            lineHeight: 23,
            marginTop: 18,
            marginBottom: 10,
            alignSelf: 'flex-start',
            width: '100%',
            textAlign: 'center',
            fontFamily: 'main'
        }

    })
    return styles
}

export default SearchTab;
