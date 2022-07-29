import { Select, TextInput } from '@mantine/core'

import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'

export enum StringFilter {
  Includes = 'in',
  DoesNotInclude = 'nin',
  Equals = 'eq',
  DoesNotEqual = 'neq',
  StartsWith = 'start',
  EndsWith = 'end',
}

export const stringFilterFn: DataGridFilterFn<StringFilter, string> = (row, columnId, filter) => {
  const rowValue = String(row.getValue(columnId)).toLowerCase()
  const operator = filter.op || StringFilter.Includes
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
stringFilterFn.filterComponent = function ({ filterState, onValueChange, onOperatorChange }: DataGridFilterProps<StringFilter, string>) {
  return (
    <>
      <Select
        data={Object.entries(StringFilter).map(
          ([label, value]) => ({
            value,
            label: label.replace(/([a-z]+)([A-Z]{1})/g, '$1 $2')
          })
        )}
        value={filterState?.operator || StringFilter.Includes}
        onChange={onOperatorChange}
      />
      <TextInput
        value={filterState?.value || ''}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Filter value..."
      />
    </>
  )
}
