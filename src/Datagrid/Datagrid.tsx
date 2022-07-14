import { useEffect, useRef, useState } from 'react'
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
  useTableInstance
} from '@tanstack/react-table'

import { DataTableProps } from '../../../typings'
import { useReactTable } from '../../../hooks'

import SimpleTableHeader from './TableHeader'
import SimpleTableBody from './TableBody'
import SimplePagination from './Pagination'
import { GlobalFilter } from './GlobalFilter'

export function SimpleTable<T> ({
  loading = false,
  data,
  columns: createColumns,
  containerProps,
  onRowClick,
  withPagination = false,
  withGlobalFilter = false
}: DataTableProps<T>) {
  const table = useReactTable<T>()
  const { current: columns } = useRef(createColumns(table))
  const containerRef = useRef<HTMLDivElement>()
  const paginationRef = useRef<HTMLDivElement>(null)
  const [tableHeight, setTableHeight] = useState(0)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    if (containerRef.current) {
      const pageHeight = window.innerHeight

      const container = containerRef.current
      const coord = container.getBoundingClientRect()

      const styles = window.getComputedStyle(container)
      const paddingTop = parseFloat(styles.getPropertyValue('padding-top'))
      const paddingBottom = parseFloat(styles.getPropertyValue('padding-bottom'))

      const pagination = paginationRef?.current
      const paginationCoord = pagination?.getBoundingClientRect()
      const paginationHeight = paginationCoord?.height || 0

      const height = pageHeight - coord.top - paddingTop - paddingBottom - paginationHeight

      setTableHeight(height)
    }
  }, [paginationRef])

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter
    },
    onPaginationChange: setPagination,
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

    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  })

  const _handlePageChange = (num: number) => {
    instance.setPageIndex(num - 1)
  }
  const _handlePageSizeChange = (size: number) => {
    instance.setPageSize(size)
  }

  return (
    <>
      <GlobalFilter
        withGlobalFilter={withGlobalFilter}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />
      <SimplePagination
        ref={paginationRef}
        pagination={pagination}
        totalRows={instance.getRowModel().rows.length}
        totalPages={instance.getPageCount()}
        onPageChange={_handlePageChange}
        onSizeChange={_handlePageSizeChange}
        withPagination={withPagination}
      />
      <ScrollArea style={{ width: '100%', height: tableHeight }} ref={containerRef} {...containerProps}>
        <MantineTable>
          <SimpleTableHeader instance={instance} />
          <SimpleTableBody instance={instance} onRowClick={onRowClick} />
        </MantineTable>
      </ScrollArea>
      <SimplePagination
        ref={paginationRef}
        pagination={pagination}
        totalRows={instance.getRowModel().rows.length}
        totalPages={instance.getPageCount()}
        onPageChange={_handlePageChange}
        onSizeChange={_handlePageSizeChange}
        withPagination={withPagination}
      />
      <LoadingOverlay visible={loading} />
    </>
  )
}
