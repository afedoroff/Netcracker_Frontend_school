import {
  Text,
  HStack, IconButton,
} from 'native-base';
import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {deleteFile, downloadFile} from "../Tasks/services/tasks";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ThemeContext} from "../Providers/ThemeProvider.";
import {ColorTheme} from "../Constant/Colors";
import {useAppContext} from "../Context/AppContext";

type CardAttachmentProps = {
  attachmentName: string
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>
  taskID: string
}

function CardAttachment({attachmentName, setAttachments, taskID}: CardAttachmentProps) {
  const {colors} = useContext(ThemeContext);
  const {token} = useAppContext();
  const styles = React.useMemo(
    () => createStyles(colors),
    [colors]
  );

  const downloadAttachment = useCallback(async () => {
    await downloadFile(attachmentName)
  }, [attachmentName]);

  const deleteAttachment = useCallback(async () => {
    await deleteFile(taskID, attachmentName, token)
    .then(result => setAttachments(result.attachments))
  }, [attachmentName]);

  return (
    <>
      <HStack justifyContent={"space-between"} style={styles.container} >
        <Text style={styles.attachment}>
          {attachmentName}
        </Text>
        <IconButton
          size={4}
          marginRight={6}
          onPress={() => {
            downloadAttachment();
          }}
          _icon={{
            as: AntDesign,
            name: "download",
            color: "grey",
            size: 5
          }}
          _pressed={{
            bg: "none"
          }}
        />
        <IconButton
          size={4}
          marginRight={6}
          onPress={() => {
            deleteAttachment()
          }}
          _icon={{
            as: AntDesign,
            name: "delete",
            color: "grey",
            size: 5
          }}
          _pressed={{
            bg: "none"
          }}
        />
      </HStack>
    </>
  );
}


const createStyles = (colors: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      borderRadius: 12,
      elevation: 1.8,
      backgroundColor: colors.background_light,
      marginBottom: 12,
      marginTop: 6,
      padding: 10,
      paddingTop: 15
    },
    attachment: {
      fontFamily: 'main',
      fontSize: 14,
      color: colors.text,
      width: '75%'
    },
    username: {
      fontSize: 17,
      color: '#adadad'
    },
    dateComment: {
      position: "absolute",
      bottom: 5,
      right: 12
    }
  })
  return styles
}

export default CardAttachment;
