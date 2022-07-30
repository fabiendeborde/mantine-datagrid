import { ChangeEvent } from 'react'
import { Select, TextInput } from '@mantine/core'

import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'
import { getOperatorSelectData } from './utils'

type Filter = {
  operator: StringFilter;
  value: string;
}

export enum StringFilter {
  Includes = 'in',
  DoesNotInclude = 'nin',
  Equals = 'eq',
  DoesNotEqual = 'neq',
  StartsWith = 'start',
  EndsWith = 'end',
}

export const stringFilterFn: DataGridFilterFn<any, Filter> = (row, columnId, filter) => {
  const rowValue = String(row.getValue(columnId)).toLowerCase()
  const operator = filter.operator || StringFilter.Includes
  const filterValue = String(filter.value).toLowerCase()
  switch (operator) {
    case StringFilter.Includes:
      return rowValue.includes(filterValue)
    case StringFilter.DoesNotInclude:
      return !rowValue.includes(filterValue)
    case StringFilter.Equals:
      return rowValue === filterValue
    case StringFilter.DoesNotEqual:
      return rowValue !== filterValue
    case StringFilter.StartsWith:
      return rowValue.startsWith(filterValue)
    case StringFilter.EndsWith:
      return rowValue.endsWith(filterValue)
    default:
      return true
  }
}
stringFilterFn.autoRemove = (val) => !val

stringFilterFn.initialFilter = () => ({
  operator: StringFilter.Includes,
  value: ''
})
stringFilterFn.filterComponent = function ({ filterState, onFilterChange }: DataGridFilterProps<Filter>) {
  const onOperatorChange = (operator: StringFilter) => onFilterChange({ ...filterState, operator })
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => onFilterChange({ ...filterState, value: e.target.value || '' })
  return (
    <>
      <Select
        data={getOperatorSelectData(StringFilter)}
        // data={Object.entries(StringFilter).map(
        //   ([label, value]) => ({
        //     value,
        //     label: formatOperatorLabel(label)
        //   })
        // )}
        value={filterState?.operator || StringFilter.Includes}
        onChange={onOperatorChange}
      />
      <TextInput
        value={filterState?.value || ''}
        onChange={onValueChange}
        placeholder="Filter value..."
      />
    </>
  )
}
