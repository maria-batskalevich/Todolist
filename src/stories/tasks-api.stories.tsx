import React, {useState} from 'react'
import {taskApi} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
   const getTasks = () => {
       taskApi.getTask(todolistId)
           .then((res) => {
               setState(res.data)
           })
   }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTasks}>getTasks</button>
        </div>
    </div>



}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const createTask = () => {
            taskApi.createTask(todolistId, title)
                .then((res) => {
                    setState(res.data)
                })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input type="text" placeholder={'taskTitle'} value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTask}>createTask</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTask = () => {
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input type="text" placeholder={'taskId'} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>deleteTask</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')

    const updateTask = () => {
        taskApi.updateTask(todolistId, taskId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input type="text" placeholder={'taskId'} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <input type="text" placeholder={'taskTitle'} value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>
            <button onClick={updateTask}>updateTask</button>
        </div>
    </div>
}
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//             setState(res.data)
//         })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         let title = '88888'
//         todolistApi.createTodo(title)
//             .then((res) => {
//             setState(res.data)
//         })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         let todolistId = '3f86aece-35fd-41e3-9f7e-bd1543b82f7c'
//         todolistApi.deleteTodo(todolistId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         let todolistId = 'c55d255c-7e16-4a04-bca0-07225bc8fa6d'
//         let title = '77777'
//         todolistApi.updateTodoTitle(todolistId, title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }

