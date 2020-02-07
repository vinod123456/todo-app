import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteTodo, toggleStatus } from '../redux'

// Import AddToto Component
import Model from './Model'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } from './config'
let date = new Date()
const initialState = {
    summary: '',
    description: '',
    createdDate: `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 9 ? `0${date.getDate()}` : date.getDate()}`,
    dueDate: '',
    priority: 'None',
    completed: false
}

const TodoList = () => {
    const [showModel, setShowModel] = useState(false)
    const [editTodo, setEditTodo] = useState(initialState)
    const [searchKey, setSearchKey] = useState(null)
    const searchRef = useRef(null)
    const todos = useSelector(state => state)
    const dispatch = useDispatch()
    const [filteredTodos, setFilteredTodos] = useState(todos)
    const [sortCondition, setSortCondition] = useState({ property: null, inc: false })



    // const sortedTodos = []

    useEffect(() => {
        setFilteredTodos(todos)
        document.addEventListener('keydown', goToSearch)

        // return (
        //     document.removeEventListener('keydown', goToSearch)
        // )

    }, [todos])

    const goToSearch = (e) => {
        console.log(e)
        if (e.ctrlKey && e.shiftKey && e.key === 'K') {
            searchRef.current.focus()
        }
    }


    console.log(todos)

    //filter todos on completion status
    const filterTodos = (filter) => {
        switch (filter) {
            case SHOW_ALL:
                setFilteredTodos(todos)
                break
            case SHOW_COMPLETED:
                setFilteredTodos(todos.filter(todo => todo.completed))
                // filteredTodos = todos.filter(todo => todo.completed)
                break
            case SHOW_PENDING:
                console.log(todos)
                setFilteredTodos(todos.filter(todo => !todo.completed))
                // filteredTodos = todos.filter(todo => !todo.completed)
                break
            default:
                break
        }
    }

    //sorting

    const sortFilter = (e) => {
        const property = e.target.getAttribute('name')
        if (property === sortCondition.property) {
            setSortCondition({ ...sortCondition, inc: !sortCondition.inc })
        }
        else {
            setSortCondition({ property, inc: true })
        }
    }


    //set model status
    const model = (e, todo) => {
        e.stopPropagation();
        setShowModel(!showModel)
        setEditTodo(todo)

    }
    //to close model
    const close = () => {
        setShowModel(false)
        setEditTodo(initialState)
    }

    const status = (e, todo) => {
        e.stopPropagation();
        dispatch(toggleStatus(todo))
    }

    const handleChange = (e) => {
        setSearchKey(e.target.value)
        // setFilteredTodos(filterForSearch.filter())
    }




    return (
        <div className='todo-container'>
            <form className='inline-form search-container'>
                <div className='form-group mr-2'>
                    <input type='text' ref={searchRef} className='form-control' placeholder='Search Todos' value={searchKey} onChange={handleChange} />
                </div>
            </form>
            <div className='tabs-container'>
                <nav className='nav' >
                    <a className='nav-link' onClick={() => filterTodos(SHOW_ALL)}>All</a>
                    <a className='nav-link' onClick={() => filterTodos(SHOW_COMPLETED)}>Completed</a>
                    <a className='nav-link' onClick={() => filterTodos(SHOW_PENDING)}>Pending</a>
                </nav>


            </div>

            <table className='table '>
                <thead className='thead-light'>
                    <tr>
                        <th name='summary' onClick={sortFilter}>summary <i className={`fas fa-sort-${sortCondition.inc && sortCondition.property === 'summary' ? 'up' : 'down'}`}></i> </th>
                        <th name='priority' onClick={sortFilter} >Priority <i className={`fas fa-sort-${sortCondition.inc && sortCondition.property === 'priority' ? 'up' : 'down'}`}></i></th>
                        <th name='createdDate' onClick={sortFilter}>Created Date  <i className={`fas fa-sort-${sortCondition.inc && sortCondition.property === 'createdDate' ? 'up' : 'down'}`}></i></th>
                        <th name='dueDate' onClick={sortFilter}>Due Date  <i className={`fas fa-sort-${sortCondition.inc && sortCondition.property === 'dueDate' ? 'up' : 'down'}`}></i></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='h-25 overflow-auto'>
                    {
                        filteredTodos &&
                        filteredTodos.filter(todo => {
                            if (!searchKey) return true
                            return todo.summary.toLowerCase().includes(searchKey)

                        }
                        ).sort((a, b) => {
                            let { property, inc } = sortCondition
                            if (property) {
                                return inc ? (a[property] > b[property] ? 1 : -1) : (a[property] < b[property] ? 1 : -1)
                            }
                        }
                        ).map(todo => {
                            // let regex = `/${searchKey}/gi`
                            // console.log(regex)
                            // console.log(todo.summary.replace(regex, 'ooooo'))
                            // { 'vinod'.replace(searchKey, (c) => console.log(c)) }
                            return (


                                <tr key={todo.id} style={{ border: '1px solid black' }} className={`todo-item ${todo.completed ? 'bg-success' : ''}`} onClick={(e) => model(e, { ...todo, view: true })} >
                                    <td >{todo.summary}</td>
                                    <td >{todo.priority}</td>
                                    <td >{todo.createdDate}</td>
                                    <td >{todo.dueDate}</td>
                                    <td className='action'>
                                        <span onClick={(e) => status(e, todo)}>{todo.completed ? 'Open' : 'Done'}</span>
                                        <span onClick={(e) => model(e, todo)}><i className="far fa-edit"></i></span>
                                        <span onClick={(e) => { e.stopPropagation(); dispatch(deleteTodo(todo.id)) }}><i className="fas fa-trash"></i></span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


            <div className='plus' onClick={(e) => model(e, initialState)}>
                <i className="fas fa-plus-circle"></i>
            </div>

            {showModel && <Model todo={editTodo} onClose={close} />}

        </div >
    )
}



export default TodoList