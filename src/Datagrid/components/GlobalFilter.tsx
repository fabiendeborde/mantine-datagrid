import { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react'

type Props = {
  withGlobalFilter: boolean;
  globalFilter: string;
  onGlobalFilterChange(value: string): void;
}

export function GlobalFilter ({ withGlobalFilter, globalFilter, onGlobalFilterChange }: Props) {
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

  if (!withGlobalFilter) return null

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      rightSection={<Search />}
      mt="md"
      mb={0}
    />
  )
}
