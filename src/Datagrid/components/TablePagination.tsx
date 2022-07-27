import React from 'react'
import { DefaultMantineColor, Divider, Group, GroupPosition, Pagination as MantinePagination, Select, Text } from '@mantine/core'
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
    color?: DefaultMantineColor;
  };
}

const TablePagination = React.forwardRef<HTMLDivElement, Props>((
  { pagination, totalRows, totalPages, onPageChange, onSizeChange, paginationOptions },
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const color = paginationOptions?.color || 'blue'
  const position = paginationOptions?.position || 'right'
  const pageSizes = paginationOptions?.pageSizes || DEFAULT_PAGE_SIZES

  const { classes } = useStyles({ paginationColor: color })

  const _handlePageSizeChange = (value: string) => {
    onSizeChange(Number(value))
  }

  const getPageRecordInfo = () => {
    const firstRowNum = pagination.pageIndex * pagination.pageSize + 1

    const currLastRowNum = (pagination.pageIndex + 1) * pagination.pageSize
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
        value={pagination.pageSize + ''}
        onChange={_handlePageSizeChange}
      />
      <Divider orientation="vertical" className={classes.paginationDivider} />
      <Text size="sm">
        {getPageRecordInfo()}
      </Text>
      <Divider orientation="vertical" className={classes.paginationDivider} />
      <MantinePagination
        page={pagination.pageIndex + 1}
        total={totalPages}
        onChange={onPageChange}
        py="md"
        position="center"
        color={color}
      />
    </Group>
  )
})

TablePagination.displayName = 'TablePagination'

TablePagination.propTypes = {
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
  }).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  totalRows: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['right', 'center', 'left', 'apart']),
  color: PropTypes.string
}

export default TablePagination
