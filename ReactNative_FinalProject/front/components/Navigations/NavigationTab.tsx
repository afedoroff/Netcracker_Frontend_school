import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext, useRef} from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Icon, {Icons} from './Icons';
import Myproject from '../Projects/Projects'
import SearchTab from '../TabScreen/Search'
import Animated, { Transition, Transitioning} from 'react-native-reanimated';
import MyTasks from "../TabScreen/MyTasks";
import Profile from "../TabScreen/Profile";
import {ThemeContext} from "../Providers/ThemeProvider.";


const TabArr = [


    {
        route: 'Проекты',
        label: 'Проекты',
        type: Icons.Feather,
        icon: 'folder',
        component: Myproject,
    },
    {
        route: 'Задачи',
        label: 'Задачи',
        type: Icons.Feather,
        icon: 'file-text',
        component: MyTasks,
    },
    {
        route: 'Поиск',
        label: 'Поиск',
        type: Icons.Feather,
        icon: 'search',
        component: SearchTab,
    },
    {
        route: 'Профиль',
        label: 'Профиль',
        type: Icons.Feather,
        icon: 'user',
        component: Profile,
    },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;

    const {colors} = useContext(ThemeContext)

    const transition = (
        <Transition.Sequence>
            <Transition.Out type="fade" durationMs={0}/>
            <Transition.Change interpolation="easeInOut" durationMs={100}/>
            <Transition.In type="fade" durationMs={10}/>
        </Transition.Sequence>
    );

    const ref = useRef<any>();

    return (
        <View style={[styles.container, {flex: focused ? 1 : 0.55}]}>
            <TouchableWithoutFeedback
                onPress={() => {
                    ref.current.animateNextTransition();
                    onPress();
                }}>
                <Transitioning.View
                    ref={ref}
                    transition={transition}>
                    <Animated.View
                        ref={ref}
                        style={[StyleSheet.absoluteFillObject, {backgroundColor: colors.fab_color, borderRadius: 16}]}/>
                    <View style={[styles.btn,
                        {
                            backgroundColor: focused ? item.alphaClr : colors.background_light,
                            borderColor: colors.fab_color
                        }]}>
                        <Icon type={item.type} name={item.icon} color={focused ? colors.background_light : colors.fab_color}/>
                        <Animated.View>
                            {focused && <Text style={{
                                color: focused ? colors.background_light : colors.fab_color, paddingHorizontal: 5,
                                fontFamily: 'main'
                            }}>{item.label}</Text>}
                        </Animated.View>
                    </View>
                </Transitioning.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default function NavigationTab() {
    const {colors} = useContext(ThemeContext)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    backgroundColor: colors.background_light,
                    borderTopWidth: 0
                },
                headerStyle: {
                    backgroundColor: 'blue',
                    height: 30,
                    borderBottomRightRadius: 50,
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowRadius: 0,
                    shadowColor: 'white'
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'main',
                    fontSize: 14
                }

            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                                options={{
                                    tabBarShowLabel: false,
                                    tabBarButton: (props) => <TabButton {...props} item={item}/>,
                                }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 16,
        borderWidth: 2,

    }
})
