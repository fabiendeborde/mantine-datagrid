import { FilterFn } from '@tanstack/react-table'

export const hasFilter = (filterFn: unknown) => {
  return filterFn === 'includesString'
}

export enum StringFilter {
  Includes = 'in',
  DoesNotInclude = 'nin',
  Equals = 'eq',
  DoesNotEqual = 'neq',
  StartsWith = 'start',
  EndsWith = 'end',
}

export const stringFilterFn: FilterFn<unknown> = (row, columnId, filter) => {
  const rowValue = String(row.getValue(columnId)).toLowerCase()
  const op = filter.op || StringFilter.Includes
  const filterValue = String(filter.value).toLowerCase()
  switch (op) {
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
