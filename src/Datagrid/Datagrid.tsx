import { useState } from 'react'
import {
  LoadingOverlay,
  ScrollArea,
  Table as MantineTable
} from '@mantine/core'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable
} from '@tanstack/react-table'

import { DataTableProps } from './Datagrid.types'
import useStyles from './Datagrid.styles'

import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'

// import SimpleTableHeader from './TableHeader'
// import SimplePagination from './Pagination'
// import { GlobalFilter } from './GlobalFilter'

const DEFAULT_PAGE_SIZE = 10

export function Datagrid<T> ({
  loading = false,
  debug = false,
  data,
  columns,
  containerProps,
  onRowClick,
  withPagination = false,
  withGlobalFilter = false,
  containerStyle,
  containerRef,
  striped = false,
  highlightOnHover = false,
  horizontalSpacing = 'xs',
  verticalSpacing = 'xs',
  fontSize = 'sm'
}: DataTableProps<T>) {
  const { classes } = useStyles({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: withPagination ? DEFAULT_PAGE_SIZE : data.length
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter
    },
    onPaginationChange: withPagination ? setPagination : undefined,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // onColumnSizingInfoChange (updater) {
    //   instance.setState((last) => ({
    //     ...last,
    //     columnSizingInfo:
    //                 typeof updater === 'function'
    //                   ? updater(last.columnSizingInfo)
    //                   : updater
    //   }))
    //   bodyRef.current?.resetAfterColumnIndex(0)
    //   for (const ref of headerRefs.current) {
    //     ref.resetAfterIndex(0)
    //   }
    // },

    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug
  })

  // const _handlePageChange = (num: number) => {
  //   table.setPageIndex(num - 1)
  // }
  // const _handlePageSizeChange = (size: number) => {
  //   table.setPageSize(size)
  // }

  return (
    <>
      {/* <GlobalFilter
        withGlobalFilter={withGlobalFilter}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      /> */}
      {/* <SimplePagination
        ref={paginationRef}
        pagination={pagination}
        totalRows={instance.getRowModel().rows.length}
        totalPages={instance.getPageCount()}
        onPageChange={_handlePageChange}
        onSizeChange={_handlePageSizeChange}
        withPagination={withPagination}
      /> */}
      <ScrollArea style={containerStyle} ref={containerRef} {...containerProps}>
        <MantineTable
          striped={striped}
          highlightOnHover={highlightOnHover}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          fontSize={fontSize}
          className={classes.table}
        >
          <TableHeader table={table} />
          <TableBody table={table} onRowClick={onRowClick} />
        </MantineTable>
      </ScrollArea>
      {/* <SimplePagination
        ref={paginationRef}
        pagination={pagination}
        totalRows={instance.getRowModel().rows.length}
        totalPages={instance.getPageCount()}
        onPageChange={_handlePageChange}
        onSizeChange={_handlePageSizeChange}
        withPagination={withPagination}
      /> */}
      <LoadingOverlay visible={loading} />
    </>
  )
}
