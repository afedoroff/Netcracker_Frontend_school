import React, { useCallback, useContext, useEffect, useState} from 'react';
import { VStack, FlatList, Text, Divider, HStack, MinusIcon, Box, Spinner, View} from 'native-base';
import { StyleSheet } from 'react-native';
import { ParticipantsProps } from './EditProject';
import {avatarDefault} from "../../Auth/utils/avatarDefault";
import {Avatar} from "react-native-elements";
import {ThemeContext} from "../../Providers/ThemeProvider.";
import {ColorTheme} from "../../Constant/Colors";
import { RouteProp } from '@react-navigation/native';
import { getProjectUsers, removeParticipantInProject } from '../services/projects';
import { Searchbar } from 'react-native-paper';
import { useAppContext } from '../../Context/AppContext';

type ParticipantsProjectProps = {
  route: RouteProp<{ params: { projectId: string } }, 'params'>
}
function ParticipantsProject({ route }:  ParticipantsProjectProps) {
  const projectId  = route.params?.projectId;
  const [participants, setParticipant] = useState<ParticipantsProps[]>([]);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true);

  const {token} = useAppContext();

  useEffect(() => {
    getProjectUsers(projectId, token )
    .then(projectUsers =>  {
      setParticipant(projectUsers)
      setLoading(false)
    })
  }, [projectId])

  const removeParticipant = useCallback(async(participant: string) => {
    await removeParticipantInProject(projectId, participant, token);
    const copy = participants.filter(item => item.id !== participant);
    setParticipant(copy);
  }, [participants]);
  
  const setSearchValue = (value: any) => {
    setSearch(value)
}
  const searchFilter = (value: string) => {
    return participants.filter(item => item.lastname.toLowerCase().includes(value.toLowerCase()) ||
                                        item.firstname.toLowerCase().includes(value.toLowerCase()))
  }

  const participantCard  = useCallback((item) => {
    return(
      <Box key={item.id} style={styles.container_card}>
        <HStack space={2} justifyContent='space-between' alignItems="center">
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
                  {item.firstname} {item.lastname} 
              </Text>
              <Text fontSize="12" color={colors.text} ml={2} italic bold>
                {item.username} 
              </Text>
            </VStack>
          </HStack>
          <MinusIcon 
            mr={4} 
            size="5" 
            color="coolGray.400" 
            onPress={() => removeParticipant(item.id)}
          />
        </HStack>
        <Divider bg="coolGray.200" mb={2} />
      </Box>
    )
  }, [participants])

    const {colors} = useContext(ThemeContext)

    const styles = React.useMemo(
        () => createStyles(colors),
        [colors]
    );

  return (
    <Box style={styles.container} >
      <Searchbar
        style={styles.search}
        placeholder="Поиск..."
        onChangeText={setSearchValue}
        inputStyle={{fontSize: 16, lineHeight: 16}}
        iconColor={'#2948ff'}
        value={search}
      />
      { 
        loading ? (
          <View style={styles.spinner__wrapper}>
            <Spinner/>
          </View>
        )
          : ( 
            <FlatList
              ListEmptyComponent={
                <Text style={styles.text}>
                  В этом проекте пока нет участников! 
                </Text>
              }
              snapToAlignment='center'
              scrollEventThrottle={16}
              data={searchFilter(search)}
              mt={5}
              renderItem={({item}) => (
                participantCard(item)
              )}
              keyExtractor={(item) => item.id}
            />
          )
      }
    </Box>
  );  
}

const createStyles = (colors: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: "100%",
    },
    container_card: {
      backgroundColor: colors.background,
      marginHorizontal: 10
    },
    search: {
      marginTop: 15,
      borderRadius: 33,
      marginLeft: 21,
      marginRight: 21,
      height: 40
    },
    spinner__wrapper: {
      height: '90%',
      justifyContent: 'center'
    },
    text: {
      fontSize: 20,
      alignSelf: "center",
      marginTop: "50%",
      color: colors.text
    }
  })
    return styles
}

export default ParticipantsProject;
