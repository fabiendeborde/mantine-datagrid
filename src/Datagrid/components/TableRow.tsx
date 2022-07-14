import React from 'react'
import { Row } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import { DataTableGenerics, DataTableProps } from '../../../typings'

import { SimpleTableCell } from './SimpleTableCell'
import useStyles from './SimpleTable.styles'

type Props<T> = {
  row: Row<DataTableGenerics<T>>;
  onRowClick: DataTableProps<T>['onRowClick'];
}

function SimpleTableRow<T> ({ row, onRowClick }: Props<T>) {
  const { classes } = useStyles({ rowClickHandler: !!onRowClick })

  const _handleRowClick = () => {
    onRowClick && onRowClick(row.original)
  }
  return (
    <tr key={row.id} className={classes.row} onClick={_handleRowClick}>
      {row.getVisibleCells().map((cell) => (
        <SimpleTableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  )
}

SimpleTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired
}

export default SimpleTableRow
