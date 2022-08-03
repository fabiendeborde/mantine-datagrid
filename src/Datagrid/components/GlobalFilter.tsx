import { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import PropTypes from 'prop-types'

type Props = {
  globalFilter: string;
  onGlobalFilterChange(value: string): void;
}

export default function GlobalFilter ({ globalFilter, onGlobalFilterChange }: Props) {
  const [value, setValue] = useState(globalFilter)

  useEffect(() => {
    setValue(globalFilter)
  }, [globalFilter])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onGlobalFilterChange(value)
    }, 300)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      rightSection={<Search />}
      my="md"
    />
  )
}

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string.isRequired,
  onGlobalFilterChange: PropTypes.func.isRequired
}
