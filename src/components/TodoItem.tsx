import { useSetAtom } from 'jotai'
import { useRef } from 'react'
import { deleteTodoFn, updateTodoFn } from '../config/api'
import { Todo, TodoUpdate } from '../interfaces'
import { todosAtom } from '../state'

const TodoItem = ({ _id, todoName, isComplete }: Todo) => {
  const setTodo = useSetAtom(todosAtom)

  const deleteTodo = (id: string) => {
    deleteTodoFn(id).then((res) => {
      const { code } = res
      if (code === 200) {
        setTodo((prev) => {
          return prev.filter((i) => i?._id !== id)
        })
      } else {
        console.log(res?.message)
      }
    })
  }

  const updateTodo = (id: string, valueComplete: boolean) => {
    const data: TodoUpdate = {
      isComplete: !valueComplete
    }

    updateTodoFn(id, data).then((res) => {
      const { code, data: newData } = res
      if (code === 200) {
        setTodo((prevData) => prevData.map((t) => t._id === newData?._id ? newData : t))
      } else {
        console.log(res?.message)

      }
    })
  }

  return (
    <div>
      <p className='contents'>
        <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>{todoName}</span>
        <span>
          <input type='checkbox' checked={isComplete ?? false} onChange={() => updateTodo(_id, isComplete)} />
          <i className="fa-solid fa-trash" onClick={() => deleteTodo(_id)}></i>
        </span>
      </p>
    </div>
  )
}

export default TodoItem
