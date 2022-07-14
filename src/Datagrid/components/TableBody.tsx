import React from 'react'
import { TableInstance } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import { DataTableGenerics, DataTableProps } from '../../../typings'

import SimpleTableRow from './SimpleTableRow'

type Props<T> = {
  instance: TableInstance<DataTableGenerics<T>>;
  onRowClick: DataTableProps<T>['onRowClick'];
}

function SimpleTableBody<T> ({ instance, onRowClick }: Props<T>) {
  const rows = instance.getRowModel().rows
  return (
    <tbody>
      {rows.map(row => (
        <SimpleTableRow<T>
          key={row.id}
          row={row}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  )
}

SimpleTableBody.propTypes = {
  instance: PropTypes.object,
  onRowClick: PropTypes.func
}

export default SimpleTableBody
