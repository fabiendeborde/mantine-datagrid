import { Table } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'

import HeaderCell from './HeaderCell'

type Props<T> = {
  table: Table<T>
}

function Header<T> ({ table }: Props<T>) {
  const { classes } = useStyles(
    {},
    {
      name: 'datagrid-header'
    }
  )
  const headerGroups = table.getHeaderGroups()
  return (
    <thead className={classes.header}>
      {headerGroups.map((group, groupIndex) => (
        <tr key={group.id} className={classes.row} role="row">
          {group.headers.map((header, headerIndex) => (
            <HeaderCell<T>
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

Header.propTypes = {
  headerGroups: PropTypes.object
}

export default Header
