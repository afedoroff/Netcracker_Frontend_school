import { ip } from "../../../IPAddress";
import {showToastWithGravityAndOffset} from "../../Tasks/utils/Toast";

export async function registration(
    username: string,
    password: string,
    lastName: string,
    firstName: string,
    avatar: string,
    email: string,
    specialization: string
) {
    try {
        const response = await  fetch(`https://${ip}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                lastname: lastName,
                firstname: firstName,
                avatar: avatar,
                email: email,
                specialization: specialization
            })
        })
        showToastWithGravityAndOffset("Пользователь зарегистрирован")
        return response.json();
    } catch (error) {
        showToastWithGravityAndOffset("Не удалось зарегистрироваться...")
    }
}

export const authUser = async (username: string, password: string) => {
    try {
        const response = await fetch(`https://${ip}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        return response.json()
    } catch (e) {
        showToastWithGravityAndOffset("Не удалось войти в систему...")
    }
}
