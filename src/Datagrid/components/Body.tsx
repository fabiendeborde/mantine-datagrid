import { MutableRefObject } from 'react'
import { Table, Row as TableRow } from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'
import PropTypes from 'prop-types'

import { DataGridProps } from '../Datagrid.types'
import { DEFAULT_VIRTUALIZED_ROW_OVERSCAN } from '../Datagrid.constants'

import Row from './Row'

type Props<T> = {
  table: Table<T>;
  onRowClick?: DataGridProps<T>['onRowClick'];
  withVirtualizedRows?: boolean;
  virtualizedRowOverscan?: number;
  parentRef?: MutableRefObject<HTMLDivElement>;
}
type VirutalizedProps<T> = Props<T> & {
  parentRef: MutableRefObject<HTMLDivElement>;
}

function VirtualizedBody<T> ({ table, onRowClick, parentRef, virtualizedRowOverscan }: VirutalizedProps<T>) {
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef,
    size: rows.length,
    overscan: virtualizedRowOverscan || DEFAULT_VIRTUALIZED_ROW_OVERSCAN
  })
  let paddingTop = 0
  let paddingBottom = 0

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  if (virtualRows.length > 0) {
    paddingTop = virtualRows?.[0]?.start || 0
    paddingBottom = totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
  }

  return (
    <tbody>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualRows.map(virtualRow => {
        const row = rows[virtualRow.index] as TableRow<T>
        return (
          <Row<T>
            key={row.id}
            row={row}
            onRowClick={onRowClick}
          />
        )
      })}
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </tbody>
  )
}

export default function Body<T> ({ table, onRowClick, withVirtualizedRows, parentRef }: Props<T>) {
  const rows = table?.getRowModel()?.rows
  if (withVirtualizedRows && parentRef) {
    return (
      <VirtualizedBody<T>
        table={table}
        onRowClick={onRowClick}
        parentRef={parentRef}
      />
    )
  }

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
  onRowClick: PropTypes.func,
  withVirtualizedRows: PropTypes.bool,
  parentRef: function (props: any, propName: string) {
    if (props.withVirtualizedRows && !props[propName]) {
      return new Error(`You need to provide a ${propName} when withVirtualizedRows is true.`)
    }
  }
}
