import {
    VStack,
    Text,
    HStack,
    KeyboardAvoidingView
} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../Navigations/NavigationProjects";
import {IProject, ITask} from "../Interfaces/Interfaces";
import {RouteProp} from "@react-navigation/native";
import {useForm, Controller} from "react-hook-form";
import {TextInput} from "react-native-paper";
import UsersDropdown from "./UsersDropdown";
import DateInput from "./DateInput";
import ComponentOrTypeTask from "./ComponentOrTypeTask";
import {Component, Priority, Type} from "./TaskOptions";
import {FAB, Divider} from "react-native-elements";
import PriorityPicker from "./PriorityPicker";
import {create} from "./services/tasks";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {useAppContext} from "../Context/AppContext";
import {vestResolver} from "@hookform/resolvers/vest";
import {taskCreateValidationSuite} from "../../validation/taskValidation";
import ValidationErrorText from "../ValidationErrorText";


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'CreateProject'>;

type CreateTaskProps = {
    route: RouteProp<{ params: { project: IProject } }, 'params'>
    navigation: ProfileScreenNavigationProp;
};

function CreateTask({navigation, route}: CreateTaskProps) {
    const project = route.params?.project;
    const {setReload, token} = useAppContext();
    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    const {control, handleSubmit, formState: {errors}} = useForm<ITask>({
        resolver: vestResolver(taskCreateValidationSuite),
        defaultValues: {
            priority: '',
            taskName: '',
            component: '',
            type: '',
            participantID: '',
            startDate: undefined,
            endDate: undefined,
            description: '',
            projectID: project._id,
        }
    });

    const onSubmit = useCallback(async (data) => {
        await create(data, token)
            .then(() => {
                setReload();
                navigation.goBack();
            });
    }, []);

    return (
        <>
            <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
                <VStack
                    minWidth={"35%"}
                    ml={"50%"}>
                </VStack>
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
                                        placeholder: colors.subText
                                    }
                                }}
                                onBlur={onBlur}
                                outlineColor={colors.textInputBorder}
                                activeOutlineColor={colors.textActiveInputBorder}
                                underlineColor={colors.textInputBorder}
                                mode="outlined"
                                label="Название"
                                onChangeText={onChange}
                                style={styles.input}
                            />
                            <ValidationErrorText errorMessage={errors.taskName?.message}/>
                        </>
                    )}
                    name="taskName"
                />
                <Divider />
                <Text style={styles.block_head_text}>Приоритет</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <>
                            <PriorityPicker
                                value={value}
                                optionsArray={Priority}
                                onChange={onChange}
                            />
                            <ValidationErrorText errorMessage={errors.priority?.message}/>
                        </>
                    )}
                    name="priority"
                />
                <Divider/>
                <HStack justifyContent='space-between'>
                    <VStack minWidth={"47.5%"}>
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
                    <VStack minWidth={"47.5%"}>
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
                <Divider/>
                <HStack justifyContent="space-between">
                    <VStack
                        minWidth={"49.5%"}
                        mt={2}>
                        <Text style={styles.boxRadio__label}>Компонента</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <ComponentOrTypeTask
                                        value={value}
                                        optionsArray={Component}
                                        onChange={onChange}
                                    />
                                    <ValidationErrorText errorMessage={errors.component?.message}/>
                                </>
                            )}
                            name="component"
                        />
                    </VStack>
                    <Divider orientation="vertical"/>
                    <VStack
                        minWidth={"47.5%"}
                        mt={2}
                        ml={3}>
                        <Text style={styles.boxRadio__label}>Тип задачи</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <ComponentOrTypeTask
                                        value={value}
                                        optionsArray={Type}
                                        onChange={onChange}
                                    />
                                    <ValidationErrorText errorMessage={errors.type?.message}/>
                                </>
                            )}
                            name="type"
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
                        <>
                            <UsersDropdown value={value} onChange={onChange} projectID={project?._id}/>
                            <ValidationErrorText errorMessage={errors.participantID?.message}/>
                        </>
                    )}
                    name="participantID"
                />
                <FAB
                    icon={{name: 'check', color: 'white'}}
                    color={colors.fab_color}
                    onPress={handleSubmit(onSubmit)}
                    placement={'right'}
                />
            </KeyboardAvoidingView>

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
        boxRadio__label: {
            fontFamily: 'main',
            marginBottom: 4,
            color: colors.text
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
            backgroundColor: colors.background,
            height: 40,
            marginBottom: 10
        },
        area: {
            marginTop: 20,
            minHeight: 100
        },
        block_head_text: {
            fontFamily: 'main',
            fontSize: 12,
            color: 'grey',
            marginTop: 1,
            marginLeft: 5
        }
    })
    return styles
}

export default CreateTask;
