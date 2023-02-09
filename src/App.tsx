import './App.css'
import { useAtom } from 'jotai/react'
import { Todo, TodoPost } from './interfaces'
import TodoItem from './components/TodoItem'
import { todosAtom } from './state'
import { useEffect, useState } from 'react'
import { getTodosFn, postTodoFn } from './config/api'

function App() {
  const [todoName, setTodoName] = useState<string>('')
  const [todos, setTodos] = useAtom(todosAtom)

  useEffect(() => {
    getTodosFn().then((res) => setTodos(res.data))
  }, [])

  const handleAddTodo = () => {
    const data: TodoPost = {
      todoName,
      isComplete: false
    }

    postTodoFn(data).then((res) => {
      const { code, data: newData } = res
      if (code === 200) {
        setTodos((prevData) => {
          return [
            ...prevData,
            newData
          ]
        })
        setTodoName('')
      } else {
        console.log(res?.message)
      }
    })
  }

  return (
    <div className="App">
      <h2>TODO APP</h2>
      <div>
        <p>
          <input type='text' placeholder='Todo Name' onChange={(e) => setTodoName(e.target.value)} />
          <button onClick={handleAddTodo}>Add Todo</button>
        </p>
      </div>
      <div className='container'>
        {todos && todos.map(({ _id, todoName, isComplete }: Todo, i: number) => (
          <div key={i}>
            <TodoItem
              _id={_id}
              todoName={todoName}
              isComplete={isComplete}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
