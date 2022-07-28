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
import PropTypes from 'prop-types'

import { DataGridProps } from './Datagrid.types'
import { DEFAULT_PAGE_SIZE } from './Datagrid.constants'
import useStyles from './Datagrid.styles'

import GridHeader from './components/Header'
import GridBody from './components/Body'
import Pagination from './components/Pagination'
import GlobalFilter from './components/GlobalFilter'

export function Datagrid<T> ({
  loading = false,
  debug = false,
  columns,
  data,
  onRowClick,
  containerProps,
  containerStyle,
  containerRef,
  containerMaxHeight,
  withPagination = false,
  withTopPagination = false,
  paginationOptions,
  withGlobalFilter = false,
  striped = false,
  highlightOnHover = false,
  horizontalSpacing = 'xs',
  verticalSpacing = 'xs',
  fontSize = 'sm',
  paginationRef
}: DataGridProps<T>) {
  const { classes } = useStyles({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: paginationOptions?.initialPageIndex || 0,
    pageSize: withPagination ? paginationOptions?.initialPageSize || DEFAULT_PAGE_SIZE : data.length
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
    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug
  })

  const _handlePageChange = (num: number) => {
    table.setPageIndex(num - 1)
  }
  const _handlePageSizeChange = (size: number) => {
    table.setPageSize(size)
  }

  const GridPagination = () => (
    <Pagination
      ref={paginationRef}
      pagination={pagination}
      totalRows={table.getFilteredRowModel()?.rows?.length || 0}
      totalPages={table.getPageCount()}
      onPageChange={_handlePageChange}
      onSizeChange={_handlePageSizeChange}
      paginationOptions={paginationOptions}
    />
  )

  return (
    <>
      {
        withGlobalFilter && (
          <GlobalFilter
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
          />
        )
      }

      { withTopPagination && <GridPagination /> }

      <ScrollArea.Autosize
        style={containerStyle}
        viewportRef={containerRef}
        maxHeight={containerMaxHeight}
        {...containerProps}
      >
        <MantineTable
          striped={striped}
          highlightOnHover={highlightOnHover}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          fontSize={fontSize}
          className={classes.table}
        >
          <GridHeader table={table} />
          <GridBody table={table} onRowClick={onRowClick} />
        </MantineTable>
      </ScrollArea.Autosize>

      { withPagination && <GridPagination /> }

      <LoadingOverlay visible={loading} />
    </>
  )
}

Datagrid.propTypes = {
  loading: PropTypes.bool.isRequired,
  debug: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  containerProps: PropTypes.object,
  containerStyle: PropTypes.object,
  containerRef: PropTypes.object,
  containerMaxHeight: PropTypes.number,
  withPagination: PropTypes.bool,
  withTopPagination: PropTypes.bool,
  paginationOptions: PropTypes.object,
  withGlobalFilter: PropTypes.bool,
  striped: PropTypes.bool,
  highlightOnHover: PropTypes.bool,
  horizontalSpacing: PropTypes.string,
  verticalSpacing: PropTypes.string,
  fontSize: PropTypes.string,
  paginationRef: PropTypes.object
}
