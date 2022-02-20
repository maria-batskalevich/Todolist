import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '6edbfb4c-72af-41bd-bff3-c7202fbe7120'
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

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
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
      getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{items: TaskType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}







