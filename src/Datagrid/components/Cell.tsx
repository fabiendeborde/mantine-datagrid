import { Cell } from '@tanstack/react-table'

import useStyles from '../Datagrid.styles'

type Props<T> = {
  cell: Cell<T, unknown>;
};

export default function Cell<T> ({ cell }: Props<T>) {
  const { classes } = useStyles({})

  return (
    <td
      key={cell.id}
      style={{
        width: cell.column.getSize()
      }}
      className={classes.cell}
    >
      <span className={classes.slot}>{ cell.getValue() as string}</span>
    </td>
  )
}
