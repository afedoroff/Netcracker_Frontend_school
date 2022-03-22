import {CheckIcon, Select, Spinner, View} from "native-base";
import React, {useContext, useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {getProjectUsers} from "../Projects/services/projects";
import { ThemeContext } from "../Providers/ThemeProvider.";
import {useAppContext} from "../Context/AppContext";


type UsersDropdownProps = {
    value: any | undefined;
    projectID: string;
    onChange: (...event: any[]) => void;
}

export type ParticipantsProps = {
    id: string,
    username: string
}

const UsersDropdown = ({value, onChange, projectID}: UsersDropdownProps) => {

    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState<ParticipantsProps[]>([]);
    const {colors} = useContext(ThemeContext)
    const {token} = useAppContext()

    useEffect(() => {
        getProjectUsers(projectID, token)
            .then(projectUsers =>  setParticipants(projectUsers))
    }, [])



    return (
        <View style={styles.container}>
            <Select
                style={styles.select}
                selectedValue={value}
                defaultValue={value}
                mt={1}
                color={colors.text}
                placeholder={(value.username) ? value.username : 'Выберите исполнителя'}
                borderColor={colors.textInputBorder}
                onValueChange={onChange}
                _selectedItem={{
                    endIcon: <CheckIcon size={4}/>,
                    borderWidth: 1,
                    borderColor: colors.textActiveInputBorder,
                    borderRadius: 30
                }}>
                {
                    loading
                        ? <Spinner size="lg"/>
                        :
                        participants.map(participant => {
                            return (
                                <Select.Item
                                    style={styles.select__picker}
                                    label={participant.username}
                                    value={participant.id}
                                    key={participant.id}
                                />
                            )
                        })
                }
            </Select>
        </View>
    )
}

const styles = StyleSheet.create({
    select: {
        borderColor: 'red'
    },
    select__item: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    select__picker: {
        textAlign: 'center',
        justifyContent: "center",
        width: '30%',
        paddingTop: 0,
        paddingBottom: 0,
        height: 35,
        marginLeft: '35%',
    },
    divider: {
        marginTop: 0,
        marginBottom: 10
    },
    container: {
        width: '80%'
    },
})

export default React.memo(UsersDropdown);
