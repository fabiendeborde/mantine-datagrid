import { SelectItem } from '@mantine/core'
import { DataGridFilterFn } from '../Datagrid.types'

export function isDataGridFilter (val: unknown): val is DataGridFilterFn<unknown, unknown> {
  return typeof val === 'function' && 'filterComponent' in val && 'initialFilter' in val
}

function formatOperatorLabel (label: string): string {
  return label.replace(/([a-z]+)([A-Z]{1})/g, '$1 $2')
}

export function getOperatorSelectData (filter: any): (string | SelectItem)[] {
  const data = Object.entries(filter).map(
    ([label, value]) => ({
      value,
      label: formatOperatorLabel(label)
    })
  )

  return data as SelectItem[]
}
