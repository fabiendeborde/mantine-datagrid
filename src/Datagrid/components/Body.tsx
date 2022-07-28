import { Table } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import { DataGridProps } from '../Datagrid.types'

import Row from './Row'

type Props<T> = {
  table: Table<T>;
  onRowClick?: DataGridProps<T>['onRowClick'];
}

function Body<T> ({ table, onRowClick }: Props<T>) {
  const rows = table?.getRowModel()?.rows
  return (
    <tbody>
      {rows?.map(row => (
        <Row<T>
          key={row.id}
          row={row}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  )
}

Body.propTypes = {
  table: PropTypes.object,
  onRowClick: PropTypes.func
}

export default Body
