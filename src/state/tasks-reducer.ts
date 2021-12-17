import {TaskType} from "../Todolist";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";

export type ActionsType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id != action.id);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, id: string) => ({type: 'REMOVE-TASK', todolistId, id}) as const
export const addTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title}) as const
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    id,
    isDone
}) as const
export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    id,
    title
}) as const

