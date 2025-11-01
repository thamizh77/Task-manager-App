import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useForm from '../hooks/useForm';

const Form = () => {
  const { formVal, setFormVal } = useForm();
  const [addData, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVal({
      ...formVal,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...addData, formVal]);
    setFormVal({
      title: "",
      description: "",
      priority: "High",
      dueDate: "",
    });
  };

  return (
    <div className='p-6 mx-auto max-w-2xl'>
      <h1 className='text-2xl font-semibold mb-4 text-red-500'>All Task</h1>

      <form className='border rounded-lg px-4 py-6 bg-pink-200' onSubmit={handleSubmit}>
        <section className='mt-3'>
          <div>
            <p className='mb-3'>Title</p>
            <input
              className='w-full p-2 border rounded mb-2'
              type="text"
              name="title"
              value={formVal.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <p className='mb-3'>Description</p>
            <textarea
              className='w-full p-2 border rounded mb-2'
              name="description"
              value={formVal.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <p className='mb-3'>Priority</p>
            <select
              name="priority"
              className='w-full p-2 border rounded mb-3'
              value={formVal.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Middle">Middle</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <p className='mb-4'>Due Date</p>
            <input
              className='mb-6'
              type="date"
              name="dueDate"
              value={formVal.dueDate}
              onChange={handleChange}
            />
          </div>
        </section>

        <button className='bg-teal-950 text-white px-4 py-2 rounded-md' type='submit'>
          Submit
        </button>
      </form>

      <table className='w-full border mt-10 '>
        <thead>
          <tr className='bg-violet-400'>
            <th className='border p-2'>Title</th>
            <th className='border p-2'>Description</th>
            <th className='border p-2'>Priority</th>
            <th className='border p-2'>Date</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addData.map((data, idx) => (
            <tr key={idx}>
              <td className='border border-gray-300 px-4 py-2'>{data.title}</td>
              <td className='border border-gray-300 px-4 py-2'>{data.description}</td>
              <td className='border border-gray-300 px-4 py-2'>{data.priority}</td>
              <td className='border border-gray-300 px-4 py-2'>{data.dueDate}</td>
              <td>
                <button
                  onClick={() => {

                    setFormVal(addData[idx]);

                    const updated = addData.filter((_, i) => i !== idx);
                    setData(updated);
                  }}
                  className='bg-blue-500 text-white px-4 py-2 rounded gap'
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    const updated = addData.filter((_, i) => i !== idx);
                    setData(updated);
                  }}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <br /><br /><br />




<Link to="/">
  <button className='bg-teal-950 text-white px-4 py-2 rounded-md'>
    Back to Home
  </button>
</Link>

    </div>
  );
};

export default Form;


