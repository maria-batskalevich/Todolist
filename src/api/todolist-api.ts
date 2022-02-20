import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'c8be0b36-3ac5-42a7-89ea-e79ef5d95007'
    },
    withCredentials: true,
})



export const todolistApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists',{title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId:string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    addedData: string
    id: string
    order: number
    title: string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

