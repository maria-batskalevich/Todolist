import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'API'
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