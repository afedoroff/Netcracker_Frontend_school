import {Button, Divider, Text, View, Switch, Spinner} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet,} from 'react-native';
import {Avatar} from "react-native-elements";
import {ProfileScreenNavigationProp} from "../Projects/Projects";
import LinearGradient from "react-native-linear-gradient";
import Icon, {Icons} from '../Navigations/Icons';
import {ThemeContext} from '../Providers/ThemeProvider.';
import {useAppContext} from "../Context/AppContext";
import {ip} from "../../IPAddress";
import * as Keychain from 'react-native-keychain';
import {ColorTheme} from "../Constant/Colors";
import {avatarDefault} from '../Auth/utils/avatarDefault'
import {IUser} from "../Interfaces/Interfaces";

type Props = {
    navigation: ProfileScreenNavigationProp;
};

function Profile({navigation}: Props) {
    const [user, setUser] = useState<IUser>()
    const [loading, setLoading] = useState(true);
    const {colors, isDark, setColorScheme} = useContext(ThemeContext);
    const {setAuth} = useAppContext()
    const {userID} = useAppContext();

    const handleChangeColorTheme = () => setColorScheme(isDark ? 'light' : 'dark');

    useEffect(() => {
        fetch(`https:/${ip}/user/getUser?id=${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(result => {
                setUser(result);
                setLoading(!loading)
            })
            .catch(error => console.error(error));
    }, [userID])

    const logout = async () => {
        await Keychain.resetGenericPassword();
        setAuth();
        return true
    }

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (
        <SafeAreaView>
            {loading ?
                (<View style={styles.spinner__wrapper}>
                    <Spinner/>
                </View>) :
                (<LinearGradient colors={colors.gradient} style={styles.background}>
                    <View style={styles.header}>
                        <Text style={styles.header__text}>Профиль</Text>
                    </View>
                    <View style={styles.theme__container}>
                        <Icon size={29} type={Icons.Feather} name={'sun'} color={'#fff'}/>
                        <Switch
                            style={styles.theme__switch}
                            isChecked={isDark}
                            onToggle={handleChangeColorTheme}
                            offTrackColor="indigo.100"
                            onTrackColor="indigo.200"
                            onThumbColor="indigo.500"
                            offThumbColor="indigo.50"
                            size='lg'
                        />
                        <Icon size={29} type={Icons.Feather} name={'moon'} color={'#fff'}/>
                    </View>
                    <View style={styles.userContainer}>
                        <Avatar
                            size={105}
                            rounded
                            source={{uri: (user.avatar) ? user.avatar : avatarDefault}}
                            containerStyle={styles.user__avatar}
                        />
                        <Text style={styles.user__username}>{user.username}</Text>
                    </View>
                    <View style={styles.mainContainer}>
                        <Divider style={styles.divider}/>
                        <View style={styles.main__info}>
                            <View style={styles.main__info_block}>
                                <Text style={styles.main__info_item}>Имя: </Text>
                                <Text style={styles.info_item__text}>{user.firstName}</Text>
                            </View>
                            <Divider/>
                            <View style={styles.main__info_block}>
                                <Text style={styles.main__info_item}>Фамилия: </Text>
                                <Text style={styles.info_item__text}>{user.lastName}</Text>
                            </View>
                            <Divider/>
                            <View style={styles.main__info_block}>
                                <Text style={styles.main__info_item}>Специализация: </Text>
                                <Text style={styles.info_item__text}>{user.specialization}</Text>
                            </View>
                            <Divider/>
                            <View style={styles.main__info_block}>
                                <Text style={styles.main__info_item}>e-mail: </Text>
                                <Text style={styles.info_item__text}>{user.email}</Text>
                            </View>
                            <Divider/>
                            <View style={styles.main__info_block}>
                                <Text style={styles.main__info_item}>Роль: </Text>
                                <Text style={styles.info_item__text}>{user.type}</Text>
                            </View>
                            <Divider/>
                            <Divider/>
                        </View>

                        <View style={styles.button__container}>
                            <Button
                                _text={
                                    {
                                        fontFamily: 'main',
                                        color: 'rgb(243,47,47)',
                                        fontSize: 14,
                                        padding: 0
                                    }
                                }
                                style={styles.button_logout}
                                onPress={logout}
                            >Выйти</Button>
                        </View>
                    </View>
                </LinearGradient>)
            }
        </SafeAreaView>
    );
}

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    background: {
        height: '100%'
    },
    header: {},
    divider: {
        width: '30%',
        marginLeft: '35%',
        marginRight: '35%',
        height: 3,
        marginTop: "28%",
        backgroundColor: colors.borderColor,
        borderRadius: 30
    },
    header__text: {
        fontFamily: 'main',
        fontSize: 32,
        lineHeight: 42,
        color: 'white',
        marginTop: 5,
        marginLeft: 16
    },
    userContainer: {
        height: 210,
        width: '64%',
        position: 'absolute',
        top: '15%',
        left: '18%',
        borderRadius: 35,
        elevation: 2,
        backgroundColor: colors.background_light,
        alignItems: 'center'
    },
    mainContainer: {
        backgroundColor: colors.background_light,
        position: 'absolute',
        bottom: 80,
        left: 14,
        width: '93%',
        height: '60%',
        borderRadius: 20
    },
    user__avatar: {
        marginTop: 40,
        elevation: 10
    },
    user__username: {
        fontFamily: 'main',
        fontSize: 24,
        marginTop: 15,
        lineHeight: 30,
        color: colors.text
    },
    main__info: {
        marginTop: '10%',
        width: '90%',
        marginLeft: '5%',
        padding: 15,
        elevation: 4,
        backgroundColor: colors.background_light,
        borderRadius: 10,
    },
    main__info_block: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    main__info_item: {
        color: colors.subText,
        fontFamily: 'main',
        fontSize: 16,
    },
    info_item__text: {
        fontFamily: 'main',
        color: colors.text
    },
    button__container: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center'
    },
    button_logout: {
        backgroundColor: colors.background_light,
        width: 120,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgb(243,47,47)',
    },
    theme__container: {
        alignItems: "center",
        flexDirection: "row",
        position: 'absolute',
        right: 16,
        top: 10
    },
    theme__switch: {
        marginLeft: 10,
        marginRight: 10
    },
    spinner__wrapper: {
        height: '90%',
        justifyContent: 'center'
    }
})
    return styles}

export default Profile;
