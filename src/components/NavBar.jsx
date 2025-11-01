import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="bg-blue-200 text-pink-500 px-6 py-3 flex items-center justify-between shadow">
      <h1 className="font-bold text-lg">Task Manager</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/create" className="hover:underline">Create Task</Link>
      </div>
    </nav>
  )
}
