import { Cell } from '@tanstack/react-table'
import { DataTableGenerics } from '../../../typings'
import useStyles from './SimpleTable.styles'

export type DataTableCellProps<T> = {
  cell: Cell<DataTableGenerics<T>>;
};

export function SimpleTableCell<T> ({ cell }: DataTableCellProps<T>) {
  const { classes } = useStyles({})

  return (
    <td
      key={cell.id}
      style={{
        width: cell.column.getSize()
      }}
      className={classes.cell}
    >
      <span className={classes.slot}>{cell.renderCell()}</span>
    </td>
  )
}
