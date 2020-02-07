import React from 'react'
import { Provider } from 'react-redux'


import '../App.css'
// Import from redux
import store from '../redux/store'

//Import Components
import TodoList from './TodoList'


const App = () => {
  return (
    <Provider store={store}>
      <div className='container app-container'>
        <TodoList />
      </div>
    </Provider>
  )
}

export default App
