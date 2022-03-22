import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native'
import {Button, CheckIcon, Select} from 'native-base';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../App";
import LinearGradient from "react-native-linear-gradient";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {launchImageLibrary} from 'react-native-image-picker'
import {Avatar} from "react-native-elements";
import CustomInput, {InputProps} from '../CustomInput';
import {avatarDefault} from "./utils/avatarDefault";
import {Controller, useForm} from "react-hook-form";
import {IUser} from "../Interfaces/Interfaces";
import {vestResolver} from "@hookform/resolvers/vest";
import ValidationErrorText from "../ValidationErrorText";
import {registrationValidationSuite} from "../../validation/userValidation";
import {ColorTheme} from "../Constant/Colors";
import {registration} from "./services/auth.service";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Registration'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const Registration = ({navigation}: Props) => {
  const [avatar, setAvatar] = useState<string>(avatarDefault)
  const {colors} = useContext(ThemeContext)

    const styles = useMemo(
      () => createStyle(colors),
      [colors]
    );

  const {control, handleSubmit, formState: {errors}} = useForm<IUser>({
    resolver: vestResolver(registrationValidationSuite),
  });

  const inputList: InputProps[] = [
    {
      placeholder: 'Введите логин...',
      label: 'логин',
      iconType: 'ionicon',
      iconName: 'person-outline',
      name: 'username',
      error: errors.username?.message
    },
    {
      placeholder: 'Введите пароль...',
      label: 'пароль',
      iconType: 'ionicon',
      iconName: 'key-outline',
      secure: true,
      name: 'password',
      error: errors.password?.message
    },
    {
      placeholder: 'Введите имя...',
      label: 'имя',
      iconType: 'ionicon',
      iconName: 'ios-clipboard-outline',
      name: 'firstName',
      error: errors.firstName?.message
    },
    {
      placeholder: 'Введите фамилию...',
      label: 'фамилия',
      iconType: 'ionicon',
      iconName: 'ios-clipboard-outline',
      name: 'lastName',
      error: errors.lastName?.message
    },
    {
      placeholder: 'Введите e-mail',
      label: 'email',
      iconType: 'ionicon',
      iconName: 'at',
      name: 'email',
      error: errors.email?.message
    }
  ]

    const openGallery = () => {
        launchImageLibrary({
            mediaType: 'photo', includeBase64: true, maxWidth: 250,
            maxHeight: 250,
            quality: 0.7

        }, response => {
            try {
                if (response.didCancel) {
                    return console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    return console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets) {
                    const source = response.assets[0]
                    setAvatar(`data:image/jpeg;base64,` + source.base64);
                }
            } catch (e) {
                console.log(e)
            }

        })
    };

    const registerUser = (data: IUser) => {
        registration(data.username, data.password, data.lastName, data.firstName, avatar, data.email, data.specialization)
            .catch(err => console.log(err))
    }

  // @ts-ignore
  const renderInputs =
    inputList.map((item) =>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <CustomInput state={value}
                       setState={onChange}
                       error={item.error}
                       label={item.label}
                       placeholder={item.placeholder}
                       iconType={item.iconType}
                       iconName={item.iconName}
                       secure={item.secure ? item.secure : false}
                       key={item.name}
                       name={item.name}
          />
        )}
        name={item.name}
      />
    )

  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <View style={styles.form}>
        <View style={styles.form__avatar_box}>
          <Avatar
            size={110}
            rounded
            source={{uri: avatar}}
            containerStyle={{}}
            onPress={() => openGallery()}
          >
              <Avatar.Accessory size={30}/>
          </Avatar>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <View style={styles.select_container}>
                <Select selectedValue={value}
                        minWidth={190}
                        maxWidth={190}
                        marginRight={3}
                        marginLeft={3}
                        accessibilityLabel="Ваша специализация"
                        placeholder="Специализация"
                        style={styles.specialization}
                        backgroundColor={'rgba(0,0,0,0.09)'}
                        variant='rounded'
                        placeholderTextColor={'#dbdbdb'}
                        _selectedItem={{
                            bg: "rgba(153,153,153,0.25)",
                            endIcon: <CheckIcon size="5"/>
                        }} mt={1} onValueChange={value => onChange(value)}>
                    <Select.Item label="Frontend developer" value="Frontend"/>
                    <Select.Item label="Backend developer" value="Backend"/>
                    <Select.Item label="Fullstack developer" value="Fullstack"/>
                    <Select.Item label="UI/UX designer" value="UI"/>
                    <Select.Item label="QA engineer" value="QA"/>
                </Select>
              <ValidationErrorText errorMessage={errors.type?.message}/>
            </View>

          )}
          name="type"
        />

          {renderInputs}
        <Button
          onPress={handleSubmit(registerUser)}
          borderRadius="30"
          bgColor="rgba(255,255,255,0.0)"
          alignSelf="center"
          mt="5%" size="lg"
          width="270"
          height="50"
          style={styles.button_register}
        >
          Зарегистрироваться
        </Button>
      </View>
    </LinearGradient>
  );
}

const createStyle = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "white",
            height: "100%",
        },
        header_text: {
            fontFamily: 'main',
            color: 'white',
            marginTop: '2%',
            fontSize: 36,
            textAlign: 'center'
        },
        form: {
            paddingLeft: 24,
            paddingRight: 24,
            marginTop: 20
        },
        form__avatar_box: {
            width: '100%',
            marginTop: 34,
            marginBottom: 30,
            alignItems: 'center',
        },
        background: {
            height: '100%'
        },
        formInput: {
            marginBottom: 10,
            backgroundColor: 'rgba(255,255,255,0.0)',
        },
        formInput_names: {
            width: '50%'
        },
        namesContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%'
        },
        button_register: {
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 25
        },
        specialization: {
            color: 'white',
            fontFamily: 'main',
            paddingLeft: 14,
            marginHorizontal: 10
        },
        select_container: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 30
        }
    })
    return styles
}

export default Registration;
