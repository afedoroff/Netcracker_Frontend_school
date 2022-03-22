import {ip} from "../../../IPAddress";
import {showToastWithGravityAndOffset} from "../utils/Toast";

export async function addComment(
  taskID: string,
  userID: string,
  commentText: string,
  token: string
) {
  try {
    const response = await fetch(`https:/${ip}/task/addComment`, {
      method: "POST",
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        taskID: taskID,
        comment: {
          userID: userID,
          text: commentText
        }
      })
    });
    return response.json();
  } catch (error) {
    showToastWithGravityAndOffset("Что-то пошло не так...")
  }
}

export async function updateComment(
  taskID: string,
  commentID: string,
  commentText: string,
  token: string
) {
  try {
    const response = await fetch(`https://${ip}/task/updateComment`, {
      method: "PUT",
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        taskID: taskID,
        commentID: commentID,
        text: commentText
      })
    });
    return response.json();
  } catch (error) {
    showToastWithGravityAndOffset("Что-то пошло не так...")
  }
}

export async function deleteComment(
  taskID: string,
  commentID: string,
  token: string
) {
  try {
    const response = await fetch(`https://${ip}/task/deleteComment`, {
      method: "POST",
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        taskID: taskID,
        commentID: commentID
      })
    });
    return response.json();
  } catch (error) {
    showToastWithGravityAndOffset("Что-то пошло не так...")
  }
}
