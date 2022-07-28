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
  const [filterOperator, setFilterOperator] = useState<StringFilter>()
  const [filterValue, setFilterValue] = useState<unknown>()

  const filterFn = column.columnDef.filterFn
  const isFiltered = column.getIsFiltered()

  // console.log('column', column)
  // console.log('filterFn', filterFn)

  const open = () => {
    const defaultValue = column.getFilterValue() as FilterState || {
      operator: StringFilter.Includes,
      value: ''
    }

    setFilterOperator(defaultValue.operator)
    setFilterValue(defaultValue.value)
  }
  const close = () => {
    setFilterOperator(undefined)
    setFilterValue(undefined)
    setOpened(false)
  }
  const valueChange = (value: unknown) => {
    setFilterValue(value)
  }
  const operatorChange = (operator: StringFilter) => {
    setFilterOperator(operator)
  }
  const clear = () => {
    column.setFilterValue(undefined)
    close()
  }
  const save = () => {
    const filter = {
      operator: filterOperator,
      value: filterValue
    }
    column.setFilterValue(filter)
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
            value={filterOperator || StringFilter.Includes}
            onChange={operatorChange}
          />

          <TextInput
            value={filterValue as string || ''}
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
