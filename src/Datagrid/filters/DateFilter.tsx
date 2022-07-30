import { Select } from '@mantine/core'
import { DatePicker, DateRangePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'

import useStyles from '../Datagrid.styles'
import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'
import { getOperatorSelectData } from './utils'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

type Filter = {
  operator: DateFilter;
  value: string;
  meta?: string;
}

export enum DateFilter {
  Equals = 'eq',
  NotEquals = 'neq',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'gte',
  LowerThan = 'lt',
  LowerThanOrEquals = 'lte',
  IsBetween = 'btw',
}

export const dateFilterFn: DataGridFilterFn<any, Filter> = (row, columnId, filter) => {
  const rowValue = dayjs(row.getValue(columnId))
  const operator = filter.operator || DateFilter.Equals
  const filterValue = dayjs(filter.value)
  const metaValue = dayjs(filter.meta)
  switch (operator) {
    case DateFilter.Equals:
      return rowValue.isSame(filterValue)
    case DateFilter.NotEquals:
      return !rowValue.isSame(filterValue)
    case DateFilter.GreaterThan:
      return rowValue.isAfter(filterValue)
    case DateFilter.GreaterThanOrEquals:
      return rowValue.isSameOrAfter(filterValue)
    case DateFilter.LowerThan:
      return rowValue.isBefore(filterValue)
    case DateFilter.LowerThanOrEquals:
      return rowValue.isSameOrBefore(filterValue)
    case DateFilter.IsBetween:
      return rowValue.isBetween(filterValue, metaValue, null, '[]')
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
  const { classes } = useStyles({},
    {
      name: 'datagrid-filter-input'
    })
  const onOperatorChange = (operator: DateFilter) => onFilterChange({ ...filterState, operator })
  const onValueChange = (value: Date) => onFilterChange({ ...filterState, value: value?.toISOString() || '' })
  const onRangeChange = ([start, end]: [Date|null, Date|null]) => {
    return onFilterChange({
      ...filterState,
      value: start?.toISOString() || '',
      meta: end?.toISOString() || ''
    })
  }

  return (
    <>
      <Select
        data={getOperatorSelectData(DateFilter)}
        value={filterState.operator || DateFilter.Equals}
        onChange={onOperatorChange}
      />

      {
        filterState.operator === DateFilter.IsBetween
          ? (
            <DateRangePicker
              value={[
                filterState.value ? new Date(filterState.value) : null,
                filterState.meta ? new Date(filterState.meta) : null
              ]}
              onChange={onRangeChange}
              placeholder="Filter value"
              allowLevelChange
              zIndex={9999}
              classNames={{ input: classes.filterMenuInput }}
            />
          )
          : (
            <DatePicker
              value={filterState.value ? new Date(filterState.value) : null}
              onChange={onValueChange}
              placeholder="Filter value"
              allowFreeInput
              allowLevelChange
              zIndex={9999}
            />
          )
      }

    </>
  )
}
