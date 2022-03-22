import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native'
import {Box, Badge, Pressable} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Paragraph, Text} from "react-native-paper";
import {IProject, ITask} from "../../Interfaces/Interfaces";
import {ProfileScreenNavigationProp} from '../Projects';
import CircularProgress from 'react-native-circular-progress-indicator'
import Icon, {Icons} from "../../Navigations/Icons";
import {ThemeContext} from "../../Providers/ThemeProvider.";
import {ColorTheme} from "../../Constant/Colors";
import AlertRemove from './AlertRemove';
import { useAppContext } from '../../Context/AppContext';
import {projectTasksByID} from "../services/projects";

type CardProjectProps = {
    project: IProject;
    navigation: ProfileScreenNavigationProp;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const CardProject = ({project, navigation}: CardProjectProps) => {
    const [data, setData] = useState<ITask[]>([]);
    const [isOpenAlert, setIsOpenAlert] = React.useState(false);
    const onCloseAlert = () => setIsOpenAlert(false);
    const {token, reloadTasks} = useAppContext();

    useEffect(() => {
        projectTasksByID(project?._id, token)
            .then(result => {
                setData(result);
            })
            .catch(error => console.error(error));
    }, [reloadTasks])

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    const completeTasks = () => {
        if(data) {
            return data.filter(function(task) {
                return task.status == "Закрыта";
            }).length;
        }
        else return 0
    }

    return (
        <>
            <Card style={styles.card}>
                <Card.Title title={project.projectName} style={{
                    backgroundColor: colors.background_light,
                    borderWidth: 2,
                    borderColor: colors.borderColor,
                    borderRadius: 25
                }}
                            titleNumberOfLines={3}
                            titleStyle={{
                                color: colors.borderColor,
                                fontFamily: 'main',
                                fontSize: 18,
                                textAlign: 'center'
                            }}
                />
                <Card.Content style={styles.card__content}>
                    <Box style={styles.card__description}>
                        <ScrollView style={styles.card__description_item}>
                            <Paragraph style={styles.card__description_text}>{project.description}</Paragraph>
                        </ScrollView>
                    </Box>
                        <Text style={{
                            fontSize: 24,
                            fontFamily: 'main',
                            marginTop: 10,
                            marginBottom: 15,
                            width: '100%',
                            textAlign: 'center',
                            color: colors.text
                        }}>Прогресс</Text>
                    <Pressable cursor="pointer" onPress={() => navigation.navigate('ProjectTasks', {project})}>
                        <Box style={styles.card__statistic}>
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    left: 45,
                                    top: -45,
                                    borderWidth: 1.5,
                                    padding: 5,
                                    borderRadius: 30,
                                    borderColor: colors.borderColor
                                }}
                                onPress={() => {
                                    setIsOpenAlert(!isOpenAlert);
                                }}>
                                <Icon type={Icons.Feather}
                                      name={'trash-2'}
                                      color={colors.borderColor}
                                      size={18}
                                />
                            </Pressable>
                            <AlertRemove isOpenAlert={isOpenAlert} onCloseAlert={onCloseAlert} idProject={project._id}/>
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    left: 5,
                                    top: -45,
                                    borderWidth: 1.5,
                                    padding: 5,
                                    borderRadius: 30,
                                    borderColor: colors.borderColor
                                }}
                                onPress={() => {
                                    navigation.navigate('EditProject', {project})
                                }}>
                                <Icon type={Icons.Feather}
                                      name={'edit-3'}
                                      color={colors.borderColor}
                                      size={18}
                                />
                            </Pressable>
                            <Box style={styles.card__circular}>
                                <CircularProgress
                                    activeStrokeColor={'#2465FD'}
                                    inActiveStrokeColor={'rgba(0,0,0,0.11)'}
                                    activeStrokeSecondaryColor={'#C25AFF'}
                                    value={(data.length !== 0) ? (completeTasks() / data.length * 100) : 0}
                                    radius={70}
                                    duration={1000}
                                    textColor={colors.text}
                                    maxValue={100}
                                    valueSuffix={'%'}
                                    inActiveStrokeWidth={18}
                                    activeStrokeWidth={15}
                                    textStyle={{fontWeight: '500', fontSize: 24}}
                                />
                            </Box>
                            <Box style={styles.card__statistic_wrapper}>
                                <Box style={[styles.card__statistic_item, styles.card__statistic_item_top]}>
                                    <Text style={styles.card__subText}>Задач</Text>
                                    <Text style={styles.card__subText}>{data.length}</Text>
                                </Box>

                                <Box style={styles.card__statistic_item}><Text
                                    style={styles.card__subText}>Выполнено</Text>
                                    <Text style={styles.card__subText}>{completeTasks()}</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Pressable>
                </Card.Content>

                <Badge style={styles.creator}>
                    <Text style={styles.creator__text}>
                        Создатель {project.creator}
                    </Text>
                    <MaterialCommunityIcons style={{marginLeft: 3}} name="account" color={colors.borderColor}
                                            size={20}/>
                </Badge>
            </Card>
        </>
    );
}

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({

    creator: {
        fontSize: 16,
        flexDirection: 'row',
        height: 25,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    creator__text: {
        color: colors.borderColor
    },
    card: {
        height: '82%',
        width: SCREEN_WIDTH - 32,
        overflow: "hidden",
        borderRadius: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        margin: 16,
        elevation: 2,
        backgroundColor: colors.background_light,
    },
    card__content: {
        height: '100%'
    },
    card__description: {
        minHeight: 10,
        maxHeight: 100,
        borderRadius: 8,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        marginTop: 20,
        borderColor: colors.borderColor,
    },
    card__description_item: {
        padding: 3,
        maxHeight: 88,
        marginBottom: 0,
    },
    card__description_text: {
        fontFamily: 'main',
        paddingLeft: 9,
        color: colors.text
    },
    card__statistic: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.background_light,
        borderRadius: 16,
        height: 140,
    },
    card__statistic_item: {
        alignItems: "center",
        elevation: 3,
        backgroundColor: colors.background_light,
        borderRadius: 16,
        paddingBottom: 3,
        height: '45%',
        marginLeft: 10
    },
    card__statistic_item_top: {
        marginBottom: '10%'
    },
    card__statistic_wrapper: {
        flexDirection: 'column',
        width: '40%',
    },
    card__circular: {
        alignItems: 'center',
        marginRight: '4%',
        elevation: 3,
        borderRadius: 90,
        backgroundColor: colors.background_light
    },
    card__subText: {
        fontSize: 16,
        marginTop: 7,
        fontFamily: 'main',
        color: colors.text
    },
})
return styles}

export default CardProject;
