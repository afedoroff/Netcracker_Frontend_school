import React, { useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './components/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from './components/Auth/Registration';
import Authorization from './components/Auth/Authorization';
import * as Keychain from 'react-native-keychain';
import {AppContext} from "./components/Context/AppContext";
import {IProject} from "./components/Interfaces/Interfaces";
import NavigationProjects from "./components/Navigations/NavigationProjects";
import {ThemeProvider} from "./components/Providers/ThemeProvider.";

export type RootStackParamList = {
    Entry: undefined,
    Main: undefined,
    Registration: undefined,
    Authorization: undefined,
    EditProject: { project: IProject } | undefined,
    NavigationTab: undefined,
    Projects: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    const toggle = () => setIsLogin(prev => !prev);
    const toggleUserID = (value: string) => setUser(value)
    const [userID, setUserID] = useState<string>();
    const [isReloadTasks, setIsReloadTasks] = useState(false);
    const reloadToggle = () => setIsReloadTasks(prev => !prev);

    useEffect(() => {
        (async () => {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                setToken(credentials.username)
                setUserID(credentials.password);
                setIsReloadTasks(true);
                setIsLogin(true);
            }
            else {
                return null
            }
        })()
    }, [isLogin])

    return (
        <ThemeProvider>
            <AppContext.Provider value={{auth: isLogin,
                setAuth: toggle,
                userID: userID,
                setUserID: toggleUserID,
                reloadTasks: isReloadTasks,
                setReload: reloadToggle,
            token: token,
            setToken: setToken}}>
                <NativeBaseProvider>
                    <NavigationContainer>
                        {!isLogin ? (
                            <Stack.Navigator initialRouteName="Main"
                                             screenOptions={() => ({
                                                 headerTintColor: "#FFFFFF",
                                                 headerStyle: {backgroundColor: "#396afc"},
                                                 headerTitleStyle: {
                                                     fontFamily: 'main',
                                                     fontSize: 20
                                                 },
                                             })}>
                                <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
                                <Stack.Screen name="Registration" component={Registration}
                                              options={{headerShown: false}}/>
                                <Stack.Screen name="Authorization" component={Authorization}
                                              options={{title: "Вход в систему", headerShown: false}}/>
                            </Stack.Navigator>

                        ) : (
                            <NavigationProjects/>
                        )}
                    </NavigationContainer>
                </NativeBaseProvider>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
