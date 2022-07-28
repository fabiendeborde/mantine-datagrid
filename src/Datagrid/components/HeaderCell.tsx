import { Button, Group, useMantineTheme } from '@mantine/core'
import { flexRender, Header } from '@tanstack/react-table'
import {
  ArrowsDownUp,
  ArrowUp
} from 'tabler-icons-react'

import useStyles from '../Datagrid.styles'

import { ColumnFilter } from './ColumnFilter'

type Props<T> = {
  index: number;
  header: Header<T, unknown>;
  isLastGroup: boolean;
};

export default function HeaderCell<T> ({
  index,
  header,
  isLastGroup
}: Props<T>) {
  const theme = useMantineTheme()
  const { classes, cx } = useStyles(
    {},
    {
      name: 'datagrid'
    }
  )
  const isSorted = header.column.getIsSorted()
  const canSort = isLastGroup && header.column.getCanSort()
  const canFilter = isLastGroup && header.column.getCanFilter()

  // console.log('column', header)
  // console.log('getCanFilter', header.id, header.column.getCanFilter())
  // console.log('hasFilter', hasFilter(header.column.columnDef.filterFn))

  return (
    <th
      style={{
        width: header.column.getSize() * header.colSpan
      }}
      colSpan={header.colSpan}
      className={cx(classes.headerCell, {
        lastGroup: isLastGroup,
        first: index === 0,
        sort: canSort
      })}
    >
      <Group
        align="center"
        spacing="xs"
        noWrap
        position={isLastGroup ? 'left' : 'center'}
      >
        <span className={classes.slot}>
          {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
        </span>

        {canFilter && (
          <ColumnFilter<T> column={header.column} />
        )}

        {canSort && (
          <Button
            variant={isSorted ? 'light' : 'subtle'}
            color={isSorted ? theme.primaryColor : 'gray'}
            compact
            size="sm"
            px={0}
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
