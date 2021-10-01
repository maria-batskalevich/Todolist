import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    callBack: (title: string) => void

}

export const EditableSpan = (props: PropsType) => {
    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)
    const editON = () => {
        setEdit(true)
    }

    const editOFF = () => {
        setEdit(false)
        props.callBack(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        edit
            ? <TextField value={title} onBlur={editOFF} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editON}>{props.title}</span>
    )
}