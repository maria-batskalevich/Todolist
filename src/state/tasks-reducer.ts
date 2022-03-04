import {TaskStatuses, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {taskApi, TaskPriorities, TaskType} from "../api/task-api";
import {TasksStateType} from "../AppWithRedux";
import {AppRootStateType} from "./store";

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            // debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}

export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

//Thunk
export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.getTask(todolistId)
            .then((res) => {
                let tasks = res.data.items
                dispatch(setTaskAC(tasks, todolistId))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                // let tasks = res.data.items
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskApi.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        // debugger
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        taskApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })
    }

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

