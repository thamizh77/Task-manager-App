import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'

export default function CreateTask() {
  const { addTask } = useTasks()
  const navigate = useNavigate()

  const initial = {
    title: '',
    description: '',
    priority: '',
    status: 'todo',
    dueDate: ''
  }

  const handleCreate = (values) => {
    addTask(values)
    navigate('/')
  }

  return (
    <div>
      <h1>Create Task</h1>
      <TaskForm initialValues={initial} onSubmit={handleCreate} submitLabel="Create" />
    </div>
  )
}
