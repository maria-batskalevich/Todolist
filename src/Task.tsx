import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle);
    }, [props.changeTaskTitle, props.todolistId, props.task.id])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})