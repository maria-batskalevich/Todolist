import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c8be0b36-3ac5-42a7-89ea-e79ef5d95007'
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const todolistAPI = {
    getTodolist() {
        // debugger
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>
        ('todo-lists', {title});
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>
        (`todo-lists/${id}`, {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
}
