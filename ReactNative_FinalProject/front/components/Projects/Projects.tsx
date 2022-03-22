import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, Box, View, Switch, Spinner} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native'
import CardProject from './components/CardProject';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigations/NavigationProjects';
import {FAB} from "react-native-elements";
import {IProject, IUser} from "../Interfaces/Interfaces";
import {Searchbar, Text} from "react-native-paper"
import LinearGradient from "react-native-linear-gradient";
import * as Keychain from 'react-native-keychain';
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {useAppContext} from '../Context/AppContext';
import {getCurrentUser, getProjects, getUsers} from './services/projects';
import UsersStatistic from "./components/UsersStatistic";
import {specializationList} from "./utils/specializationList";

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'EditProject'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

function Projects({navigation}: Props) {
    const [isFilteredProject, setIsFilteredProject] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<IUser[]>([])
    const [user, setUser] = useState<IUser>();
    const {reloadTasks} = useAppContext();
    const {userID, token, setAuth} = useAppContext();
    const [projectsData, setProjectsData] = useState<IProject[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<IProject[]>()
    const [search, setSearch] = useState('')

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    useEffect(() => {
        getProjects(token)
            .then(result => {
                if (result.message === 'Нет авторизации') {
                    resetCredentials().then(res => console.log(res))
                    setAuth()
                } else {
                    setProjectsData(result);
                    setFilteredProjects(result);
                    setLoading(false)
                }
                return true
            })
            .then(async () => {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    getCurrentUser(credentials.password, token)
                        .then(result => setUser(result))
                        .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
    }, [reloadTasks])

    useEffect(() => {
        getUsers(token).then(res => setUsers(res))
    }, [reloadTasks])

    useEffect(() => {
        filterProjects()
    }, [search, isFilteredProject, reloadTasks])

    const setSearchValue = (value: any) => {
        setSearch(value)
    }

    const filterProjects = useCallback(() => {
        let result;
        const searched = projectsData.filter(item => item.projectName.toLowerCase().includes(search.toLowerCase()));
        if (isFilteredProject && (searched.length !== 0)) {
            console.log('попытка')
            result = searched.filter(({participants: arr}) => arr.some(item => item?._id === userID));

            console.log(result)
        } else {
            result = searched
        }
        setFilteredProjects(result)
    }, [search, isFilteredProject])

    const resetCredentials = async () => {
        await Keychain.resetGenericPassword()
    }


    return (
        <View style={styles.wrapper}>
            <LinearGradient colors={colors.gradient} style={styles.header__gradient}>
                <Box style={styles.header}>
                    <Text style={styles.header__label}>Проекты</Text>
                    <Switch
                        style={{
                            position: 'absolute',
                            right: 15,
                            top: 10
                        }}
                        size="lg"
                        onToggle={() => setIsFilteredProject(isFilteredProject => !isFilteredProject)}
                        isChecked={isFilteredProject}
                    />
                    <Searchbar
                        style={styles.search}
                        placeholder="Поиск..."
                        onChangeText={setSearchValue}
                        inputStyle={{
                            fontSize: 16,
                            lineHeight: 16
                        }}
                        iconColor={'#2948ff'}
                        value={search}
                    />
                    <Box style={styles.statistic}>
                        <FlatList
                            style={{
                                width: '100%'
                            }}
                            keyExtractor={(item) => item.specialization}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            decelerationRate='fast'
                            snapToAlignment='center'
                            scrollEventThrottle={16}
                            snapToOffsets={[...Array(specializationList.length)].map((x, i) => (i * SCREEN_WIDTH))}
                            data={specializationList}
                            renderItem={({item}) => (
                                <UsersStatistic users={users} specialization={item.specialization}
                                                nameSpec={item.nameSpec}/>
                            )}/>
                    </Box>
                </Box>
            </LinearGradient>
            {loading ?
                <Spinner style={styles.spinner}/> :
                ((filteredProjects.length !== 0) ?
                (<FlatList
                horizontal={true}
                decelerationRate='fast'
                snapToAlignment='center'
                scrollEventThrottle={16}
                snapToOffsets={[...Array(filteredProjects.length)].map((x, i) => (i * SCREEN_WIDTH))}
                data={filteredProjects}
                renderItem={({item}) => (
                <CardProject project={item} key={item._id} navigation={navigation}/>
                )}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                />) :
                (
                <Text style={styles.text_error}>Вы не участвуете в проектах</Text>
                )
                )
            }
            <FAB
                icon={{name: 'add', color: 'white'}}
                color={colors.borderColor}
                style={{bottom: 55}}
                onPress={() => {
                    navigation.navigate('CreateProject', {user})
                }}
                placement={'right'}
            />
        </View>
    );
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        header: {
            borderBottomRightRadius: 24,
        },
        header__gradient: {
            borderBottomRightRadius: 24,

        },
        header__label: {
            fontFamily: 'main',
            fontSize: 32,
            color: 'white',
            marginTop: 5,
            marginLeft: 16
        },
        wrapper: {
            flex: 1,
            backgroundColor: colors.background,
        },
        text: {
            marginTop: 4,
            fontSize: 16
        },
        search: {
            marginTop: 15,
            borderRadius: 33,
            marginLeft: 21,
            marginRight: 21,
            height: 40
        },
        statistic: {
            marginTop: 15,
            marginBottom: 15,
            height: 110,
            width: '100%',
            flexWrap: "wrap",
            justifyContent: 'center',
            alignContent: "center",
        },
        spinner: {
            marginTop: '50%'
        },
        text_error: {
            marginTop: '40%',
            width: '100%',
            textAlign: 'center',
            fontFamily: 'main',
            fontSize: 24,
            color: colors.text
        }

    })
    return styles
}

export default Projects;
