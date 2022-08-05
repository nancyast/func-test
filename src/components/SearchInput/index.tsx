import { Input } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'

const { Search } = Input

interface SearchInput {
  onSearch: (value: string) => void
  onClear: () => void
}

const SearchInput = ({ onSearch, onClear }: SearchInput) => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  useEffect(() => {
    const waitingForTypingDone = setTimeout(() => {
      if (value.length >= 3) {
        onSearch(value)
      } else if (value.length === 0) {
        onClear()
      }
    }, 500)

    return () => clearTimeout(waitingForTypingDone)
  }, [value])

  return <Search value={value} onChange={handleChange} />
}

export default SearchInput
