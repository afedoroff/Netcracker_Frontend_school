import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto'

export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    Fontisto
}

const Icon = ({type, name, color, size=24, style, onPress}: any) => {
    const fontSize = 24;
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} size={size || fontSize} color={color} style={style} onPress={onPress} />
            )}
        </>
    )
}

export const iconStyle = (component: string) => {

    if (component === "Mobile") {
        return ({
            backgroundColor: 'rgba(3,24,252,0.62)',
            icon: 'cellphone-android'
        })
    } else if (component === "UI") {
        return ({
            backgroundColor: 'rgba(246,48,4,0.64)',
            icon: 'palette-outline'
        })
    } else if (component === "Frontend") {
        return ({
            backgroundColor: 'rgba(74,140,132,0.67)',
            icon: 'laptop'
        })
    } else if (component === "Backend") {
        return ({
            backgroundColor: 'rgba(17,152,0,0.56)',
            icon: 'progress-wrench'
        })
    } else if (component === "Portal") {
        return ({
            backgroundColor: 'rgba(239,25,198,0.56)',
            icon: 'web'
        })
    }
    else return ({
            backgroundColor: 'white',
            icon: 'folder'
        });
}

export default Icon
