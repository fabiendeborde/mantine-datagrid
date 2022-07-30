import { SegmentedControl, useMantineTheme } from '@mantine/core'

import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'
import { DEFAULT_BOOLEAN_FILTER_OPTIONS } from '../Datagrid.constants'

type Filter = {
  operator: BooleanFilter;
  value: boolean;
}

export enum BooleanFilter {
  Equals = 'eq',
}

export const booleanFilterFn: DataGridFilterFn<any, Filter> = (row, columnId, filter) => {
  const rowValue = Boolean(row.getValue(columnId))
  const operator = filter.operator || BooleanFilter.Equals
  const filterValue = Boolean(filter.value)
  switch (operator) {
    case BooleanFilter.Equals:
      return rowValue === filterValue
    default:
      return true
  }
}
booleanFilterFn.autoRemove = (val) => !val

booleanFilterFn.initialFilter = () => ({
  operator: BooleanFilter.Equals,
  value: true
})

booleanFilterFn.filterComponent = function ({ filterState, onFilterChange }: DataGridFilterProps<Filter>) {
  const theme = useMantineTheme()
  const onValueChange = (value: string) => onFilterChange({ ...filterState, value: value === 'true' })

  return (
    <SegmentedControl
      value={filterState.value ? 'true' : 'false'}
      onChange={onValueChange}
      data={DEFAULT_BOOLEAN_FILTER_OPTIONS}
      fullWidth
      size="sm"
      radius="lg"
      transitionDuration={300}
      transitionTimingFunction="ease-in-out"
      color={theme.primaryColor}
    />
  )
}
