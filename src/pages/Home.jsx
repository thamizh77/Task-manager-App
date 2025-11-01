import React, { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskTable from '../components/TaskTable'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const { tasks, deleteTask } = useTasks()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '', priority: '' })

  const onDelete = (id) => {
    if (confirm('Delete this task?')) deleteTask(id)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Tasks</h1>
      <div style={{ marginBottom: 12 }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
          <option value="">All status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select value={filters.priority} onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}>
          <option value="">All priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <TaskTable tasks={tasks} onDelete={onDelete} search={search} filters={filters} pageSize={5} />
    </div>
  )
}
