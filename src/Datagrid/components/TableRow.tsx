import React from 'react'
import { Row } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'
import { DataTableProps } from '../Datagrid.types'

import TableCell from './TableCell'

type Props<T> = {
  row: Row<T>;
  onRowClick: DataTableProps<T>['onRowClick'];
}

function TableRow<T> ({ row, onRowClick }: Props<T>) {
  const { classes } = useStyles({ rowClickHandler: !!onRowClick })

  const _handleRowClick = () => {
    onRowClick && onRowClick(row.original)
  }
  return (
    <tr key={row.id} className={classes.row} onClick={_handleRowClick}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  )
}

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired
}

export default TableRow
