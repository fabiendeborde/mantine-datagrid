import { Row as TableRow } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'
import { DataGridProps } from '../Datagrid.types'

import Cell from './Cell'

type Props<T> = {
  row: TableRow<T>;
  onRowClick: DataGridProps<T>['onRowClick'];
}

function Row<T> ({ row, onRowClick }: Props<T>) {
  const { classes } = useStyles({ rowClickHandler: !!onRowClick })

  const _handleRowClick = () => {
    onRowClick && onRowClick(row.original)
  }
  return (
    <tr key={row.id} className={classes.row} onClick={_handleRowClick}>
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  )
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired
}

export default Row
