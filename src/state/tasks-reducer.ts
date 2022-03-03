import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodosActionType,
    TodolistDomainType
} from './todolists-reducer';
import {TaskStatuses, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {taskApi, TaskPriorities, TaskType} from "../api/task-api";
import {TasksStateType} from "../AppWithRedux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTaskACType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: TaskType[]
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ReturnType<typeof updateTaskAC>
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTaskACType

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
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'UPDATE-TASK': {
            // debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOS' :
            // debugger
            const copyState = {...state}
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, model}
}


export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId}
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

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (disoatch: Dispatch, getState: () => AppRootStateType) => {
        const currentTask = getState().tasks[todolistId].find(f => {
            return f.title === title
        })
        if (currentTask) {
            const model: UpdateTaskModelType = {
                title: title,
                status: currentTask.status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline
            }
            taskApi.updateTask(todolistId, taskId, model)
                .then((res) => {
                    disoatch(changeTaskTitleAC(todolistId, taskId, title))
                })
        }
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

