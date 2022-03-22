import {AlertDialog,Button,Text} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {ThemeContext} from "../../Providers/ThemeProvider.";
import {useAppContext} from "../../Context/AppContext";
import { removeProject } from '../services/projects';


type AlertRemoveProps = {
    isOpenAlert: boolean;
    onCloseAlert: () => void;
    idProject: string;
};


function AlertRemove({isOpenAlert, onCloseAlert, idProject}: AlertRemoveProps) {
    const cancelRef = React.useRef(null)
    const {setReload, token} = useAppContext()
    const {colors} = useContext(ThemeContext)

    const remove = useCallback(async () => {
        await removeProject(idProject, token)
            .then(() => setReload());
    }, []);

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpenAlert}
            onClose={onCloseAlert}
        >
        <AlertDialog.Content>
            <AlertDialog.CloseButton/>
            <AlertDialog.Header 
                backgroundColor={colors.borderColor}>
                <Text fontSize="md" fontWeight="medium" color={"white"}>
                    Удалить проект
                </Text>
                </AlertDialog.Header>
            <AlertDialog.Body backgroundColor={colors.background}>
            <Text color={colors.text}>
                Вы точно хотите удалить проект? 
                Все задачи также будут удалены
            </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer backgroundColor={colors.background_light}>
                <Button.Group space={2}>
                    <Button
                        variant="unstyled"
                        colorScheme="coolGray"
                        onPress={onCloseAlert}
                        ref={cancelRef}
                        _text={{
                            color: colors.text
                        }} 
                    >
                        Назад
                    </Button>
                    <Button colorScheme="danger" onPress={() => {
                        remove();
                        onCloseAlert();
                    }}>
                    Удалить
                    </Button>
                </Button.Group>
            </AlertDialog.Footer>
        </AlertDialog.Content>
        </AlertDialog>
    )}
    
export default AlertRemove;
