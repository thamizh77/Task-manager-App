import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'

export default function EditTask() {
  const { id } = useParams()
  const { tasks, updateTask } = useTasks()
  const navigate = useNavigate()

  const [initial, setInitial] = useState(null)

  useEffect(() => {
    const t = tasks.find((x) => x.id === id)
    if (!t) {
      navigate('/')
      return
    }
    setInitial({
      title: t.title || '',
      description: t.description || '',
      priority: t.priority || '',
      status: t.status || 'todo',
      dueDate: t.dueDate ? t.dueDate.split('T')[0] : ''
    })
  }, [id, tasks])

  if (!initial) return <div>Loading...</div>

  const handleUpdate = (values) => {
    updateTask(id, values)
    navigate('/')
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm initialValues={initial} onSubmit={handleUpdate} submitLabel="Update" />
    </div>
  )
}
