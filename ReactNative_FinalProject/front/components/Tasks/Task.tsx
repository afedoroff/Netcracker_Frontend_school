import {
  VStack,
  Text,
  HStack,
  Spinner,
  Center,
  Input,
} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, StyleSheet} from 'react-native';
import CardComment from "../Cards/CardComment";
import {RouteProp} from "@react-navigation/native";
import {IComment, ITask} from "../Interfaces/Interfaces";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useAppContext} from "../Context/AppContext";
import {addComment, deleteComment, updateComment} from "./services/comments";
import {TaskHeaderComponent} from "./TaskHeaderComponent";
import {Controller, useForm} from "react-hook-form";
import {ColorTheme} from "../Constant/Colors";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../Navigations/NavigationProjects";
import {uploadFile} from "./services/tasks";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Task'>;

type Props = {
  navigation: ProfileScreenNavigationProp,
  route: RouteProp<{ params: { task: ITask, dateTask: any } }, 'params'>
}

function Task({route}: Props) {
  const dateTask = route.params?.dateTask()
  const task = route.params?.task;
  const [loading, setLoading] = useState<boolean>(false);
  const {userID, setReload, token} = useAppContext();
  const [comments, setComments] = useState<IComment[]>(task?.comment);
  const [attachments, setAttachments] = useState<string[]>(task?.attachments);
  const [comment, setComment] = useState<IComment>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {control, handleSubmit, setValue, formState: {errors}} = useForm({
    defaultValues: {
      commentText: comment?.text
    }
  });

  const addCommentToTask = useCallback(async (data) => {
    if (!data.commentText || !userID) return;
    await addComment(task._id, userID, data.commentText, token)
        .then(result => setComments(result.comments));
    clearText();
  }, []);

  const updateTaskComment = useCallback(async (data) => {
    if (!comment || !userID) return;
    await updateComment(task._id, comment._id, data.commentText, token)
        .then(result => setComments(result.comments));
    clearText();
  }, [task?._id, userID, comment]);

  const deleteCommentFromTask = useCallback(async (commentID: string) => {
    await deleteComment(task._id, commentID, token)
    .then(result => setComments(result.comments));
    clearText();
  }, [task?._id, userID, comment]);

  const clearText = useCallback(() => {
    setReload();
    setComment(undefined);
    setValue('commentText', "", { shouldValidate: true })
    setIsEdit(false);
  }, []);

  const uploadAttachment = useCallback(async () => {
    await uploadFile(task._id, token)
    .then(result => setAttachments(result.attachments));
    clearText();
  }, [attachments]);

  useEffect(() => {
    setValue('commentText', comment?.text, { shouldValidate: true });
  }, [comment])

  const {colors} = useContext(ThemeContext)

  const styles = React.useMemo(
      () => createStyles(colors),
      [colors]
  );

  return (
      <Center style={styles.container}>
        {
          loading
              ? <Spinner size="lg"/>
              :
              <>
                <FlatList
                    data={comments}
                    renderItem={({item}) => (
                        <CardComment
                            comment={item}
                            deleteCommentFromTask={deleteCommentFromTask}
                            setIsEdit={setIsEdit}
                            setComment={setComment}
                            userID={userID}
                        />
                    )}
                    ListHeaderComponent={
                      <TaskHeaderComponent
                          task={task}
                          dateTask={dateTask}
                          attachments={attachments}
                          setAttachments={setAttachments}
                      />
                    }
                    ListEmptyComponent={
                      <VStack style={styles.noComments}>
                        <Text style={styles.noComments__text}>Нет комментариев</Text>
                      </VStack>
                    }
                />
                <KeyboardAvoidingView
                    behavior={"height"}
                    style={styles.keyboard__container}>
                  <HStack
                      alignItems={"center"}
                      style={styles.keyboard__input_container}
                  >
                    <MaterialCommunityIcons
                      name="paperclip"
                      size={28}
                      color={'#919191'}
                      style={{marginLeft: 12}}
                      onPress={uploadAttachment}
                    />
                    <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <Input
                                multiline={true}
                                placeholder="Добавить комментарий"
                                value={value}
                                selectionColor={'red'}
                                borderWidth={0}
                                onChangeText={(text) => {
                                  onChange(text);
                                  if (!text) setIsEdit(false);
                                }}
                                style={{
                                  width: "80%",
                                  fontFamily: 'main',
                                  fontSize: 13,
                                  color: colors.text
                                }}
                            />
                        )}
                        name="commentText"
                    />
                    <Ionicons
                        name={!isEdit ? "md-send-outline" : "checkmark-outline"}
                        size={25}
                        color={colors.text}
                        style={{
                          position: 'absolute',
                          right: 12,
                        }}
                        onPress={
                          !isEdit
                              ? handleSubmit(addCommentToTask)
                              : handleSubmit(updateTaskComment)
                        }
                    />
                  </HStack>
                </KeyboardAvoidingView>
              </>
        }
      </Center>
  );
}

const createStyles = (colors: ColorTheme) => {
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginRight: '7.5%',
    marginLeft: '7.5%'
  },
  text: {
    fontSize: 14,
    marginTop: 14,
    color: "#6b6b6c",
  },
  divider: {
    marginBottom: 7
  },
  keyboard__container: {
    backgroundColor: colors.background_light,
    borderWidth: 0.7,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: colors.borderColor,
    width: '100%',
    minHeight: 60,
    maxHeight: 110
  },
  keyboard__input_container: {
    width: '100%',
    minHeight: 60,
    maxHeight: 110
  },
  description: {
    borderWidth: 0,
    backgroundColor: '#fff',
    minHeight: 20,
    fontSize: 14,
    fontFamily: 'main',
    borderRadius: 8
  },
  noComments: {
    alignItems: "center"
  },
  noComments__text: {
    marginTop: 5,
    fontFamily: 'main',
    fontSize: 12,
    color: '#afafaf'
  }
})
  return styles
}

export default Task;
