import React, {createContext, Dispatch, SetStateAction, useContext} from 'react'

export type AppContextProps = {
    auth: boolean,
    setAuth: () => void,
    userID: string | undefined,
    setToken: Dispatch<SetStateAction<string>>,
    token: string,
    setUserID: (value: string) => void,
    reloadTasks: boolean,
    setReload: () => void,
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const useAppContext = () => {
    return useContext(AppContext)
}

