import { DataGridFilterFn } from '../Datagrid.types'

export function isDataGridFilter (val: unknown): val is DataGridFilterFn<unknown, unknown> {
  return typeof val === 'function' && 'filterComponent' in val && 'initialFilter' in val
}
