import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <NavBar />
        <main style={{ padding: 20 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </main>
      </TaskProvider>
    </BrowserRouter>
  )
}
