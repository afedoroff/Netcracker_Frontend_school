import {Center, Divider, FlatList, HStack, Text, TextArea, VStack} from "native-base";
import {Avatar} from "react-native-paper";
import Icon, {Icons, iconStyle} from "../Navigations/Icons";
import {Controller, useForm} from "react-hook-form";
import PriorityPicker from "./PriorityPicker";
import {Priority, Status} from "./TaskOptions";
import StatusPicker from "./StatusPicker";
import CircularProgress from "react-native-circular-progress-indicator";
import {dateToSting} from "./utils/StringDate";
import React, {useContext} from "react";
import {StyleSheet} from "react-native";
import {ITask} from "../Interfaces/Interfaces";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import CardAttachment from "../Cards/CardAttachment";

type TaskHeaderComponentProps = {
  task: ITask,
  dateTask: any,
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>,
  attachments: string[]
}

export const TaskHeaderComponent = ({task, dateTask, attachments, setAttachments}: TaskHeaderComponentProps) => {
  const {control} = useForm<ITask>({
    defaultValues: {
      priority: task.priority,
      status: task.status,
    }
  });

  const {colors} = useContext(ThemeContext)

  const styles = React.useMemo(
      () => createStyles(colors),
      [colors]
  );

  return (
    <Center style={styles.container}>
      <VStack style={styles.header}>
        <VStack
          style={styles.header__task}>
          <Avatar.Icon
            style={[styles.component_icon, {backgroundColor: iconStyle(task.component).backgroundColor}]}
            size={90} icon={iconStyle(task.component).icon}/>

          <Text style={styles.header__task_name}>{task.taskName}</Text>
          <Text style={styles.header__task_sub}>{task.component} ({task.type})</Text>
        </VStack>
        <VStack marginTop={14} style={styles.container__main}>
          <Divider/>
          <Text style={styles.main__text}>Приоритет</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <PriorityPicker
                value={value}
                optionsArray={Priority}
                onChange={onChange}
                taskID={task._id}
              />
            )}
            name="priority"
          />
          <Divider style={{marginTop: 14}}/>
          <Text style={styles.main__text}>Статус</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <StatusPicker
                value={value}
                optionsArray={Status}
                onChange={onChange}
                taskID={task._id}
              />
            )}
            name="status"
          />
        </VStack>
        <VStack flexDirection='row' justifyContent="center" mt={4} style={styles.date__container}>
          <VStack style={styles.circular__container}>
            <CircularProgress
              activeStrokeColor={colors.borderColor}
              inActiveStrokeColor={'rgba(203,203,203,0.98)'}
              activeStrokeSecondaryColor={colors.borderColor}
              value={dateTask.daysRemainingNum}
              radius={50}
              duration={1000}
              textColor={colors.text}
              maxValue={dateTask.allDays}
              valueSuffix={' д.'}
              inActiveStrokeWidth={9}
              activeStrokeWidth={9}
              textStyle={{fontWeight: '400', color: 'yellow', fontSize: 18}}
            />
          </VStack>
          <VStack>
            <HStack justifyContent="space-between" style={styles.time__item}>
              <HStack alignItems="center">
                <Icon type={Icons.FontAwesome} name="hourglass-start" color="grey" size={15}/>
                <Text style={styles.time__item_text}>Начало: </Text>
              </HStack>
              <Text style={styles.date_text}>{dateToSting(task.startDate)}</Text>
            </HStack>

            <HStack justifyContent="space-between" style={styles.time__item} mt={4}>
              <HStack alignItems='center'>
                <Icon type={Icons.FontAwesome} name="hourglass-end" color="grey" size={15}/>
                <Text style={styles.time__item_text}>Конец: </Text>
              </HStack>
              <Text style={styles.date_text}>{dateToSting(task.endDate)}</Text>
            </HStack>
          </VStack>
        </VStack>
        <VStack style={styles.description_wrapper} mt={5}>
          <TextArea placeholder="Описание" minWidth={"100%"} isDisabled={true}
                    style={styles.description}>
            {task.description}
          </TextArea>
        </VStack>
        <VStack>
          <Text fontSize={18} mt={5} mb={0} fontFamily={'main'} color={colors.text}>Вложения</Text>
          <Divider style={styles.divider}/>
        </VStack>
        <FlatList
          data={attachments}
          renderItem={({item}) => (
            <CardAttachment attachmentName={item} setAttachments={setAttachments} taskID={task._id}/>
          )}
          ListEmptyComponent={
            <VStack style={styles.noComments}>
              <Text style={styles.noComments__text}>Вложений нет</Text>
            </VStack>
          }
        />
        <VStack>
          <Text fontSize={18} mt={5} mb={0} fontFamily={'main'} color={colors.text}>Комментарии</Text>
          <Divider style={styles.divider}/>
        </VStack>
      </VStack>
    </Center>
  )
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
  header__task: {
    alignItems: 'center',
    marginTop: 20,
  },
  header__task_name: {
    marginTop: 10,
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'main',
    textAlign: 'center',
    color: colors.text
  },
  header__task_sub: {
    fontFamily: 'main',
    fontSize: 14,
    color: 'grey'
  },
  divider: {
    marginBottom: 7
  },
  component_icon: {
    elevation: 9
  },
  container__main: {
    alignItems: 'center'
  },
  main__text: {
    fontFamily: 'main',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 6,
    color: '#6e6e6e'
  },
  circular__container: {
    alignItems: 'center',
    marginRight: '6%',
  },
  time__item: {
    backgroundColor: colors.background,
    elevation: 2,
    padding: 10,
    borderRadius: 30
  },
  time__item_text: {
    color: '#888888',
    marginLeft: 7
  },
  description_wrapper: {
    backgroundColor: colors.background_light,
    elevation: 2,
    borderRadius: 8
  },
  description: {
    borderWidth: 0,
    backgroundColor: colors.background_light,
    minHeight: 20,
    fontSize: 14,
    fontFamily: 'main',
    borderRadius: 8,
    color: colors.text
  },
  date__container: {
    elevation: 2,
    backgroundColor: colors.background_light,
    padding: 10,
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
  },
  date_text: {
    color: colors.text
  }
})
  return styles
}
