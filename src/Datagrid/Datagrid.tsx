import { useCallback, useEffect, useMemo, useState } from 'react'
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
  TableState,
  useReactTable
} from '@tanstack/react-table'
import PropTypes from 'prop-types'

import { DataGridProps } from './Datagrid.types'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './Datagrid.constants'

import GridHeader from './components/Header'
import GridBody from './components/Body'
import Pagination from './components/Pagination'
import GlobalFilter from './components/GlobalFilter'

export function Datagrid<T> (props: DataGridProps<T>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  const {
    loading = false,
    debug = false,
    columns,
    data,
    containerProps,
    containerStyle,
    containerRef,
    containerMaxHeight,
    onRowClick,
    manualPagination,
    withPagination,
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
    gridState
  } = props

  useEffect(() => {
    if (debug) console.log('props', props)
  }, [props, debug])

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
      if (withPagination && !manualPagination) {
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

  const computedState = useMemo(() => {
    let currentState: Partial<TableState> = {}

    if (gridState?.pagination) {
      currentState = {
        ...currentState,
        pagination: gridState.pagination
      }
    }
    if (gridState?.sorting) {
      currentState = {
        ...currentState,
        sorting: gridState.sorting
      }
    }
    if (gridState?.columnFilters) {
      currentState = {
        ...currentState,
        columnFilters: gridState.columnFilters
      }
    }
    return currentState
  }, [gridState])

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      globalFilter,
      rowSelection,
      ...computedState
    },
    onPaginationChange: _handlePaginationChange,
    manualPagination,
    pageCount: paginationOptions?.pageCount,
    onSortingChange: _handleSortingChange,
    enableGlobalFilter: withGlobalFilter,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: _handleColumnFiltersChange,
    enableRowSelection: withRowSelection,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
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
    if (manualPagination) {
      onPaginationChange && onPaginationChange({
        pageIndex: num - 1,
        pageSize: gridState?.pagination?.pageSize as number
      })
    } else {
      table.setPageIndex(num - 1)
    }
  }
  const _handlePageSizeChange = (size: number) => {
    if (manualPagination) {
      onPaginationChange && onPaginationChange({
        pageIndex: gridState?.pagination?.pageIndex as number,
        pageSize: size
      })
    } else {
      table.setPageSize(size)
    }
  }

  const GridPagination = () => (
    <Pagination
      ref={paginationRef}
      pagination={table.getState().pagination}
      totalRows={paginationOptions?.rowsCount as number || table.getFilteredRowModel()?.rows?.length || 0}
      totalPages={paginationOptions?.pageCount || table.getPageCount() || 0}
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
  paginationRef: PropTypes.object,
  withGlobalFilter: PropTypes.bool,
  striped: PropTypes.bool,
  highlightOnHover: PropTypes.bool,
  horizontalSpacing: PropTypes.string,
  verticalSpacing: PropTypes.string,
  fontSize: PropTypes.string,
  withRowSelection: PropTypes.bool,
  onRowSelection: PropTypes.func,
  withVirtualizedRows: PropTypes.bool,
  virtualizedRowOverscan: PropTypes.number,
  onColumnFilterChange: PropTypes.func,
  onSortingChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  gridState: PropTypes.shape({
    pagination: PropTypes.object,
    sorting: PropTypes.array,
    columnFilters: PropTypes.array
  })
}
