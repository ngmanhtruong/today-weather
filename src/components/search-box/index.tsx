import React from 'react'
import { SearchType, useSearch } from '../../hooks/useSearch'

type SearchBoxType = {
  value: SearchType
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: 'city' | 'country'
}

const SearchBox = (props : SearchBoxType) => {
  const { name = 'city', value, onChange } = props
  return (
    <div className={`search-box ${name}`}>
      <input
        type="text"
        name={name}
        value={value[name]}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default SearchBox