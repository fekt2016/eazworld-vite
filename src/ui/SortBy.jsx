/* eslint react/prop-types: 0*/

import { useSearchParams } from 'react-router-dom'
import SelectSort from './SelectSort'

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get('sortBy') || ''

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <SelectSort
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  )
}

export default SortBy
