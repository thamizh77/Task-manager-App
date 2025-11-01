import React from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search your task' }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: 8, width: '100%', boxSizing: 'border-box' }}
    />
  )
}
