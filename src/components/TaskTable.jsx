import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'

function sortItems(items, sortBy, sortOrder) {
  if (!sortBy) return items
  return [...items].sort((a, b) => {
    const va = a[sortBy]
    const vb = b[sortBy]
    if (va == null) return 1
    if (vb == null) return -1
    if (typeof va === 'string') {
      return sortOrder === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    }
    return sortOrder === 'asc' ? va - vb : vb - va
  })
}

export default function TaskTable({ tasks = [], onDelete, pageSize = 5, search = '', filters = {} }) {
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    let res = tasks
    if (search && search.trim()) {
      const q = search.toLowerCase()
      res = res.filter((t) => (t.title || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q))
    }
    if (filters.status) res = res.filter((t) => t.status === filters.status)
    if (filters.priority) res = res.filter((t) => t.priority === filters.priority)
    return res
  }, [tasks, search, filters])

  const sorted = useMemo(() => sortItems(filtered, sortBy, sortOrder), [filtered, sortBy, sortOrder])

  const total = sorted.length
  const start = (currentPage - 1) * pageSize
  const pageItems = sorted.slice(start, start + pageSize)

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(col)
      setSortOrder('asc')
    }
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('title')}>Title</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('status')}>Status</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('priority')}>Priority</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort('dueDate')}>Due</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((t) => (
            <tr key={t.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">
                <Link to={`/edit/${t.id}`} className="text-blue-600 hover:underline">{t.title}</Link>
              </td>
              <td className="px-4 py-2 capitalize">{t.status}</td>
              <td className="px-4 py-2 capitalize">{t.priority}</td>
              <td className="px-4 py-2">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</td>
              <td className="px-4 py-2 space-x-2">
                <Link to={`/edit/${t.id}`} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Edit</Link>
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination total={total} pageSize={pageSize} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
