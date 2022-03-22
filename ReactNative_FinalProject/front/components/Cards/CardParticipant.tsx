import { Divider, HStack, MinusIcon, Text } from "native-base"
import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

type Props = {
    name: string
}

const CardParticipant = ({name}: Props) => {
    return (
        <>
            <HStack space={2} alignItems="center">
                <MaterialCommunityIcons name="account-circle" color="gray" size={40} />
                <Text maxW="375" w="90%" fontSize="16" color="coolGray.600">
                    {name}
                </Text>
                <MinusIcon size="5" color="coolGray.400"  />
            </HStack>
            <Divider bg="coolGray.200" mt={2}/>
        </>
    )
}

export default CardParticipant;
