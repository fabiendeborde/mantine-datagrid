import { useState } from 'react'
import {
  Button,
  CloseButton,
  Divider,
  Group,
  Menu,
  Stack,
  useMantineTheme
} from '@mantine/core'
import { Column, ColumnFilter } from '@tanstack/react-table'
import { Filter as FilterIcon } from 'tabler-icons-react'

import { DataGridFilterFn, FilterState } from '../Datagrid.types'
import { isDataGridFilter } from '../filters/utils'

type Props<T> = {
  column: Column<T, unknown>;
}

export function ColumnFilter<T> ({ column }: Props<T>) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [filterState, setFilterState] = useState<FilterState>({ operator: undefined, value: undefined, meta: undefined })
  const isFiltered = column.getIsFiltered()

  const filterFn = column.columnDef.filterFn

  if (!isDataGridFilter(filterFn)) {
    if (filterFn !== 'auto') {
      console.warn(`Built-in filters are not supported by this library. \nYou must provide a filter function that implements 'DataGridFilterFn' type (or use one of the following default filters: 'stringFilterFn', 'numberFilterFn', 'booleanFilterFn', 'dateFilterFn').\n (Received '${filterFn}' on column ${column.id})`)
    }
    return null
  }
  const { filterComponent: FilterComponent, initialFilter } = filterFn as DataGridFilterFn<T, unknown>

  // console.log('column', column)

  const onOpen = () => {
    const defaultValue = column.getFilterValue() as FilterState || initialFilter()

    setFilterState(defaultValue)
  }
  const onClose = () => {
    setFilterState({ operator: undefined, value: undefined })
    setOpened(false)
  }
  const onFilterChange = (value: FilterState) => {
    setFilterState(value)
  }
  const clear = () => {
    column.setFilterValue(undefined)
    onClose()
  }
  const onSave = () => {
    column.setFilterValue(filterState)
    onClose()
  }

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      closeOnClickOutside={false}
      withinPortal
      zIndex={1000}
    >
      <Menu.Target>
        <Button
          variant={isFiltered ? 'light' : 'subtle'}
          color={isFiltered ? theme.primaryColor : 'gray'}
          compact
          size="xs"
          px={2}
          onClick={onOpen}
        >
          <FilterIcon size={16} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Group position='right'>
          <CloseButton aria-label="Close menu" onClick={() => setOpened(false)} />
        </Group>
        <Stack py="sm" px="xs">
          <FilterComponent
            filterState={filterState}
            onFilterChange={onFilterChange}
          />
          <Divider size="xs" />
          <Group position="apart">
            <Button size="xs" variant='subtle' color="gray" onClick={clear}>Clear</Button>
            <Button size="xs" onClick={onSave} leftIcon={<FilterIcon size={16} />}>Filter</Button>
          </Group>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  )
}
