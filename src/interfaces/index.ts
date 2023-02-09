export type Todo = {
  _id: string,
  todoName: string,
  isComplete: boolean
}

export type TodoPost = {
  todoName: string,
  isComplete: boolean
}

export type TodoUpdate = {
  isComplete: boolean
}