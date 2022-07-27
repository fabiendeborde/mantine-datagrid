import React from 'react'
import { Table } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import { DataTableProps } from '../Datagrid.types'

import TableRow from './TableRow'

type Props<T> = {
  table: Table<T>;
  onRowClick?: DataTableProps<T>['onRowClick'];
}

function TableBody<T> ({ table, onRowClick }: Props<T>) {
  const rows = table?.getRowModel()?.rows
  return (
    <tbody>
      {rows?.map(row => (
        <TableRow<T>
          key={row.id}
          row={row}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  table: PropTypes.object,
  onRowClick: PropTypes.func
}

export default TableBody
