import { SegmentedControl } from '@mantine/core'

import { DataGridFilterFn, DataGridFilterProps } from '../../Datagrid.types'
import { DEFAULT_BOOLEAN_FILTER_OPTIONS } from '../../Datagrid.constants'

export enum BooleanFilter {
  Equals = 'eq',
}

export const booleanFilterFn: DataGridFilterFn<BooleanFilter, boolean> = (row, columnId, filter) => {
  const rowValue = Boolean(row.getValue(columnId))
  const op = filter.op || BooleanFilter.Equals
  const filterValue = Boolean(filter.value)
  switch (op) {
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

booleanFilterFn.filterComponent = function ({ filterState, onValueChange }: DataGridFilterProps<BooleanFilter, boolean>) {
  return (
    <SegmentedControl
      value={filterState.value ? 'true' : 'false'}
      onChange={(value: string) => onValueChange(value === 'true')}
      data={DEFAULT_BOOLEAN_FILTER_OPTIONS}
      fullWidth
      // styles={{
      //   active: {
      //     // fix visual bug when opening filter dropdown
      //     height: 'calc(100% - 8px) !important'
      //   }
      // }}
    />
  )
}
