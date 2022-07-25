import { Table } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'

import TableHeaderCell from './TableHeaderCell'

type Props<T> = {
  table: Table<T>
}

function TableHeader<T> ({ table }: Props<T>) {
  const { classes } = useStyles(
    {},
    {
        name: 'datagrid-header',
    }
);
  const headerGroups = table.getHeaderGroups()
  return (
    <thead>
      {headerGroups.map((group, groupIndex) => (
        <tr key={group.id} className={classes.row} role="row">
          {group.headers.map((header, headerIndex) => (
            <TableHeaderCell<T>
              key={header.id}
              index={headerIndex}
              header={header}
              isLastGroup={
                headerGroups.length - 1 ===
                groupIndex
              }
            />
          ))}
        </tr>
      ))}
    </thead>
  )
}

TableHeader.propTypes = {
  headerGroups: PropTypes.object
}

export default TableHeader
