import {Dispatch, SetStateAction} from "react";

interface IInputList  {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    firstName: string,
    setFirstName: Dispatch<SetStateAction<string>>,
    lastName: string,
    setLastName: Dispatch<SetStateAction<string>>
}

export const inputList = ({...props}: IInputList) => {
    return  [
        {
            state: props.username,
            setState: props.setUsername,
            placeholder: 'Введите логин...',
            label: 'логин',
            iconType: 'ionicon',
            iconName: 'person-outline'
        },
        {
            state: props.password,
            setState: props.setPassword,
            placeholder: 'Введите пароль...',
            label: 'пароль',
            iconType: 'ionicon',
            iconName: 'key-outline',
            secure: true
        },
        {
            state: props.firstName,
            setState: props.setFirstName,
            placeholder: 'Введите имя...',
            label: 'имя',
            iconType: 'ionicon',
            iconName: 'ios-clipboard-outline'
        },
        {
            state: props.lastName,
            setState: props.setLastName,
            placeholder: 'Введите фамилию...',
            label: 'фамилия',
            iconType: 'ionicon',
            iconName: 'ios-clipboard-outline'
        },
        {
            state: props.email,
            setState: props.setEmail,
            placeholder: 'Введите e-mail',
            label: 'email',
            iconType: 'ionicon',
            iconName: 'at'
        }
    ]
}
