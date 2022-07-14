import { useState } from 'react'
import {
  Button,
  Group,
  Menu,
  Select,
  Stack,
  TextInput
} from '@mantine/core'
import { Column } from '@tanstack/react-table'
import { Filter as FilterIcon } from 'tabler-icons-react'
import { useDisclosure } from '@mantine/hooks'

type Props<T> = {
  column: Column<DataTableGenerics<T>>;
}

type FilterState = {
  op: StringFilter;
  value: string;
}

export function ColumnFilter<T> ({ column }: Props<T>) {
  const [opened, handlers] = useDisclosure(false)
  const [filterValue, setFilterValue] = useState<FilterState>()

  const open = () => {
    const defaultValue = column.getFilterValue() || {
      op: StringFilter.Includes,
      value: ''
    }

    setFilterValue(defaultValue as FilterState)
  }

  const close = () => {
    setFilterValue(undefined)
    handlers.close()
  }

  const valueChange = (value: any) => {
    setFilterValue(current => {
      if (current) {
        return {
          ...current,
          value
        }
      }
    })
  }
  const operatorChange = (op: any) => {
    setFilterValue(current => {
      if (current) {
        return {
          ...current,
          op
        }
      }
    })
  }

  const clear = () => {
    column.setFilterValue(undefined)
    close()
  }
  const save = () => {
    if (filterValue?.value) column.setFilterValue(filterValue)
    close()
  }

  const isFiltered = column.getIsFiltered()

  return (
    <Menu
      opened={opened}
      onOpen={handlers.open}
      onClose={handlers.close}
      size={250}
      control={
        <Button
          variant={isFiltered ? 'gradient' : 'subtle'}
          compact
          size="xs"
          px={2}
          color="gray"
          gradient={
              isFiltered ? { from: 'teal', to: 'lime' } : undefined
          }
          onClick={open}
        >
          <FilterIcon size={16} />
        </Button>
      }
    >
    <Stack py="sm" px="xs">
      <Select
        data={Object.entries(StringFilter).map(
          ([label, value]) => ({
            value,
            label: label.replace(/([a-z]+)([A-Z]{1})/g, '$1 $2')
          })
        )}
        value={filterValue?.op || StringFilter.Includes}
        onChange={operatorChange}
      />

      <TextInput
        value={filterValue?.value || ''}
        onChange={(e) => valueChange(e.target.value)}
        placeholder="Filter value"
        rightSection={<FilterIcon color="gray" size={16} />}
      />

      <Group position="apart">
        <Button size="xs" variant='subtle' color="gray" onClick={clear}>Clear</Button>
        <Button size="xs" onClick={save}>Apply</Button>
      </Group>
      </Stack>
    </Menu>
  )
}
