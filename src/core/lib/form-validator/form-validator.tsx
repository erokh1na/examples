import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"

export const useFormValidator = ({ initialData, initialError, validationRules }) => {
  const [data, setData] = useState(initialData)
  const [error, setError] = useState(initialError)

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    if (error[e.target.name]) {
      setError((prev) => ({
        ...prev,
        [e.target.name]: "",
      }))
    }
  }

  const validate = ({ data, field, validationRules }) => {
    const config = {
      required: (data: string, field: string) => (data.trim().length === 0 ? `${field} is required` : ""),

      min: (data: string, min: number) => (data.trim().length < min ? `minimum ${min} symbols` : ""),

      email: (data: string) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data) ? "check the email format" : ""),
    }

    const rules = validationRules[field]
    let errorMessage = ""

    if (rules.required) {
      errorMessage = config.required(data[field], field)
    }

    if (!errorMessage && rules.min) {
      errorMessage = config.min(data[field], rules.min)
    }

    if (!errorMessage && rules.email) {
      errorMessage = config.email(data[field])
    }

    return errorMessage
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()

    let isValid = true

    for (const field in data) {
      const errorMessage = validate({
        data,
        field,
        validationRules,
      })

      if (errorMessage) {
        isValid = false

        setError((prev) => ({
          ...prev,
          [field]: errorMessage,
        }))
      }
    }

    return isValid ? data : null
  }

  const reset = () => {
    setData(initialData)
    setError(initialError)
  }

  return {
    data,
    error,
    change,
    submit,
    reset,
  }
}
