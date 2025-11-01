import React from 'react'

export default function Pagination({ total, pageSize, currentPage, onPageChange }) {
 const pages = Math.max(0, Math.ceil(total / pageSize))
  const arr = Array.from({ length: pages }, (_, i) => i + 1)

  return (
    <div style={{ marginTop: 12 }}>
      {arr.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{ marginRight: 6, fontWeight: p === currentPage ? 'bold' : 'normal' }}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
