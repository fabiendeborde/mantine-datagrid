// import { ReactNode } from 'react'
import { Highlight, useMantineTheme } from '@mantine/core'
import { Cell as TableCell, flexRender } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'
import { FilterState } from '../Datagrid.types'

type Props<T> = {
  cell: TableCell<T, unknown>;
};

export default function Cell<T> ({ cell }: Props<T>) {
  const theme = useMantineTheme()
  const { classes } = useStyles({}, { name: 'datagrid-cell' })

  const filter = cell.column.getFilterValue() as FilterState
  const globalFilter = cell.getContext().table.getState().globalFilter
  const cellValue = cell.getValue() != null ? String(cell.getValue()) : undefined

  return (
    <td
      key={cell.id}
      style={{
        width: cell.column.getSize()
      }}
    >
      <span className={classes.slot}>
        {
          cellValue != null && (filter?.value || globalFilter)
            ? (
              <Highlight
                highlight={[globalFilter, filter?.value || '']}
                highlightColor={theme.primaryColor}
              >
                { cellValue }
              </Highlight>
            )
            : flexRender(cell.column.columnDef.cell, cell.getContext())
        }
      </span>
    </td>
  )
}

Cell.propTypes = {
  cell: PropTypes.object.isRequired
}
