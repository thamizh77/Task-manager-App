import React from 'react'

const Table = ({ handleChange }) => {

  
  return (
    <div>
      
    <table className='w-full border mt-10 '>
      <thead>
        <tr className='bg-gray-200'>
          <th className='border p-2'>Title</th>
          <th className='border p-2'>Description</th>
          <th className='border p-2'>Priority</th>
          <th className='border p-2'>Date</th>
          <th className='border p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {handleChange.map((formVal,idx) => {
          return (
            <tr key={idx}>
              <td>{formVal.title }</td>
              <td>{formVal.description}</td>
              <td>{formVal.priority}</td>
              <td>{formVal.date}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    
    
<br /><br /><br />
    <a href="/form">
            <button className='bg-gray-400 text-white px-4 py-2 rounded-md' type='submit'>Back to Home</button>
            </a>
    </div>
    
  )
}

export default Table;





