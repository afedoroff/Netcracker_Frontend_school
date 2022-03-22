import {ip} from "../../../IPAddress";
import {IProject} from "../../Interfaces/Interfaces";
import {showToastWithGravityAndOffset} from "../../Tasks/utils/Toast";

export async function getProjects(token: string) {
    try {
        const response = await fetch(`https://${ip}/project`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            }
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function getCurrentUser(id: string, token: string) {
    try {
        const response = await fetch(`https://${ip}/user/getUser?id=${id}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function createProject(
    data: IProject,
    creatorID: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/project/add`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: data.description,
                projectName: data.projectName,
                creatorID: creatorID,
            })
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function getUsers(token: string) {
    try {
        const response = await fetch(`https://${ip}/user/getUsers`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        })
        return response.json()
    } catch (e) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function getProjectUsers(id: string, token: string) {
    try {
        const response = await fetch(`https:/${ip}/project/getProjectUser?id=${id}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        })
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function updateProject(
    id: string,
    data: IProject,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/project/update`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                project: {
                    projectName: data.projectName,
                    description: data.description,

                }
            })
        });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function addParticipantInProject(
    projectID: string,
    username: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/project/addParticipants`,
            {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    projectID: projectID,
                })
            });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function removeParticipantInProject(
    projectID: string,
    userID: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/project/deleteParticipant`,
            {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: userID,
                    projectID: projectID,
                })
            });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function removeProject(
    projectID: string,
    token: string
) {
    try {
        const response = await fetch(`https://${ip}/project/delete`,
            {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: projectID,
                })
            });
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Что-то пошло не так...")
    }
}

export async function projectTasksByID(id: string, token: string) {
    try {
        const response = await fetch(`https://${ip}/task/projectTasks?projectID=${id}`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        })
        return response.json()
    }
  catch (e) {
      showToastWithGravityAndOffset("Что-то пошло не так...")
  }
}
