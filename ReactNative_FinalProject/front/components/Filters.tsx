import React, {Dispatch, SetStateAction, useContext} from "react";
import {
  Checkbox,
  CloseIcon,
  Divider,
  FormControl,
  HStack,
  IconButton,
  Modal,
  Text,
} from "native-base";
import ComponentOrTypeTask from "./Tasks/ComponentOrTypeTask";
import {ComponentFilter, TypeFilter} from "./Tasks/TaskOptions";
import ComponentRadio from "./Tasks/ComponentRadio";
import {StyleSheet} from "react-native";
import { ThemeContext } from "./Providers/ThemeProvider.";
import { ColorTheme } from "./Constant/Colors";

type FiltersProps = {
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  handleFilter: (component: string, type: string, status: string[]) => void;
  setComponent: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string[]>>;
  status: string[],
  type: string,
  component: string,
}

const Filters = ({
                   setShowFilter,
                   showFilter,
                   setComponent,
                   setType,
                   setStatus,
                   status,
                   type,
                   component
                 }: FiltersProps) => {

  const {colors} = useContext(ThemeContext)
  const styles = React.useMemo(
    () => createStyles(colors),
    [colors]
);

  return (
      <Modal isOpen={showFilter} onClose={() => setShowFilter(false)}>
        <Modal.Content maxWidth="400px" bg={colors.background}>
          <HStack space={2} style={styles.headerModal}>
            <Text fontSize="md" fontWeight="medium" color="white">
              Фильтры
            </Text>
            <IconButton
                variant="unstyled"
                icon={<CloseIcon size="4" color="white"/>}
                onPress={() => setShowFilter(false)}
            />
          </HStack>
          <Modal.Body>
            <Text style={styles.text}>Компоненты</Text>
            <Divider/>
            <ComponentRadio
                value={component}
                optionsArray={ComponentFilter}
                onChange={(nextValue) => {
                  setComponent(nextValue)
                }}/>
            <Text style={styles.text}>Типы</Text>
            <Divider/>
            <ComponentOrTypeTask
                value={type}
                optionsArray={TypeFilter}
                onChange={(nextValue) => {
                  setType(nextValue)
                }}/>
            <Text style={styles.text}>Статус</Text>
            <Divider/>
            <Checkbox.Group
                onChange={setStatus}
                value={status}
                accessibilityLabel="choose numbers"
            >
              <Checkbox colorScheme="blue" value="Открыта">
                <Text style={styles.checkbox_text}>Открыта</Text>
              </Checkbox>
              <Checkbox colorScheme="info" value="В процессе">
                <Text style={styles.checkbox_text}>В процессе</Text>
              </Checkbox>
              <Checkbox colorScheme="orange" value="В тесте">
                <Text style={styles.checkbox_text}>В тесте</Text>
              </Checkbox>
              <Checkbox colorScheme="green" value="Выполнена">
                <Text style={styles.checkbox_text}>Выполнена</Text>
              </Checkbox>
              <Checkbox colorScheme="danger" value="Закрыта">
                <Text style={styles.checkbox_text}>Закрыта</Text>
              </Checkbox>
            </Checkbox.Group>
            <FormControl/>
          </Modal.Body>
        </Modal.Content>
      </Modal>
  )
}

const createStyles = (colors: ColorTheme) => {
  const styles = StyleSheet.create({
  headerModal: {
    justifyContent: "space-between",
    backgroundColor: "#148BCD",
    height: "8%",
    alignItems: "center",
    paddingHorizontal: 10
  },
  text: {
    alignSelf: "center", 
    color: colors.text, 
    fontSize: 16,
    fontFamily: 'main'
  },
  checkbox_text: {
    color: colors.text, 
    marginLeft: 10,
    marginVertical: 5
  },
})
return styles
}
export default Filters;
