import { Button, Group } from '@mantine/core'
import {
  Header,
  TableInstance
} from '@tanstack/react-table'
import {
  ArrowsDownUp,
  ArrowUp
} from 'tabler-icons-react'

import { DataTableGenerics } from '../../../typings'
import { hasFilter } from '../utils'

import { ColumnFilter } from './ColumnFilter'
import useStyles from './SimpleTable.styles'

export type DataTableHeaderProps<T> = {
    index: number;
    instance: TableInstance<DataTableGenerics<T>>;
    header: Header<DataTableGenerics<T>>;
    isLastGroup: boolean;
};

export function SimpleTableHeaderCell<T> ({
  index,
  header,
  isLastGroup
}: DataTableHeaderProps<T>) {
  const { classes, cx } = useStyles({})
  const isSorted = header.column.getIsSorted()
  const canSort = isLastGroup && header.column.getCanSort()
  const canFilter =
        isLastGroup &&
        header.column.getCanFilter() &&
        hasFilter(header.column.columnDef.filterFn)

  return (
    <th
      style={{
        width: header.column.getSize() * header.colSpan
      }}
      colSpan={header.colSpan}
      className={cx(classes.header, {
        lastGroup: isLastGroup,
        first: index === 0,
        sort: canSort
      })}
    >
      <Group align="center" spacing="xs" noWrap>
        <span className={classes.slot}>
          {!header.isPlaceholder && header.renderHeader()}
        </span>

        {canFilter && (
          <ColumnFilter<T> column={header.column} />
        )}

        {canSort && (
          <Button
            variant="subtle"
            compact
            size="sm"
            px={0}
            color="gray"
            style={{
              transition: 'transform 0.25s',
              transform: `rotate(${isSorted === 'asc' ? '180' : '0'}deg)`
            }}
            onClick={header.column.getToggleSortingHandler()}
          >
            {
              isSorted
                ? <ArrowUp size={16} />
                : <ArrowsDownUp size={16} />
            }
          </Button>
        )}
      </Group>
    </th>
  )
}
