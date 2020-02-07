import { ADD_TODO, EDIT_TODO, DELETE_TODO, ACTIVE_STATUS } from './actionTypes'
import uuidv4 from 'uuid'

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: { ...todo, id: uuidv4() }
    }
}

export const editTodo = todo => {
    return {
        type: EDIT_TODO,
        payload: todo
    }
}

export const deleteTodo = todo => {
    return {
        type: DELETE_TODO,
        payload: todo
    }
}

export const toggleStatus = (todo) => {
    return {
        type: ACTIVE_STATUS,
        payload: todo
    }
}

