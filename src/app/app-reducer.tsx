export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status} as InitialStateType
        case "'APP/SET-ERROR'":{
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: string) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "'APP/SET-ERROR'", error} as const)

export type AppActionsType = ReturnType<typeof setAppStatusAC>
| ReturnType<typeof setAppErrorAC>

