import {
    Text,
    Heading,
    HStack,
    VStack,
    Actionsheet,
    Icon,
    useDisclose, IconButton
} from 'native-base';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {dateToSting} from "../Tasks/utils/StringDate";
import {IComment} from "../Interfaces/Interfaces";
import {Avatar} from 'react-native-elements';
import AntDesign from "react-native-vector-icons/AntDesign";
import {ColorTheme} from "../Constant/Colors";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {avatarDefault} from "../Auth/utils/avatarDefault";

type Props = {
    comment: IComment,
    deleteCommentFromTask: (commentID: string) => Promise<void>,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setComment: React.Dispatch<React.SetStateAction<IComment | undefined>>,
    userID: string | undefined
}

const CardComment = ({comment, deleteCommentFromTask, setComment, userID, setIsEdit}: Props) => {
    const {isOpen, onOpen, onClose} = useDisclose();
    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );


    return (
        <>
            <HStack justifyContent={"space-between"} style={styles.container}>

                <Avatar
                    size={54}
                    rounded
                    //отрефакторю после внесения базы юзеров
                    source={{uri: (comment.userID.avatar) ? comment.userID.avatar : avatarDefault}}
                    icon={{name: 'adb', type: 'material'}}
                    containerStyle={{
                        marginRight: 10,
                        marginLeft: 2}}
                />
                <VStack minW={"85%"} maxW={"85%"}>
                    <HStack justifyContent={"space-between"}>
                        <Heading style={styles.username}>
                            {comment.userID.username}
                        </Heading>
                        {
                            (comment.userID._id === userID) ?
                                (
                                    <IconButton
                                        size={4}
                                        marginRight={6}
                                        onPress={() => {
                                            onOpen();
                                        }}
                                        _icon={{
                                            as: AntDesign,
                                            name: "edit",
                                            color: "grey",
                                            size: 5
                                        }}
                                        _pressed={{
                                            bg: "none"
                                        }}
                                    />) : null
                        }

                    </HStack>
                    <Text style={styles.comment}>
                        {comment.text}
                    </Text>
                </VStack>
                <Text
                    color="coolGray.400"
                    style={styles.dateComment}
                    fontWeight={300}
                >
                    {dateToSting(comment.createDate)}
                </Text>
            </HStack>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item
                        onPress={() => {
                            setComment(comment);
                            onClose();
                            setIsEdit(true);
                        }}
                        startIcon={
                            <Icon
                                as={MaterialCommunityIcons}
                                color="trueGray.400"
                                mr="1"
                                size="6"
                                name="table-edit"
                            />}
                    >
                        Редактировать
                    </Actionsheet.Item>
                    <Actionsheet.Item
                        onPress={() => {
                            onClose();
                            deleteCommentFromTask(comment._id);
                        }}
                        startIcon={
                            <Icon
                                as={MaterialCommunityIcons}
                                color="trueGray.400"
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
        </>
    );
}

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        elevation: 1.8,
        backgroundColor: colors.background_light,
        marginLeft: '6%',
        marginLRight: '5%',
        marginBottom: 12,
        marginTop: 6,
        width: '88%',
        padding: 10,
        paddingTop: 15
    },
    comment: {
        fontFamily: 'main',
        fontSize: 14,
        color: colors.text,
        marginRight: 16,
        marginBottom: 18
    },
    username: {
        fontSize: 17,
        color: '#adadad'
    },
    dateComment: {
        position: "absolute",
        bottom: 5,
        right: 12
    }
})
    return styles
}

export default CardComment;