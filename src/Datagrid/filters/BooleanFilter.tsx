import { ChangeEvent } from 'react'
import { createStyles, Switch } from '@mantine/core'

import { DataGridFilterFn, DataGridFilterProps } from '../Datagrid.types'

type Filter = {
  operator: BooleanFilter;
  value: boolean;
}

export enum BooleanFilter {
  Equals = 'eq',
}

export const booleanFilterFn: DataGridFilterFn<any, Filter> = (row, columnId, filter) => {
  const rowValue = Boolean(row.getValue(columnId))
  const operator = filter.operator || BooleanFilter.Equals
  const filterValue = Boolean(filter.value)
  switch (operator) {
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

booleanFilterFn.filterComponent = function ({ filterState, onFilterChange }: DataGridFilterProps<Filter>) {
  const { classes } = useStyles()
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => onFilterChange({ ...filterState, value: e.currentTarget.checked })

  return (
    <Switch
      checked={filterState.value}
      onChange={onValueChange}
      onLabel="true"
      offLabel="false"
      size="lg"
      classNames={{
        root: classes.switch
      }}
    />
  )
}

const useStyles = createStyles(() => {
  return {
    switch: {
      width: '100%'
    }
  }
})
