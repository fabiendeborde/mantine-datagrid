import { useCallback, useEffect, useState } from 'react'
import {
  LoadingOverlay,
  ScrollArea,
  Table as MantineTable
} from '@mantine/core'
import {
  ColumnFiltersState,
  functionalUpdate,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import PropTypes from 'prop-types'

import { DataGridProps } from './Datagrid.types'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './Datagrid.constants'
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
  paginationRef,
  withGlobalFilter = false,
  striped = false,
  highlightOnHover = false,
  horizontalSpacing = 'xs',
  verticalSpacing = 'xs',
  fontSize = 'sm',
  withRowSelection = false,
  onRowSelection,
  withVirtualizedRows = false,
  virtualizedRowOverscan,
  onColumnFilterChange,
  onSortingChange,
  onPaginationChange,
  initialGridState
}: DataGridProps<T>) {
  const { classes } = useStyles({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    onRowSelection && onRowSelection(rowSelection)
  }, [rowSelection])

  useEffect(() => {
    if (withPagination) {
      table.setPageSize(paginationOptions?.initialPageSize || DEFAULT_PAGE_SIZE)
      table.setPageIndex(paginationOptions?.initialPageIndex || DEFAULT_PAGE_INDEX)
    } else {
      table.setPageSize(data.length)
      table.setPageIndex(DEFAULT_PAGE_INDEX)
    }
  }, [withPagination])

  useEffect(() => {
    console.log('initialGridState updated', initialGridState)
    if (initialGridState?.sorting) table.setSorting(initialGridState.sorting)
  }, [initialGridState])

  const _handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const filter = functionalUpdate(arg0, state.columnFilters)
        onColumnFilterChange && onColumnFilterChange(filter)
        return {
          ...state,
          columnFilters: filter
        }
      }),
    []
  )
  const _handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (arg0) =>
      table.setState((state) => {
        const sort = functionalUpdate(arg0, state.sorting)
        onSortingChange && onSortingChange(sort)
        return {
          ...state,
          sorting: sort
        }
      }),
    []
  )
  const _handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (arg0) => {
      if (withPagination) {
        const pagination = table.getState().pagination
        const nextPagination = functionalUpdate(arg0, pagination)
        if (nextPagination.pageIndex !== pagination.pageIndex || nextPagination.pageSize !== pagination.pageSize) {
          onPaginationChange && onPaginationChange(nextPagination)
          table.setState((state) => ({
            ...state,
            pagination: nextPagination
          }))
        }
      }
    },
    []
  )

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      globalFilter
    },
    initialState: initialGridState,
    onPaginationChange: _handlePaginationChange,
    onSortingChange: _handleSortingChange,
    enableGlobalFilter: withGlobalFilter,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: _handleColumnFiltersChange,
    enableRowSelection: withRowSelection,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
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
      pagination={table.getState().pagination}
      totalRows={table.getFilteredRowModel()?.rows?.length || 0}
      totalPages={table.getPageCount()}
      onPageChange={_handlePageChange}
      onSizeChange={_handlePageSizeChange}
      paginationOptions={paginationOptions}
    />
  )

  return (
    <>
      { withGlobalFilter && (
        <GlobalFilter
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />
      )}

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
          <GridBody
            table={table}
            onRowClick={onRowClick}
            withVirtualizedRows={withVirtualizedRows}
            virtualizedRowOverscan={virtualizedRowOverscan}
            parentRef={containerRef}
          />
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
