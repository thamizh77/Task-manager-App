import React from 'react'
import { useForm } from '../hooks/useForm'

const defaultValidate = (values) => {
  const errs = {}
  if (!values.title || values.title.trim().length < 3) errs.title = 'Title is required (min 3 chars)'
  if (!values.priority) errs.priority = 'Priority is required'
  if (values.dueDate) {
    const due = new Date(values.dueDate)
    const now = new Date()
    if (isNaN(due.getTime())) errs.dueDate = 'Invalid date'
    else if (due < new Date(now.toDateString())) errs.dueDate = 'Due date must be today or later'
  }
  return errs
}

export default function TaskForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
  const { values, errors, handleChange, handleSubmit, reset } = useForm(initialValues, defaultValidate)

  React.useEffect(() => reset(initialValues), [initialValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6 space-y-4 max-w-xl">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Priority</label>
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          >
            <option value="">--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Due</label>
          <input
            type="date"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {submitLabel}
      </button>
    </form>
  )
}
