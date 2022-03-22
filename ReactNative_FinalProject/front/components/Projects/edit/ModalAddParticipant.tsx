import {
    Button,
    Modal,
    FormControl,
    ScrollView,
    Pressable,
    Text,
    HStack,
    CloseIcon,
    IconButton,
    Divider,
    VStack
} from 'native-base';
import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {IUser} from "../../Interfaces/Interfaces";
import AlertParticipant from './AlertParticipant';
import {ParticipantsProps} from './EditProject';
import {addParticipantInProject, getUsers} from '../services/projects';
import {ThemeContext} from "../../Providers/ThemeProvider.";
import {ColorTheme} from "../../Constant/Colors";
import {useAppContext} from "../../Context/AppContext";
import { Avatar } from 'react-native-elements';
import { avatarDefault } from '../../Auth/utils/avatarDefault';

type ModalAddParticipantProps = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    id: string;
    participants: ParticipantsProps[]
}

const ModalAddParticipant = ({showModal, setShowModal, id, participants}: ModalAddParticipantProps) => {
    const [nameParticipant, setNameParticipant] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [showAlert, setShowAlert] = React.useState(false);
    const {setReload} = useAppContext();

    const {token} = useAppContext()
    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().includes(nameParticipant.toLowerCase()) ||
            user.lastName.toLowerCase().includes(nameParticipant.toLowerCase())
    })

    const hasErrors = useCallback(() => {
        return filteredUsers.length === 0;
    }, [filteredUsers])

    useEffect(() => {
        getUsers(token)
            .then(result => {
                setUsers(result);
            })
            .catch(error => console.error(error));
    }, [showModal])

    const addParticipant = useCallback(async () => {
        if (participants.find(participant => participant.username === nameParticipant)) {
            setShowAlert(true);
        } else {
            await addParticipantInProject(id, nameParticipant, token);
            setReload()
            setShowModal(false);
        }
    }, [nameParticipant])

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            {showAlert
                ? <AlertParticipant setShowAlert={setShowAlert}/>
                : <Modal.Content maxWidth="400px" h={500} backgroundColor={colors.background}>
                    <HStack space={2} style={styles.headerModal}>
                        <Text fontSize="md" fontWeight="medium" color="white">
                            Добавить участника
                        </Text>
                        <IconButton
                            variant="unstyled"
                            icon={<CloseIcon size="4" color="white"/>}
                            onPress={() => setShowModal(false)}
                        />
                    </HStack>
                    <Modal.Body>
                        <FormControl>
                            <TextInput
                                theme={{
                                    colors: {
                                        text: colors.text,
                                        placeholder: colors.subText,
                                    }
                                }}
                                mode="outlined"
                                outlineColor={colors.textInputBorder}
                                activeOutlineColor={colors.textActiveInputBorder}
                                placeholder='Введите логин или фамилию пользователя'
                                style={styles.nameProject}
                                value={nameParticipant}
                                onChangeText={text => setNameParticipant(text)}
                            />
                            <HelperText type="error" visible={hasErrors()}>
                                Пользователь не найден
                            </HelperText>
                        </FormControl>
                        <ScrollView h={240}>
                            {
                                nameParticipant.length > 0 &&
                                filteredUsers.map(item => {
                                    return (
                                        <Pressable
                                            key={item._id}
                                            onPress={() => setNameParticipant(item.username)}
                                            bg={colors.background_light}
                                            p={2}
                                        >
                                            <HStack alignItems="center">
                                                <Avatar
                                                    size={40}
                                                    rounded
                                                    //отрефакторю после внесения базы юзеров
                                                    source={{uri: (item.avatar) ? item.avatar : avatarDefault}}
                                                    icon={{name: 'adb', type: 'material'}}
                                                    containerStyle={{
                                                        marginRight: 10,
                                                        marginLeft: 2}}
                                                />
                                                <VStack p={2}>
                                                <Text color={colors.text}>
                                                    {item.firstName} {item.lastName} 
                                                </Text>
                                                <Text fontSize="12" color={colors.text} ml={2} italic bold>
                                                    {item.username} 
                                                </Text>
                                                </VStack>
                                            </HStack>
                                            <Divider/>
                                        </Pressable>
                                    )
                                })
                            }
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer backgroundColor={colors.background}>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                _text={{color: colors.text}}
                                onPress={() => setShowModal(false)}
                            >
                                Назад
                            </Button>
                            <Button
                                onPress={() => addParticipant()}
                                bg={colors.borderColor}
                                _text={{color: "white"}}
                            >
                                Добавить
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            }
        </Modal>
    )
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        headerModal: {
            justifyContent: "space-between",
            backgroundColor: colors.borderColor,
            height: "15%",
            alignItems: "center",
            paddingHorizontal: 10
        },
        nameProject: {
            fontSize: 12,
            width: "100%",
            backgroundColor: colors.background
        },
    })
    return styles
}

export default ModalAddParticipant;
