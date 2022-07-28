import { Row as TableRow } from '@tanstack/react-table'
import PropTypes from 'prop-types'
import { MouseEvent } from 'react'

import useStyles from '../Datagrid.styles'
import { DataGridProps } from '../Datagrid.types'

import Cell from './Cell'

type Props<T> = {
  row: TableRow<T>;
  onRowClick: DataGridProps<T>['onRowClick'];
}

const ROW_CLICK_DENY_LIST = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A']

function Row<T> ({ row, onRowClick }: Props<T>) {
  const { classes } = useStyles({ rowClickHandler: !!onRowClick })

  const _handleRowClick = (e: MouseEvent) => {
    e.stopPropagation()
    const target = e.target as HTMLElement
    if (!ROW_CLICK_DENY_LIST.includes(target.nodeName)) {
      onRowClick && onRowClick(row.original)
    }
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
