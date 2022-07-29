import { useState } from 'react'
import {
  Button,
  Group,
  Menu,
  Stack,
  useMantineTheme
} from '@mantine/core'
import { Column, ColumnFilter } from '@tanstack/react-table'
import { Filter as FilterIcon } from 'tabler-icons-react'

import { FilterState } from '../Datagrid.types'
import { isDataGridFilter } from '../filters/utils'

type Props<T> = {
  column: Column<T, unknown>;
}

export function ColumnFilter<T> ({ column }: Props<T>) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [filterState, setFilterState] = useState<FilterState<unknown, unknown>>({ operator: undefined, value: undefined })
  const isFiltered = column.getIsFiltered()

  const filterFn = column.columnDef.filterFn

  if (!isDataGridFilter(filterFn)) {
    if (filterFn !== 'auto') {
      console.warn(`Built-in filters are not supported by this library. \nYou must provide a filter function that implements 'DataGridFilterFn' type.\n (Received '${filterFn}' on column ${column.id})`)
    }
    return null
  }
  const { filterComponent: FilterComponent, initialFilter } = filterFn

  // console.log('column', column)

  const open = () => {
    const defaultValue = column.getFilterValue() as FilterState<unknown, unknown> || initialFilter()

    setFilterState(defaultValue)
  }
  const close = () => {
    setFilterState({ operator: undefined, value: undefined })
    setOpened(false)
  }
  const onValueChange = (value: unknown) => {
    setFilterState(current => {
      return {
        ...current,
        value
      }
    })
  }
  const onOperatorChange = (operator: unknown) => {
    setFilterState(current => {
      return {
        ...current,
        operator
      }
    })
  }
  const clear = () => {
    column.setFilterValue(undefined)
    close()
  }
  const save = () => {
    column.setFilterValue(filterState)
    close()
  }

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <Button
          variant={isFiltered ? 'light' : 'subtle'}
          color={isFiltered ? theme.primaryColor : 'gray'}
          compact
          size="xs"
          px={2}
          onClick={open}
        >
          <FilterIcon size={16} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack py="sm" px="xs">
          <FilterComponent
            filterState={filterState}
            onValueChange={onValueChange}
            onOperatorChange={onOperatorChange}
          />
          <Group position="apart">
            <Button size="xs" variant='subtle' color="gray" onClick={clear}>Clear</Button>
            <Button size="xs" onClick={save} leftIcon={<FilterIcon size={16} />}>Filter</Button>
          </Group>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  )
}
