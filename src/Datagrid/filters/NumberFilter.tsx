import { NumberInput, Select } from '@mantine/core'

import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'
import { getOperatorSelectData } from './utils'

type Filter = {
  operator: NumberFilter;
  value: number;
  meta?: number;
}

export enum NumberFilter {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
  IsBetween = 'btw',
}

export const numberFilterFn: DataGridFilterFn<any, Filter> = (row, columnId, filter) => {
  const rowValue = Number(row.getValue(columnId))
  const operator = filter.operator || NumberFilter.Equals
  const filterValue = Number(filter.value)
  const metaValue = Number(filter.meta)
  switch (operator) {
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
    case NumberFilter.IsBetween:
      return rowValue >= filterValue && rowValue <= metaValue
    default:
      return true
  }
}
numberFilterFn.autoRemove = (val) => !val
numberFilterFn.initialFilter = () => ({
  operator: NumberFilter.GreaterThan,
  value: 0,
  meta: undefined
})
numberFilterFn.filterComponent = function ({ filterState, onFilterChange }: DataGridFilterProps<Filter>) {
  const onOperatorChange = (operator: NumberFilter) => onFilterChange({ ...filterState, operator })
  const onValueChange = (value: number) => onFilterChange({ ...filterState, value: value || 0 })
  const onMetaChange = (value: number) => onFilterChange({ ...filterState, meta: value || 0 })
  return (
    <>
      <Select
        data={getOperatorSelectData(NumberFilter)}
        value={filterState.operator || NumberFilter.Equals}
        onChange={onOperatorChange}
      />

      <NumberInput
        value={filterState.value}
        onChange={onValueChange}
        placeholder={filterState.operator === NumberFilter.IsBetween ? 'Min Value' : 'Filter value'}
      />

      {
        filterState.operator === NumberFilter.IsBetween && (
          <NumberInput
            value={filterState.meta}
            onChange={onMetaChange}
            placeholder="Max value"
          />
        )
      }
    </>
  )
}
