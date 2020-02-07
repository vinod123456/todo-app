import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addTodo, editTodo } from '../redux'



const Model = (props) => {

    const dispatch = useDispatch()

    const [todo, setTodo] = useState(props.todo)



    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (props.todo.id) {
            await dispatch(editTodo(todo))
        } else {
            await dispatch(addTodo(todo))
        }

        setTodo(props.todo)
        props.onClose()
    }

    const onClose = () => {

        props.onClose()
    }


    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            onClose()
        }
    };


    const priorities = ['None', 'High', 'Medium',]


    return (
        <div className='model-container'>
            {todo.view ?
                <div className='model-content w-50 h-50 p-3  bg-light '>
                    <div className='my-3'><strong>Summary :</strong>{todo.summary}</div>
                    <div className='my-3'><strong>Description :</strong>{todo.description}</div>
                    <div className='my-3'><strong>Created Date :</strong>{todo.createdDate}</div>
                    <div className='my-3'><strong>Due Date :</strong>{todo.dueDate}</div>
                    <div className='my-3'><strong>Priority :</strong>{todo.priority}</div>
                    <div className='my-3'><strong>Status :</strong>{todo.completed ? 'Completed' : 'Pending'}</div>

                    <div className='float-right'>
                        <button onClick={onClose} className='btn btn-danger'>Close</button>
                    </div>
                </div>
                :

                <div className='model-content w-75 h-50  bg-light '>
                    <form onSubmit={handleSubmit} className=''>
                        <div className='form-group row'>
                            <label className="col-sm-2 col-form-label font-weight-bold" >Summary</label>
                            <div className="col-sm-8">
                                <input className='form-control' id='summary' value={todo.summary} type='text' onChange={handleChange} name='summary' />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label className='col-sm-2 col-form-label font-weight-bold' >Description</label>
                            <div className='col-sm-8'>
                                <textarea className="form-control " id='description' rows="2" name='description' value={todo.description} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='form-group row col-sm-6'>
                                <label className='col-sm-4 col-form-label font-weight-bold'>Due Date</label>
                                <div className='col-sm-6'>
                                    <input className='form-control' type='Date' id='date' value={todo.dueDate} onChange={handleChange} name='dueDate' />
                                </div>
                            </div>
                            <div className='form-group row col-sm-4'>
                                <label className='col-sm-4 col-form-label font-weight-bold'>Priority</label>
                                <div className='col-sm-6 '>
                                    <select className='custom-select' name='priority' value={todo.priority} onChange={handleChange}>
                                        {priorities.map(priority => <option value={priority}>{priority}</option>)}
                                        {/* <option>High</option> */}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='float-right'>
                            <button type='submit' className='btn btn-success'>Save</button>
                            <button onClick={onClose} className='btn btn-danger'>Cancel</button>
                        </div>
                    </form>


                </div>
            }




        </div>
    )
}

export default Model
