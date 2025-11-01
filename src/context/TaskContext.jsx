import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

const TaskContext = createContext()
export const useTasks = () => useContext(TaskContext)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', [])

  const addTask = (task) => {
    const item = { ...task, id: uuidv4(), createdAt: Date.now() }
    setTasks((prev) => [item, ...prev])
  }

  const updateTask = (id, updated) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
