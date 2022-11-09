import {setIsLoggedInAC} from "../features/Login/authReducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status} as InitialStateType
        case "'APP/SET-ERROR'": {
            return {...state, error: action.error}
        }
        case "APP/SET-ISINITIALIZED":
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

export const setAppStatusAC = (status: string) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "'APP/SET-ERROR'", error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-ISINITIALIZED', isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedACActionType = ReturnType<typeof setIsInitializedAC>

type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedACActionType

