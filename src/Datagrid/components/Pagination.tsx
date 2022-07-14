import React from 'react'
import { Divider, Group, Pagination as MantinePagination, Select, Text } from '@mantine/core'
import { PaginationState } from '@tanstack/react-table'
import PropTypes from 'prop-types'

import useStyles from '../Datagrid.styles'

type Props = {
  pagination: PaginationState;
  withPagination: boolean;
  onPageChange: (page: number) => void;
  onSizeChange: (page: number) => void;
  totalRows: number;
  totalPages: number;
}

const pageSizeOptions = ['10', '25', '50', '100']

const Pagination = React.forwardRef<HTMLDivElement, Props>((
  { pagination, withPagination, totalRows, totalPages, onPageChange, onSizeChange },
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const { classes } = useStyles({})
  if (!withPagination) return null

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
    <Group position="right" align="center" ref={ref} py="xs">
      <Text size="sm">Rows per page: </Text>
      <Select
        className={classes.pageSize}
        variant="filled"
        data={pageSizeOptions}
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
        color="teal"
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
  withPagination: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  totalRows: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination
