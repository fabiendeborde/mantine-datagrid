import React from 'react'
import PropTypes from 'prop-types'
import { TableInstance } from '@tanstack/react-table'

import { DataTableGenerics } from '../../../typings'

import useStyles from './SimpleTable.styles'
import { SimpleTableHeaderCell } from './SimpleTableHeaderCell'

type Props<T> = {
  instance: TableInstance<DataTableGenerics<T>>
}

function SimpleTableHeader<T> ({ instance }: Props<T>) {
  const { classes } = useStyles({})
  const headerGroups = instance.getHeaderGroups()
  return (
    <thead>
      {headerGroups.map((group, groupIndex) => (
        <tr key={group.id} className={classes.row}>
          {group.headers.map((header, headerIndex) => (
            <SimpleTableHeaderCell<T>
              key={header.column.id}
              index={headerIndex}
              header={header}
              instance={instance}
              isLastGroup={
                headerGroups.length - 1 ===
                groupIndex
              }
            />
          ))}
        </tr>
      ))}
    </thead>
  )
}

SimpleTableHeader.propTypes = {
  headerGroups: PropTypes.object
}

export default SimpleTableHeader
