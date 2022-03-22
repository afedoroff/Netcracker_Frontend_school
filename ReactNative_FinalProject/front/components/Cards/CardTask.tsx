import {
    Actionsheet,
    AlertDialog,
    Box,
    Button,
    Icon, IconButton,
    Pressable,
    Text,
    useDisclose,
    View
} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {ITask} from '../Interfaces/Interfaces';
import {ProfileScreenNavigationProp} from '../Projects/Projects';
import {Avatar, ProgressBar, Badge} from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {iconStyle} from "../Navigations/Icons";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {remove} from "../Tasks/services/tasks";
import {useAppContext} from "../Context/AppContext";


type CardProjectProps = {
    task: ITask;
    navigation: ProfileScreenNavigationProp;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

function CardTask({task, navigation}: CardProjectProps) {

    const {isOpen, onOpen, onClose} = useDisclose();
    const cancelRef = React.useRef(null)
    const [isOpenAlert, setIsOpenAlert] = React.useState(false);
    const onCloseAlert = () => setIsOpenAlert(false);
    const {colors} = useContext(ThemeContext)
    const {setReload, token} = useAppContext()

    const correctDayWriting = (day: string | any) => {
        let result;
        const lastNumber = day[day.length - 1]
        if (lastNumber <= 4 && lastNumber >= 2) {
            result = ('Осталось ' + day + ' дня')
        } else if (lastNumber == 1) {
            result = ('Остался ' + day + ' день')
        } else if (day == '0') {
            result = 'Время истекло'
        } else if (lastNumber <= 9 && lastNumber >= 5) {
            result = ('Осталось ' + day + ' дней')
        }

        return result
    }

    const badgeStyle = () => {

        if (task.priority === "Высокий") {
            return ({
                borderColor: 'red',
                color: 'red'
            })
        } else if (task.priority === "Средний") {
            return ({
                borderColor: 'orange',
                color: 'orange'
            })
        } else if (task.priority === "Низкий") {
            return ({
                borderColor: 'green',
                color: 'green'
            })
        } else return null;
    }

    const dateTask = useCallback(() => {
        const currentDate = new Date()
        const startDate = new Date(task.createDate)
        const endDate = new Date(task.endDate)

        let diffDateCur = (endDate.getTime() - currentDate.getTime()); //осталось
        let diffDateAll = (endDate.getTime() - startDate.getTime()); //всего

        if (diffDateCur < 0) {
            diffDateCur = 0
        }

        const diffDaysCur = Math.ceil(diffDateCur / (1000 * 3600 * 24));
        const diffDaysAll = Math.ceil(diffDateAll / (1000 * 3600 * 24));

        const percentDiff = (diffDateCur == 0) ? 1 : ((diffDaysAll - diffDaysCur) / diffDaysAll)

        return {
            daysRemaining: correctDayWriting(diffDaysCur.toString()),
            percent: percentDiff,
            daysRemainingNum: diffDaysCur,
            allDays: diffDaysAll
        }

    }, [task])

    const removeTask = useCallback(async () => {
        await remove(task._id, token)
            .then(setReload);
    }, []);

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (

        <View style={styles.card__wrapper}>
            <View style={[styles.card, {borderColor: task.status !== 'Закрыта' ? '#1DB954' : '#d93838',}]}>
                <View style={styles.card__component}>
                    <Avatar.Icon style={{backgroundColor: iconStyle(task.component).backgroundColor, borderRadius: 90}}
                                 size={60} icon={iconStyle(task.component).icon} color='#FFF'/>
                    <Text style={styles.component__text}>{task.component}</Text>
                    <IconButton
                        style={{
                            position: 'absolute',
                            top: 36,
                            right: -7
                        }}
                        size={4}
                        onPress={onOpen}
                        _icon={{
                            as: MaterialCommunityIcons,
                            name: "dots-vertical",
                            color: colors.text
                        }}
                        _pressed={{
                            bg: "none"
                        }}
                    />
                </View>
                <View style={styles.card__header}>
                    <Badge style={[styles.header__badge_status, badgeStyle()]}>{task.priority}</Badge>
                    <Text style={styles.header__head_text}>
                        <View style={styles.header__head_margin}/>
                        {task.taskName}</Text>
                </View>
                <Pressable
                    cursor="pointer"
                    onPress={() => navigation.navigate('Task', {task, dateTask})}>
                    <View style={styles.card__task_info}>
                        <Text style={{fontWeight: '600', color: colors.text, fontFamily: 'main'}}>{task.description}</Text>
                    </View>
                </Pressable>
                <Text style={styles.card__participant}>Исполнитель: {task.participantID.username}</Text>
                <View style={styles.card__badge_box}>
                    <Badge style={styles.card__badge}>{task.status}</Badge>
                    <Badge style={styles.card__badge}>{`${task.comment.length} comments`}</Badge>
                </View>
                <View>
                    <Text style={styles.dateText}>{dateTask().daysRemaining}</Text>
                    <ProgressBar style={styles.card__progress}
                                 progress={dateTask().percent}
                                 color={(dateTask().percent == 1) ? '#ff5353' : colors.borderColor}/>
                </View>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content bg={colors.background}>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="16" color={colors.text}>
                                Что вы хотите сделать с задачей?
                            </Text>
                        </Box>
                        <Actionsheet.Item 
                            _text={{color: colors.text}}
                            onPress={() => {
                                navigation.navigate('EditTask', {task})
                            }}
                            startIcon={
                                <Icon
                                    as={MaterialCommunityIcons}
                                    color={colors.text}
                                    mr="1"
                                    size="6"
                                    name="table-edit"
                                />}
                        >
                            Редактировать
                        </Actionsheet.Item>
                        <Actionsheet.Item
                            _text={{color: colors.text}}
                            onPress={() => {
                                setIsOpenAlert(!isOpenAlert);
                                onClose();
                            }}

                            startIcon={
                                <Icon
                                    as={MaterialCommunityIcons}
                                    color={colors.text}
                                    mr="1"
                                    size="6"
                                    name="delete"
                                />
                            }
                        >
                            Удалить
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
                <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={isOpenAlert}
                    onClose={onCloseAlert}
                >
                    <AlertDialog.Content bg={colors.background}>
                        <AlertDialog.CloseButton/>
                        <AlertDialog.Header _text={{color: colors.text}} bg={colors.background_light}>
                            Удалить задачу
                        </AlertDialog.Header>
                        <AlertDialog.Body _text={{color: colors.text}}>
                            Вы точно хотите удалить задачу?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="unstyled"
                                    colorScheme="coolGray"
                                    onPress={onCloseAlert}
                                    ref={cancelRef}
                                    _text={{color: colors.text}}
                                >
                                    Назад
                                </Button>
                                <Button colorScheme="danger" onPress={() => {
                                    removeTask();
                                    onCloseAlert();
                                }}>
                                Удалить
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </View>
        </View>
    );
}

export default CardTask;

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    card__wrapper: {
        elevation: 7,
        width: SCREEN_WIDTH - 36,
        margin: 16,
        marginTop: 40,
        borderRadius: 1
    },

    card: {
        justifyContent: 'center',
        borderLeftWidth: 2,
        backgroundColor: colors.background_light,
        paddingLeft: 10,
        paddingRight: 10
    },

    card__component: {
        backgroundColor: colors.background_light,
        elevation: 4,
        position: 'absolute',
        top: -35,
        padding: 11,
        right: 14,
        zIndex: 1,
        alignItems: 'center',
        borderRadius: 56,
    },

    card__header: {
        maxWidth: '75%',
        flexDirection: 'row',
    },

    header__head_text: {
        marginTop: 12,
        fontFamily: 'main',
        fontSize: 21,
        lineHeight: 21,
        color: colors.text
    },

    header__head_margin: {
        width: 66
    },

    header__badge_status: {
        borderRadius: 55,
        position: "absolute",
        top: 11,
        fontSize: 10,
        fontFamily: 'main',
        width: 60,
        borderWidth: 1,
        backgroundColor: colors.background_light
    },

    card__badge_box: {
        flexDirection: 'row',
        marginBottom: 3
    },

    card__badge: {
        backgroundColor: colors.background_light,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 14,
        height: 25,
        marginRight: 4,
        marginTop: 4
    },

    component__text: {
        fontSize: 13,
        marginTop: 1,
        fontFamily: 'main',
        lineHeight: 32,
        color: colors.text,
    },

    card__progress: {
        height: 7,
        borderRadius: 30,
        marginTop: 3,
        marginBottom: 12
    },

    card__task_info: {
        borderColor: '#d2d2d2',
        borderRadius: 12,
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        width: '72%'
    },

    card__participant: {
        fontFamily: 'main',
        color: colors.text,
        marginBottom: 5
    },

    dateText: {
        color: colors.text
    }
})
    return styles};
