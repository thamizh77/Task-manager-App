import { useState } from 'react'

export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setValues((v) => ({ ...v, [name]: val }))
  }

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault()
    const validation = validate ? validate(values) : {}
    setErrors(validation)
    if (Object.keys(validation).length === 0) {
      onSubmit(values)
    }
  }

  const reset = (next = initialValues) => {
    setValues(next)
    setErrors({})
  }

  return { values, setValues, errors, setErrors, handleChange, handleSubmit, reset }
}
