import { FilterFn } from '@tanstack/react-table'

export const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div')
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

export const hasFilter = (filterFn: any) => {
  return filterFn === 'stringFilterFn'
}

export enum StringFilter {
  Includes = 'in',
  DoesNotInclude = 'nin',
  Equals = 'eq',
  DoesNotEqual = 'neq',
  StartsWith = 'start',
  EndsWith = 'end',
}

export const stringFilterFn: FilterFn<any> = (row, columnId, filter) => {
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
