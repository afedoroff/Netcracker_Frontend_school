import {ip} from "../../../IPAddress";
import {ITask} from "../../Interfaces/Interfaces";
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from "react-native";
import RNFS from 'react-native-fs'
import {showToastWithGravityAndOffset} from "../utils/Toast";

export async function create(
    data: ITask,
    token: string
) {
    try {
        const response = await fetch(`https:/${ip}/task/add`, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function edit(
    data: ITask,
    taskID: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/task/update`, {
            method: "PUT",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: data,
                taskID: taskID
            })
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function remove(
    taskID: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/task/delete`, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: taskID
            })
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function setPriority(
    priority: string,
    taskID: string,
    token: string
) {
    try {
        const response = await fetch(`https:/${ip}/task/updatePriority`, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                option: priority,
                taskID: taskID
            })
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function setStatus(
    status: string,
    taskID: string,
    token: string
) {
    try {
        const response = await fetch(`https:/${ip}/task/updateStatus`, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                option: status,
                taskID: taskID
            })
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function getMyTasks(
    userID: string,
    token: string
) {
    try {
        const response = await fetch(`https:/${ip}/task/myTasks?participantID=${userID}`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function getProjectTasks(
    projectID: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/task/projectTasks?projectID=${projectID}`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
        });
        return response.json();
    } catch (error) {
      showToastWithGravityAndOffset("Что-то пошло не так...");
    }
}

export async function uploadFile(
    taskID: string,
    token: string
) {
    try {
        const file = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles]
        });
        const formData = new FormData();
        formData.append('file', {
            name: file.name,
            uri: file.uri,
            type: file.type
        });
        const response = await fetch(`https://${ip}/task/uploadFile?taskID=${taskID}&fileName=${file.name}`, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        showToastWithGravityAndOffset("Вложение добавлено");
        return response.json();
    } catch (err) {
        if (DocumentPicker.isCancel(err))
            return;
        else
            showToastWithGravityAndOffset("Что-то пошло не так...");
    }
}

export async function downloadFile(fileName: string) {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (granted['android.permission.READ_EXTERNAL_STORAGE'] && granted['android.permission.WRITE_EXTERNAL_STORAGE']) {
            let downloadDir = `${RNFS.DownloadDirectoryPath}/ProjectManager/`;
            const dirExist = await RNFS.exists(downloadDir);
            if (!dirExist) {
                await RNFS.mkdir(downloadDir)
            }
            RNFS.downloadFile({
                fromUrl: `https://${ip}/attachments/${fileName}`,
                toFile: `${RNFS.DownloadDirectoryPath}/ProjectManager/${fileName}`
            }).promise
            showToastWithGravityAndOffset(`Файл сохранен в ${RNFS.DownloadDirectoryPath}/ProjectManager`);
        }
    } catch (e) {
        showToastWithGravityAndOffset("Что-то пошло не так...");
    }
}

export async function deleteFile(
    taskID: string,
    attachmentName: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/task/deleteFile`, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskID: taskID,
                attachmentName: attachmentName
            })
        });
        showToastWithGravityAndOffset("Вложение удалено");
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...");
    }
}
