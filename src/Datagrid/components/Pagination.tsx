import React from 'react'
import { Divider, Group, GroupPosition, Pagination as MantinePagination, Select, Text, useMantineTheme } from '@mantine/core'
import { PaginationState } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'
import { DEFAULT_PAGE_SIZES } from '../Datagrid.constants'

type Props = {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onSizeChange: (page: number) => void;
  totalRows: number;
  totalPages: number;
  paginationOptions?: {
    pageSizes?: string[];
    position?: GroupPosition;
    initialPageIndex?: number;
    initialPageSize?: number;
    rowsCount?: number;
  };
}

const Pagination = React.forwardRef<HTMLDivElement, Props>((
  { pagination, totalRows, totalPages, onPageChange, onSizeChange, paginationOptions },
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const theme = useMantineTheme()
  const color = theme?.primaryColor || 'blue'
  const position = paginationOptions?.position || 'right'
  const pageSizes = paginationOptions?.pageSizes || DEFAULT_PAGE_SIZES
  const currentPageIndex = pagination.pageIndex
  const currentPageSize = pagination.pageSize
  const currentTotalPages = paginationOptions?.rowsCount ? Math.ceil(paginationOptions.rowsCount / pagination.pageSize) : totalPages

  const { classes } = useStyles({ paginationColor: color })

  const _handlePageSizeChange = (value: string) => {
    onSizeChange(Number(value))
  }

  const getPageRecordInfo = () => {
    const firstRowNum = currentPageIndex * pagination.pageSize + 1

    const currLastRowNum = (currentPageIndex + 1) * currentPageSize
    const lastRowNum = currLastRowNum < totalRows ? currLastRowNum : totalRows
    return `${firstRowNum} - ${lastRowNum} of ${totalRows}`
  }

  return (
    <Group position={position} align="center" ref={ref} py="xs">
      <Text size="sm">Rows per page: </Text>
      <Select
        className={classes.pageSize}
        variant="filled"
        data={pageSizes}
        mb={0}
        value={currentPageSize + ''}
        onChange={_handlePageSizeChange}
      />
      <Divider orientation="vertical" className={classes.paginationDivider} />
      <Text size="sm">
        {getPageRecordInfo()}
      </Text>
      <Divider orientation="vertical" className={classes.paginationDivider} />
      <MantinePagination
        page={currentPageIndex + 1}
        total={currentTotalPages}
        onChange={onPageChange}
        py="md"
        position="center"
        color={color}
      />
    </Group>
  )
})

Pagination.displayName = 'Pagination'

Pagination.propTypes = {
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
  }).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  totalRows: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
  // position: PropTypes.oneOf(['right', 'center', 'left', 'apart']),
  // color: PropTypes.string
}

export default Pagination
