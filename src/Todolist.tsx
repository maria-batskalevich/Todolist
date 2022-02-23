import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from './Task'
import {TaskStatuses} from "./api/todolist-api";
import {FilterValuesType} from "./state/todolists-reducer";
import {useDispatch} from "react-redux";
import {setTasksTC} from "./state/tasks-reducer";
import {TaskType} from "./api/task-api";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist called')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all',), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist?.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                 removeTask={props.removeTask}
                                                 changeTaskTitle={props.changeTaskTitle}
                                                 changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


