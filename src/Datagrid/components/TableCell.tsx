import { Cell } from '@tanstack/react-table'

import useStyles from '../Datagrid.styles'

export type DataTableCellProps<T> = {
  cell: Cell<T, unknown>;
};

export default function TableCell<T> ({ cell }: DataTableCellProps<T>) {
  const { classes } = useStyles({})

  return (
    <td
      key={cell.id}
      style={{
        width: cell.column.getSize()
      }}
      className={classes.cell}
    >
      <span className={classes.slot}>{cell.renderValue()}</span>
    </td>
  )
}
