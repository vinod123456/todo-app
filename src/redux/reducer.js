import { ADD_TODO, EDIT_TODO, DELETE_TODO, ACTIVE_STATUS } from './actionTypes'



export const reducer = (state = [], action) => {
    let todos = []
    console.log(action)
    switch (action.type) {
        case ADD_TODO:
            return (
                [
                    action.payload,
                    ...state
                ]
            )

        case EDIT_TODO:
            todos = state.map(todo => {
                if (todo.id === action.payload.id) {
                    return action.payload
                }
                return todo
            })
            return todos
        case DELETE_TODO:
            console.log(state)
            todos = state.filter(todo => todo.id !== action.payload)
            return (
                todos
            )
        case ACTIVE_STATUS:
            todos = state.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
            return todos
        default:
            return state
    }
}