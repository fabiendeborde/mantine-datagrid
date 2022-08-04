import { render } from '@testing-library/react'
import {
  ColumnDef,
  createColumnHelper
} from '@tanstack/react-table'

import { Datagrid } from './Datagrid'
import {
  stringFilterFn,
  numberFilterFn,
  booleanFilterFn,
  dateFilterFn
} from './filters'

import data from '../mock/data.json'

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  age: number;
  ip_address: string;
  active: boolean;
  active_since: string;
}

global.ResizeObserver = require('resize-observer-polyfill')

const columnHelper = createColumnHelper<User>()
const columns: ColumnDef<User>[] = [
  columnHelper.accessor(row => row.id.toString(), {
    id: 'id',
    header: 'User ID'
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    filterFn: stringFilterFn
  }),
  columnHelper.accessor(row => row.age.toString(), {
    id: 'age',
    header: 'Age',
    filterFn: numberFilterFn
  }),
  columnHelper.accessor('active', {
    header: 'Active',
    filterFn: booleanFilterFn
  }),
  columnHelper.accessor('active_since', {
    header: 'Active Since',
    filterFn: dateFilterFn
  })
]

test('renders the datagrid', () => {
  render(
    <Datagrid<User>
      loading={false}
      columns={columns}
      data={data}
      // containerMaxHeight={400}
    />
  )
})
