import {
    VStack,
    Text,
    HStack,
    ScrollView,
} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../Navigations/NavigationProjects";
import {ITask} from "../Interfaces/Interfaces";
import {RouteProp} from "@react-navigation/native";
import {useForm, Controller} from "react-hook-form";
import {TextInput} from "react-native-paper";
import UsersDropdown from "./UsersDropdown";
import DateInput from "./DateInput";
import ComponentOrTypeTask from "./ComponentOrTypeTask";
import {Component, Priority, Status, Type} from "./TaskOptions";
import {Divider, FAB} from "react-native-elements";
import PriorityPicker from "./PriorityPicker";
import StatusPicker from "./StatusPicker";
import {ColorTheme} from "../Constant/Colors";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {edit} from "./services/tasks";
import {useAppContext} from "../Context/AppContext";
import {vestResolver} from "@hookform/resolvers/vest";
import {taskEditValidationSuite} from "../../validation/taskValidation";
import ValidationErrorText from "../ValidationErrorText";


type ScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'EditTask'>;

type EditTaskProps = {
    navigation: ScreenNavigationProp,
    route: RouteProp<{ params: { task: ITask } }, 'params'>
};

function EditTask({navigation, route}: EditTaskProps) {
    const task = route.params?.task;
    const {setReload, token} = useAppContext();

    const {control, handleSubmit, formState: {errors}} = useForm<ITask>({
        resolver: vestResolver(taskEditValidationSuite),
        defaultValues: {
            priority: task.priority,
            taskName: task.taskName,
            component: task.component,
            status: task.status,
            type: task.type,
            participantID: task.participantID._id,
            startDate: task.startDate,
            endDate: task.endDate,
            description: task.description,
        }
    });

    const onSubmit = useCallback(async (data) => {
        await edit(data, task._id, token)
            .then(() => {
                setReload();
                navigation.goBack();
            })
    }, []);

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (
        <>
            <ScrollView style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 50,
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <>
                            <TextInput
                                value={value}
                                theme={{
                                    colors: {
                                        text: colors.text,
                                        placeholder: colors.subText,
                                    }
                                }}
                                onBlur={onBlur}
                                mode="outlined"
                                label="Название"
                                outlineColor={colors.textInputBorder}
                                activeOutlineColor={colors.textActiveInputBorder}
                                underlineColor={colors.textInputBorder}
                                onChangeText={onChange}
                                style={styles.input}
                                dense={true}
                            />
                            <ValidationErrorText errorMessage={errors.taskName?.message}/>
                        </>
                    )}
                    name="taskName"
                />
                <Divider/>
                <Text style={styles.block_head_text}>Приоритет</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <PriorityPicker
                            value={value}
                            optionsArray={Priority}
                            onChange={onChange}
                            taskID={task._id}
                        />
                    )}
                    name="priority"
                />
                <Divider/>
                <Text style={styles.block_head_text}>Статус</Text>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <StatusPicker
                            value={value}
                            optionsArray={Status}
                            onChange={onChange}
                            taskID={task._id}
                        />
                    )}
                    name="status"
                />
                <Divider style={{marginTop: 10}}/>
                <HStack justifyContent="space-between" mt={0}>
                    <VStack
                        minWidth={"47.5%"}>
                        <Text style={styles.boxRadio__label}>Компонента</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, value}}) => (
                                <ComponentOrTypeTask
                                    value={value}
                                    optionsArray={Component}
                                    onChange={onChange}
                                />
                            )}
                            name="component"
                        />
                    </VStack>
                    <Divider orientation="vertical"/>
                    <VStack
                        minWidth={"47.5%"}>
                        <Text style={styles.boxRadio__label}>Тип задачи</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, value}}) => (
                                <ComponentOrTypeTask
                                    value={value}
                                    optionsArray={Type}
                                    onChange={onChange}
                                />
                            )}
                            name="type"
                        />
                    </VStack>
                </HStack>

                <HStack justifyContent='space-between'>
                    <VStack minWidth={"48.5%"}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {value, onChange}}) => (
                                <>
                                    <DateInput
                                        value={value}
                                        label={"Дата начала"}
                                        onChange={onChange}
                                    />
                                    <ValidationErrorText errorMessage={errors.startDate?.message}/>
                                </>
                            )}
                            name="startDate"
                        />

                    </VStack>
                    <VStack minWidth={"48.5%"}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {value, onChange}}) => (
                                <>
                                    <DateInput
                                        value={value}
                                        label={"Дата окончания"}
                                        onChange={onChange}
                                    />
                                    <ValidationErrorText errorMessage={errors.endDate?.message}/>
                                </>
                            )}
                            name="endDate"
                        />
                    </VStack>
                </HStack>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 300,
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <>
                            <TextInput
                                theme={{
                                    colors: {
                                        text: colors.text,
                                        placeholder: colors.subText,
                                        background: colors.background
                                    }
                                }}
                                mode="outlined"
                                onBlur={onBlur}
                                multiline={true}
                                outlineColor={colors.textInputBorder}
                                activeOutlineColor={colors.textActiveInputBorder}
                                label='Описание'
                                style={styles.area}
                                onChangeText={onChange}
                                value={value}
                            />
                            <ValidationErrorText errorMessage={errors.description?.message}/>
                        </>
                    )}
                    name="description"
                />

                <Text style={styles.block_head_text}>Исполнитель</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <UsersDropdown value={value} onChange={onChange} projectID={task?.projectID}/>
                    )}
                    name="participantID"
                />
            </ScrollView>
            <FAB
                icon={{name: 'check', color: 'white'}}
                color={colors.fab_color}
                onPress={handleSubmit(onSubmit)}
                placement={'right'}
            />
        </>
    );
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            textAlign: "center",
            paddingLeft: 16,
            paddingRight: 16,
        },
        timeContainer: {
            marginTop: 15,
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
            justifyContent: "space-between"
        },
        text: {
            color: "#79747E",
            fontSize: 16
        },
        inputGlobal: {
            borderWidth: 1
        },
        input: {
            marginTop: 10,
            height: 40,
            backgroundColor: colors.background,
            borderRadius: 90,
            marginBottom: 10,
        },
        area: {
            marginTop: 10,
            minHeight: 100,
            marginBottom: 4,
            color: colors.text
        },
        block_head_text: {
            fontFamily: 'main',
            fontSize: 12,
            color: 'grey',
            marginTop: 1,
            marginLeft: 5
        },
        boxRadio__label: {
            fontFamily: 'main',
            marginBottom: 4,
            marginTop: 3,
            textAlign: 'center',
            color: 'grey'
        },
    })
    return styles
}

export default EditTask;
