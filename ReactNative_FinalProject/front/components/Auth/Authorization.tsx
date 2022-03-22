import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native'
import {Button} from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../App";
import * as Keychain from 'react-native-keychain';
import {useAppContext} from "../Context/AppContext";
import {ThemeContext} from "../Providers/ThemeProvider.";
import LinearGradient from "react-native-linear-gradient";
import Icon, {Icons} from "../Navigations/Icons";
import {authUser} from "./services/auth.service";
import CustomInput from "../CustomInput";
import {vestResolver} from "@hookform/resolvers/vest";
import {authorizationValidationSuite} from "../../validation/userValidation";
import {useForm, Controller} from "react-hook-form";


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Authorization'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

export type AuthorizationFormFields = {
    username: string,
    password: string
};

const Authorization = ({navigation}: Props) => {
    const {control, handleSubmit, formState: {errors}} = useForm<AuthorizationFormFields>({
        resolver: vestResolver(authorizationValidationSuite)
    });
    const {colors} = useContext(ThemeContext)
    const {setAuth, setUserID, setToken} = useAppContext()

    const authorization = async (data: AuthorizationFormFields) => {
        authUser(data.username, data.password).then(data => {
               if(data.token) {
                   Keychain.setGenericPassword(data.token, data.userId);
                   setToken(data.token)
                   setUserID(data.userId)
                   setAuth()
               } else {
                   return null
               }
            }
        )
    }

    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <View style={styles.icon__container}>
                <Icon type={Icons.Fontisto} name={'atom'} color={'white'} size={160}/>
            </View>
            <View style={styles.wrapper}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <CustomInput state={value}
                                     setState={onChange}
                                     error={errors.username?.message}
                                     placeholder={'Имя пользователя'}
                                     label={'логин'}
                                     iconName={'person-outline'}
                                     iconType={'ionicon'}
                        />
                    )}
                    name={"username"}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <CustomInput state={value}
                                     setState={onChange}
                                     error={errors.password?.message}
                                     placeholder={'Пароль'}
                                     label={'пароль'}
                                     secure={true}
                                     iconName={'person-outline'}
                                     iconType={'ionicon'}
                        />
                    )}
                    name={"password"}
                />
            </View>
            <Button
                onPress={handleSubmit(authorization)}
                borderRadius="30"
                bgColor="rgba(255,255,255,0.0)"
                borderWidth={1}
                borderColor={colors.buttonMain}
                _text={{
                    color: colors.buttonMain,
                    fontFamily: 'main'
                }}
                alignSelf="center"
                mt={'20px'} size="lg"
                width="270"
                height="50"
            >
                Войти
            </Button>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
    },
    wrapper: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: '4%',
        paddingBottom: '4%',
        marginTop: '30%',
        justifyContent: 'center'
    },
    username: {
        marginBottom: 20,
    },
    background: {
        height: '100%',
    },
    heroText: {
        textAlign: "center",
        fontFamily: 'main',
        fontSize: 48,
        color: 'white',
        marginTop: '45%'
    },
    icon__container: {
        marginTop: '29%',
        width: '100%',
        alignItems: 'center'
    }
})

export default Authorization;
