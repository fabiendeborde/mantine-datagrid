import { Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { Filter } from 'tabler-icons-react'

import { DataGridFilterFn, DataGridFilterProps } from '../../Datagrid.types'

export enum DateFilter {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
}

export const dateFilterFn: DataGridFilterFn<DateFilter, string> = (row, columnId, filter) => {
  const rowValue = new Date(row.getValue(columnId))
  const op = filter.op || DateFilter.Equals
  const filterValue = new Date(filter.value)
  switch (op) {
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

dateFilterFn.filterComponent = function ({ filterState, onValueChange, onOperatorChange }: DataGridFilterProps<DateFilter, string>) {
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
        onChange={(e) => onValueChange(e?.toISOString() || '')}
        placeholder="Filter value"
        rightSection={<Filter />}
      />
    </>
  )
}
