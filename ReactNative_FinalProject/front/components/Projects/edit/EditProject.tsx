import { RouteProp } from '@react-navigation/native';
import { VStack, Text, HStack, Box, IconButton, } from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IProject} from "../../Interfaces/Interfaces";
import { ProfileScreenNavigationProp } from '../Projects';
import ModalAddParticipant from './ModalAddParticipant';
import {FAB} from "react-native-elements";
import { getProjectUsers, updateProject } from '../services/projects';
import {ThemeContext} from "../../Providers/ThemeProvider.";
import {ColorTheme} from "../../Constant/Colors";
import { useAppContext } from '../../Context/AppContext';
import { Controller, useForm } from 'react-hook-form';
import { projectValidationSuite } from '../../../validation/projectValidation';
import { vestResolver } from '@hookform/resolvers/vest';
import ValidationErrorText from '../../ValidationErrorText';

export type ParticipantsProps = {
  id: string,
  username: string,
  firstname: string,
  lastname: string,
}

type EditProjectProps = {
  navigation: ProfileScreenNavigationProp,
  route: RouteProp<{ params: { project: IProject} }, 'params'>
}

function EditProject({ navigation, route }: EditProjectProps) {
  const item  = route.params?.project;
  const projectId = item._id;

  const [participants, setParticipant] = useState<ParticipantsProps[]>([]);
  const [showModalAddParticipant, setShowModalAddParticipant] = useState(false);

  const {setReload, token} = useAppContext()
  const {colors} = useContext(ThemeContext)

  const { control, handleSubmit, formState: { errors } } = useForm<IProject>({
    resolver: vestResolver(projectValidationSuite),
    defaultValues: {
      projectName: item.projectName,
      description: item.description
    }
  });

  const styles = React.useMemo(
      () => createStyles(colors),
      [colors]
  );

  useEffect(() => {
    getProjectUsers(item._id, token)
      .then(projectUsers =>  setParticipant(projectUsers))
  }, [showModalAddParticipant])

  const update = useCallback(async(data) => {
    await updateProject(item._id, data, token);
    setReload();
    navigation.goBack();
  }, [item])

  return (
      <VStack  style={styles.container} >
        <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                      theme={{
                        colors: {
                          text: colors.text,
                          placeholder: colors.subText
                        }
                      }}
                      mode="outlined"
                      outlineColor={colors.textInputBorder}
                      activeOutlineColor={colors.textActiveInputBorder}
                      placeholder='Название проекта'
                      label={'Название проекта'}
                      style={styles.name_Input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                  />
                  <ValidationErrorText errorMessage={errors.projectName?.message}/>
                </>
            )}
            name="projectName"
        />
        <ModalAddParticipant
            showModal={showModalAddParticipant}
            setShowModal={setShowModalAddParticipant}
            id={item._id}
            participants={participants}
        />
        <Box
            shadow='1'
            style={styles.shadowProp}
        >
          <Pressable onPress={() => navigation.navigate("ParticipantsProject", {projectId})}>
            <HStack justifyContent='space-between' w={"100%"}>
              <HStack>
                <MaterialCommunityIcons name="account-multiple" color={colors.borderColor} size={40} />
                <Text style={styles.text} >
                  Участники
                </Text>
              </HStack>
              <IconButton
                  size={'sm'}
                  variant="solid"
                  bg={colors.borderColor}
                  onPress={() => setShowModalAddParticipant(true)}
                  _icon={{
                    as: MaterialCommunityIcons,
                    name: "account-plus-outline"
                  }}
              />
            </HStack>
          </Pressable>
        </Box>
        <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                      style={styles.description_Input}
                      theme={{
                        colors: {
                          text: colors.text,
                          placeholder: colors.subText,
                        }
                      }}
                      mode="outlined"
                      label="Описание проекта"
                      outlineColor={colors.textInputBorder}
                      activeOutlineColor={colors.textActiveInputBorder}
                      multiline={true}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                  />
                  <ValidationErrorText errorMessage={errors.description?.message}/>
                </>
            )}
            name="description"
        />
        <FAB
            icon={{ name: 'check', color: 'white' }}
            color={colors.fab_color}
            onPress={handleSubmit(update)}
            placement={'right'}
        />
      </VStack>
  );
}

const createStyles = (colors: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16
    },
    text: {
      fontFamily: 'main',
      fontSize: 18,
      marginTop: 10,
      marginLeft: 10,
      color: colors.text
    },
    name_Input:{
      fontSize: 18,
      marginTop: 25,
      backgroundColor: colors.background
    },
    description_Input: {
      maxHeight: 200,
      minHeight: 150,
      fontSize: 16,
      backgroundColor: colors.background,
      marginTop: 25,
    },
    shadowProp: {
      minHeight: 60,
      padding: 10,
      borderColor: colors.text,
      shadowColor: colors.text,
      shadowOffset: {width: -2, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
  })
  return styles
}

export default EditProject;
