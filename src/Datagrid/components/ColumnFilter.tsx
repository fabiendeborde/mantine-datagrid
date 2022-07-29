import { useState } from 'react'
import {
  Button,
  Group,
  Menu,
  Select,
  Stack,
  TextInput,
  useMantineTheme
} from '@mantine/core'
import { Column, ColumnFilter } from '@tanstack/react-table'
import { Filter as FilterIcon } from 'tabler-icons-react'
import { StringFilter } from './Filters/utils'

type Props<T> = {
  column: Column<T, unknown>;
}

type FilterState = {
  operator: StringFilter;
  value: unknown;
}

export function ColumnFilter<T> ({ column }: Props<T>) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [filterState, setFilterState] = useState<FilterState>()
  const isFiltered = column.getIsFiltered()

  const filterFn = column.columnDef.filterFn

  // if (!isDataGridFilter(filterFn)) return null;

  // const { element: Element, init } = filterFn;

  // console.log('column', column)
  // console.log('filterFn', filterFn)

  const open = () => {
    const defaultValue = column.getFilterValue() as FilterState || {
      operator: StringFilter.Includes,
      value: ''
    }

    setFilterState(defaultValue)
  }
  const close = () => {
    setFilterState(undefined)
    setOpened(false)
  }
  const valueChange = (value: unknown) => {
    setFilterState(current => {
      if (current) {
        return {
          ...current,
          value
        }
      }
    })
  }
  const operatorChange = (operator: StringFilter) => {
    setFilterState(current => {
      if (current) {
        return {
          ...current,
          operator
        }
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
          <Select
            data={Object.entries(StringFilter).map(
              ([label, value]) => ({
                value,
                label: label.replace(/([a-z]+)([A-Z]{1})/g, '$1 $2')
              })
            )}
            value={filterState?.operator || StringFilter.Includes}
            onChange={operatorChange}
          />

          <TextInput
            value={filterState?.value as string || ''}
            onChange={(e) => valueChange(e.target.value)}
            placeholder="Filter value..."
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
