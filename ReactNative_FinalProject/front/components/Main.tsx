import React, {useContext} from 'react';
import {StyleSheet} from 'react-native'
import {Box, Link, Center, Text, Button} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

import Icon, {Icons} from "./Navigations/Icons";
import LinearGradient from "react-native-linear-gradient";
import {ThemeContext} from "./Providers/ThemeProvider.";
import {ColorTheme} from "./Constant/Colors";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Main'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const Main = ({navigation}: Props) => {

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (
        <Box style={styles.container}>
            <LinearGradient colors={colors.gradient} style={styles.container__header}>
                <Box style={styles.header__hero}>
                    <Text style={styles.hero__text}>Project Manager</Text>
                        <Icon type={Icons.Fontisto} name={'atom'} color={'white'} size={160}/>
                </Box>

            </LinearGradient>
            <LinearGradient colors={colors.reverseGradient} style={styles.container__auth}>
                <Box style={styles.auth__sub_box}>
                    <Button
                        onPress={() => navigation.navigate('Authorization')}
                        borderTopLeftRadius={30}
                        borderBottomRightRadius={30}
                        borderTopRightRadius={10}
                        borderBottomLeftRadius={10}
                        bgColor='rgba(255,255,255,0.0)'
                        borderColor= {colors.borderColor}
                        borderWidth='2'
                        _text={{
                            color: colors.borderColor,
                            fontFamily: 'main',
                            fontSize: 19
                        }}
                        alignSelf="center"
                        mt="20%" size="lg"
                        width="190"
                        height="50"
                    >
                        Войти
                    </Button>
                    <Center flex={1} mt="15">
                        <Text fontWeight="400" color={colors.text}>
                            Еще не зарегистрированы?
                        </Text>
                        <Link href=""
                              onPress={() => navigation.navigate('Registration')}
                              _text={{
                                  textDecoration: "none",
                                  color: colors.registerText,
                                  fontSize: 16,
                                  fontWeight: "500",
                              }}
                        >
                            Зарегистрироваться
                        </Link>
                    </Center>
                </Box>
            </LinearGradient>
        </Box>
    );
}

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background_light,
        height: "100%",
    },

    container__header: {
        height: '60%',
        borderBottomRightRadius: 55
    },
    container__auth: {
        backgroundColor: '#6d60f8',
        bottom: 0,
        position: "absolute",
        width: '100%',
        height: '40%'
    },
    auth__sub_box: {
        backgroundColor: colors.background_light,
        height: '100%',
        borderTopLeftRadius: 55,
    },
    header__hero: {
        width: '100%',
        marginTop: 70,
        alignItems: 'center'
    },
    hero__text: {
        fontFamily: 'main',
        textAlign: 'center',
        color: 'white',
        fontSize: 62,
        lineHeight: 62,
        marginBottom: 30
    }
})
    return styles
}

export default Main;
