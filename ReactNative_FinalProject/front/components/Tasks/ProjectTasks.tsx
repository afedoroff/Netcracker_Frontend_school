import {
    Center,
    Spinner, ScrollView,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CardTask from "../Cards/CardTask";
import {ProfileScreenNavigationProp} from '../Projects/Projects';
import {IProject, ITask} from "../Interfaces/Interfaces";
import {RouteProp} from "@react-navigation/native";
import {FAB} from "react-native-elements";
import ParticipantList from "../Projects/components/ParticipantList";
import {getProjectTasks} from "./services/tasks";
import {useAppContext} from "../Context/AppContext";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {getProjectUsers} from "../Projects/services/projects";

type Props = {
    navigation: ProfileScreenNavigationProp,
    route: RouteProp<{ params: { project: IProject } }, 'params'>
}

function ProjectTasks({navigation, route}: Props) {
    const project = route.params?.project;
    const [data, setData] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);
    const {userID, token, reloadTasks} = useAppContext();
    const [participants, setParticipants] = useState()

    useEffect(() => {
        getProjectUsers(project._id, token )
            .then(projectUsers =>  {
                setParticipants(projectUsers)
            })
    }, [project])

    useEffect(() => {
        if (!userID) return;
        getProjectTasks(project._id, token)
            .then(result => {
                setData(result);
                setLoading(false)
            })
    }, [reloadTasks])

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

    return (
        <Center style={styles.container}>

            {loading
                ? <Spinner size="lg" mt={150}/>
                :
                <ScrollView>
                    {(project?.participants.length !== 0) ?
                        <View style={styles.participant__block}>
                        <View style={styles.participant__container}>
                            <Text style={styles.participant__text}>Участники</Text>
                            <FlatList horizontal={true}
                                      showsHorizontalScrollIndicator={false}
                                      data={participants} renderItem={({item: {username, avatar}}) => (
                                <ParticipantList username={username} avatar={avatar}/>
                            )}/>
                        </View>
                    </View>
                    : null
                    }
                    {data.map(item => {
                        return <CardTask navigation={navigation} task={item} key={item._id}/>
                    })}

                </ScrollView>
            }
            <FAB
                icon={{name: 'add', color: 'white'}}
                color={colors.fab_color}
                onPress={() => {
                    navigation.navigate('CreateTask', {project})
                }}
                placement={'right'}
            />
        </Center>
    );
}

const createStyles = (colors: ColorTheme) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        text: {
            fontSize: 18,
            marginTop: 30,
            marginLeft: 5
        },
        participant__block: {
            height: 130,
            width: '100%',
            alignItems: 'center',
            marginTop: 10
        },
        participant__text: {
            fontFamily: 'main',
            fontSize: 13,
            marginTop: 4,
            marginBottom: 12,
            color: colors.text
        },
        participant__container: {
            width: '90%',
            elevation: 3,
            backgroundColor: colors.background_light,
            alignItems: 'center',
            borderRadius: 15,
            marginLeft: 16,
            marginRight: 16,
            paddingBottom: 16
        }
    })
    return styles
};

export default ProjectTasks;
