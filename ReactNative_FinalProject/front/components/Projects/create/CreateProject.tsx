import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { VStack} from 'native-base';
import React, {useCallback, useContext} from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RootStackParamList } from '../../Navigations/NavigationProjects';
import { IProject, IUser} from "../../Interfaces/Interfaces";
import { createProject } from '../services/projects';
import {ColorTheme} from "../../Constant/Colors";
import {ThemeContext} from "../../Providers/ThemeProvider.";
import { useAppContext } from '../../Context/AppContext';
import { Controller, useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { projectValidationSuite } from '../../../validation/projectValidation';
import ValidationErrorText from '../../ValidationErrorText';
import { FAB } from 'react-native-elements';

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CreateProject'
    >;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: RouteProp<{ params: { user: IUser} }, 'params'>
};

function CreateProject({navigation, route}: Props) {
  const {setReload, token} = useAppContext()
  const {colors} = useContext(ThemeContext)
  const user = route.params?.user;

  const { control, handleSubmit, formState: { errors } } = useForm<IProject>({
    resolver: vestResolver(projectValidationSuite),
    defaultValues: {
      projectName: '',
      description: ''
    }
  });

  const styles = React.useMemo(
      () => createStyles(colors),
      [colors]
  );

  const create = useCallback(async (data) => {
    await createProject(data, user._id, token);
    setReload();
    navigation.goBack();
  }, [])

  return (
      <VStack style={styles.container} space={4}>
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
                      onBlur={onBlur}
                      outlineColor={colors.textInputBorder}
                      activeOutlineColor={colors.textActiveInputBorder}
                      label='Название проекта'
                      multiline={true}
                      style={styles.projectName}
                      onChangeText={onChange}
                      value={value}
                  />
                  <ValidationErrorText errorMessage={errors.projectName?.message}/>
                </>
            )}
            name="projectName"
        />
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
                          placeholder: colors.subText,
                          background: colors.background
                        }
                      }}
                      mode="outlined"
                      onBlur={onBlur}
                      multiline={true}
                      outlineColor={colors.textInputBorder}
                      activeOutlineColor={colors.textActiveInputBorder}
                      label='Описание проекта'
                      style={styles.descriptionProject}
                      onChangeText={onChange}
                      value={value}
                  />
                  <ValidationErrorText errorMessage={errors.description?.message}/>
                </>
            )}
            name="description"
        />
        <FAB
            icon={{name: 'check', color: 'white'}}
            color={colors.fab_color}
            onPress={handleSubmit(create)}
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
    projectName: {
      marginTop: 45,
      backgroundColor: colors.background
    },
    descriptionProject: {
      maxHeight: 250,
      minHeight: 150
    }
  })
  return styles
}

export default CreateProject;
