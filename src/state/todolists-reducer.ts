import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodosAC>

const initialState: Array<TodolistDomainType> = []
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOS": {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}

export const setTodosAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOS', todolists
    } as const
}
export type SetTodosActionType = ReturnType<typeof setTodosAC>


//THUNK
export const setTodosTC = () => (dispatch: Dispatch): void => {
    // debugger
//1. side effect
    todolistAPI.getTodolist()
        .then((res) => {
            // debugger
            // 2. dispatch action (thunk)
            dispatch(setTodosAC(res.data))
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(id)
        .then((res => {
            dispatch(removeTodolistAC(id))
        }))
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const ChangeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}












