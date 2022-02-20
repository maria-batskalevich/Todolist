import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6edbfb4c-72af-41bd-bff3-c7202fbe7120'
    },

}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
        const createTodolist = () => {
            todolistAPI.createTodolist(title)
                .then( (res) => {
                    setState(res.data);
                } )
        }

    return <div> {JSON.stringify(state)}
        <div>
            <input type='text' placeholder={'input title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Create todolist</button>
        </div>

    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input type={'text'} placeholder={'Input todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={deleteTodolist}>Delete todolist</button>
        </div>
    </div>
}



export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [newTitle, setNewTitle] = useState<any>('')
    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, newTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type={'text'} placeholder={'Input todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type={'text'} placeholder={'Input new title'} value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>Update todolist</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'input todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const createTask = () => {
        todolistAPI.createTasks(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'input todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'input title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>Create Tasks</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const [deadline, setDeadline] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [priority, setPriority] = useState<any>('')
    const [startDate, setStartDate] = useState<any>('')
    const [status, setStatus] = useState<any>('')


    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status,
            title: title

        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'input todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'input taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input type="text" placeholder={'input new title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input type="text" placeholder={'input new description'} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input type="text" placeholder={'input new status'} value={status} onChange={(e) => setStatus(e.currentTarget.value)}/>
            <input type="text" placeholder={'input new priority'} value={priority} onChange={(e) => setPriority(e.currentTarget.value)}/>
            <button onClick={updateTask}>Update Tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'input todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'input taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>Delete Tasks</button>
        </div>
    </div>
}

