import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";

export type ActionsType =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state,]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(f => f.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(f => f.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id}) as const
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()}) as const
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
}) as const
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
}) as const

