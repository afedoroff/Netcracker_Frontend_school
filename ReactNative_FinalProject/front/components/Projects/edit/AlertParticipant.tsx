import { Text, Box, VStack, Alert, HStack, IconButton, CloseIcon } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { Pressable } from 'react-native';

type AlertProps = {
    setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const AlertParticipant = ({setShowAlert}: AlertProps ) => {
    return (
        <Pressable onPress={() => setShowAlert(false)}>
            <Alert w="100%" maxW="400" status="error" borderRadius={8} p={5}>
                <VStack space={2} w="80%">
                    <HStack space={2} justifyContent="space-between" >
                        <HStack space={2} alignItems="center">
                            <Alert.Icon size={"8"}/>
                            <Text fontSize="md" fontWeight="medium">
                                Упс, ошибка!
                            </Text>
                        </HStack>
                        <IconButton 
                            variant="unstyled" 
                            icon={<CloseIcon size="3" color="coolGray.600" />} 
                            onPress={() => setShowAlert(false)} 
                        />
                    </HStack>
                    <Box >
                        <Text color="coolGray.600" fontSize="md"> 
                            Данный пользователь уже добавлен в проект. 
                            Выберите из списка другого участника
                        </Text>
                    </Box>
                </VStack>
            </Alert>
        </Pressable>
    )
}

export default AlertParticipant;