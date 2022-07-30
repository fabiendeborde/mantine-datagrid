import { Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'

type Filter = {
  operator: DateFilter;
  value: string;
}

export enum DateFilter {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
}

export const dateFilterFn: DataGridFilterFn<any, Filter> = (row, columnId, filter) => {
  const rowValue = new Date(row.getValue(columnId))
  const operator = filter.operator || DateFilter.Equals
  const filterValue = new Date(filter.value)
  switch (operator) {
    case DateFilter.Equals:
      return rowValue === filterValue
    case DateFilter.NotEquals:
      return rowValue !== filterValue
    case DateFilter.GreaterThan:
      return rowValue > filterValue
    case DateFilter.GreaterThanOrEquals:
      return rowValue >= filterValue
    case DateFilter.LowerThan:
      return rowValue < filterValue
    case DateFilter.LowerThanOrEquals:
      return rowValue <= filterValue
    default:
      return true
  }
}
dateFilterFn.autoRemove = (val) => !val

dateFilterFn.initialFilter = () => ({
  operator: DateFilter.GreaterThan,
  value: ''
})

dateFilterFn.filterComponent = function ({ filterState, onFilterChange }: DataGridFilterProps<Filter>) {
  const onOperatorChange = (operator: DateFilter) => onFilterChange({ ...filterState, operator })
  const onValueChange = (value: Date) => onFilterChange({ ...filterState, value: value?.toISOString() || '' })
  return (
    <>
      <Select
        data={Object.entries(DateFilter).map(([label, value]) => ({
          value,
          label
        }))}
        value={filterState.operator || DateFilter.Equals}
        onChange={onOperatorChange}
      />

      <DatePicker
        value={filterState.value ? new Date(filterState.value) : null}
        onChange={onValueChange}
        placeholder="Filter value"
        rightSection={<FilterIcon />}
      />
    </>
  )
}
