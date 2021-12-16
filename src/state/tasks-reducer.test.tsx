import React from 'react';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "React", isDone: true},
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: true},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false},
        ]
    };
});

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))
    expect(endState["todolistId2"].length).toBe(2)
})

test('new task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC('todolistId2', "Some fruit)"))

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe("Some fruit)")
})

test('task should change status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '1', true))
    expect(endState['todolistId2'][0].isDone).toBe(true)
})

test('task should change its title', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '1', 'chicken'))
    expect(endState['todolistId2'][0].title).toBe('chicken')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


