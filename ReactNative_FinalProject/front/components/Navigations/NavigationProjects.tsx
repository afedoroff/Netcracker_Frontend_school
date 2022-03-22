import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React, {useContext} from 'react';
import CreateProject from '../Projects/create/CreateProject';
import EditProject from '../Projects/edit/EditProject';
import {IProject, ITask, IUser} from '../Interfaces/Interfaces';
import CreateTask from '../Tasks/CreateTask';
import ProjectTasks from '../Tasks/ProjectTasks';
import Task from '../Tasks/Task';
import NavigationTab from './NavigationTab';
import EditTask from "../Tasks/EditTask";
import {ThemeContext} from "../Providers/ThemeProvider.";
import ParticipantsProject from '../Projects/edit/ParticipantsProject';

export type RootStackParamList = {
    NavigationTab: undefined;
    EditProject: { project: IProject};
    CreateProject: { user: IUser | undefined };
    ProjectTasks: { project: IProject };
    EditTask: { task: ITask}
    CreateTask: { project: IProject };
    Task: { task: ITask, dateTask: any };
    ParticipantsProject: {projectId: string};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigationProjects() {
    const {colors} = useContext(ThemeContext)

    return (
        <NativeBaseProvider>
            <Stack.Navigator initialRouteName="NavigationTab"
                             screenOptions={() => ({
                                 headerTintColor: colors.textAlt,
                                 headerStyle: {backgroundColor: colors.card_title_background},
                                 headerTitleStyle: {
                                     fontFamily: 'main',
                                     fontSize: 22
                                 },

                             })}
            >
                <Stack.Screen name="NavigationTab" component={NavigationTab} options={{headerShown: false}}/>
                <Stack.Screen name="EditProject" component={EditProject} options={{title: "Редактировать проект"}}/>
                <Stack.Screen name="CreateProject" component={CreateProject} options={{title: "Создать проект"}}/>
                <Stack.Screen name="ProjectTasks" component={ProjectTasks} options={{title: "Задачи проекта"}}/>
                <Stack.Screen name="CreateTask" component={CreateTask} options={{title: "Создание задачи"}}/>
                <Stack.Screen name="EditTask" component={EditTask} options={{title: "Редактирование задачи"}}/>
                <Stack.Screen name="Task" component={Task} options={{title: "Задача"}}/>
                <Stack.Screen name="ParticipantsProject" component={ParticipantsProject} options={{title: "Участники проекта"}}/>
            </Stack.Navigator>
        </NativeBaseProvider>
    );
}

export default NavigationProjects;
