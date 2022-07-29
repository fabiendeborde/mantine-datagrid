import { NumberInput, Select } from '@mantine/core'
import { Filter } from 'tabler-icons-react'

import { DataGridFilterFn, DataGridFilterProps } from '../../Datagrid.types'

export enum NumberFilter {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
}

export const numberFilterFn: DataGridFilterFn<NumberFilter, number> = (row, columnId, filter) => {
  const rowValue = Number(row.getValue(columnId))
  const op = filter.op || NumberFilter.Equals
  const filterValue = Number(filter.value)
  switch (op) {
    case NumberFilter.Equals:
      return rowValue === filterValue
    case NumberFilter.NotEquals:
      return rowValue !== filterValue
    case NumberFilter.GreaterThan:
      return rowValue > filterValue
    case NumberFilter.GreaterThanOrEquals:
      return rowValue >= filterValue
    case NumberFilter.LowerThan:
      return rowValue < filterValue
    case NumberFilter.LowerThanOrEquals:
      return rowValue <= filterValue
    default:
      return true
  }
}
numberFilterFn.autoRemove = (val) => !val
numberFilterFn.initialFilter = () => ({
  operator: NumberFilter.GreaterThan,
  value: 0
})
numberFilterFn.filterComponent = function ({ filterState, onValueChange, onOperatorChange }: DataGridFilterProps<NumberFilter, number>) {
  return (
    <>
      <Select
        data={Object.entries(NumberFilter).map(([label, value]) => ({
          value,
          label
        }))}
        value={filterState.operator || NumberFilter.Equals}
        onChange={onOperatorChange}
      />

      <NumberInput
        value={filterState.value}
        onChange={(e) => onValueChange(e || 0)}
        placeholder="Filter value"
        rightSection={<Filter />}
      />
    </>
  )
}
