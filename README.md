# Mantine Datagrid
[![GitHub release](https://img.shields.io/github/v/release/FabienDeborde/mantine-datagrid)](https://github.com/FabienDeborde/mantine-datagrid/releases/)
![Size](https://img.shields.io/github/languages/code-size/FabienDeborde/mantine-datagrid)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/FabienDeborde/mantine-datagrid/blob/master/LICENSE.md)

A wrapper around React Table ([TanStack Table v8](https://tanstack.com/table/v8/docs/guide/introduction)) using [Mantine](https://mantine.dev/).

**[DEMO PAGE](https://mantine-datagrid.netlify.app/)**

This library requires the following packages: `@emotion/react`, `@mantine/core`, `@mantine/hooks`, `@mantine/dates` and it exposes this package: `@tanstack/react-table`.\
It was heavily inspired by the work of Yannick Küchlin ([GitHub repository](https://github.com/Kuechlin/mantine-data-grid)) and Milan Jain([CodeSandbox](https://codesandbox.io/s/react-table-datagrid-eojw8)) from this [discussion](https://github.com/mantinedev/mantine/discussions/1057).

I do not plan to really maintain or update this library except if it is needed by other private projects, but feel free to leave suggestions or bug reports, I'll try my best to check them as soon as I can.
I strongly recommend to follow the work on this [repository](https://github.com/Kuechlin/mantine-data-grid) as it feels like the author is going to improve more and more his library.


# Setup
```
npm i @fabiendeborde/mantine-datagrid
```

```
yarn add @fabiendeborde/mantine-datagrid
```

# Props
| name  | type | default  | description |
| ------------- | ------------- | ------------- | ------------- |
| data *-required-* | T[] | - | Table data | 
| columns *-required-* | ColumnDef<T, unknown>[] | - | Table columns definitions | 
| loading | boolean | false | Show a loader on loading (LoadingOverlay) | 
| debug | boolean | false | Enable React Table debug logging | 
| containerProps | ScrollAreaProps | undefined | Table container props (https://mantine.dev/core/scroll-area/) |
| containerStyle | CSSProperties | undefined | Table container style |
| containerRef | MutableRefObject<HTMLDivElement> | undefined | Table container ref |
| containerMaxHeight | number | undefined | Table container max height in pixel |
| onRowClick | (row: T) => void | undefined | Callback on Table row click (with row values) |
| withRowSelection | boolean | false | Enable Row selection |
| onRowSelection | (selection: RowSelectionState) => void | undefined | Callback on row selection (with selection state) |
| withPagination | boolean | undefined | Enable pagination |
| withTopPagination | boolean | false | Enable pagination above the Table |
| manualPagination | boolean | undefined | Enables manual pagination |
| paginationOptions | object | undefined | Pagination options | 
| ・paginationOptions.initialPageIndex | number | 0 | Initial page index | 
| ・paginationOptions.initialPageSize | number | 10 | Initial page size (rows per page) | 
| ・paginationOptions.pageIndex | number | 0 | Controlled page index (only used when manual pagination is `true) | 
| ・paginationOptions.pageSize | number | 10 | Controlled page size (rows per page) (only used when manual pagination is `true) | 
| ・paginationOptions.pageSizes | string[] | ["10", "25", "50", "100"] | Sets of string for page size (rows per page) selections. | 
| ・paginationOptions.position | GroupPosition | undefined | Pagination position | 
| ・paginationOptions.rowsCount | number | undefined | Set data total rows (only used when manual pagination is `true`) | 
| ・paginationOptions.pageCount | number | undefined | Set data total pages (only used when manual pagination is `true`) | 
| paginationRef | MutableRefObject<HTMLDivElement> | undefined | Table pagination ref |
| onPaginationChange | (filter: PaginationState) => void | undefined | Callback on pagination change (with pagination state) |
| withGlobalFilter | boolean | false | Enable global filter (not recommanded in manual mode, as the global filter will only work on the current page) |
| onColumnFilterChange | (filter: ColumnFiltersState) => void | undefined | Ccallback on column filter change (with column fiter state) |
| onSortingChange | (sort: SortingState) => void | undefined | Callback on column sort change (with column sorting state) |
| striped | boolean | false | If true every odd row of table will have gray background color |
| highlightOnHover | boolean | false | If true row will have hover color |
| horizontalSpacing | MantineNumberSize | 'xs' | Horizontal cells spacing from theme.spacing or number to set value in px |
| verticalSpacing | MantineNumberSize | 'xs' | Vertical cells spacing from theme.spacing or number to set value in px |
| fontSize | MantineNumberSize | 'sm' | Sets font size of all text inside table |
| withVirtualizedRows | boolean | false | Enable Virtualized Rows |
| virtualizedRowOverscan | number | undefined | The amount of items to load both behind and ahead of the current window range |
| gridState | GridState {<br>　pagination?: PaginationState;<br>　sorting?: SortingState;<br>　columnFilters?: ColumnFiltersState;<br>} | undefined | Grid State used for controlled pagination & filters |


# Usage
```tsx
<Datagrid<User>
  loading={false}
  debug={false}
  columns={columns}
  data={data}
  withPagination
  withTopPagination={false}
  paginationOptions={{
    initialPageIndex: 0,
    initialPageSize: 10,
    pageSizes: ['10', '25', '50', '100', '250', '1000'],
    position: 'right'
  }}
  withGlobalFilter
  withVirtualizedRows
  virtualizedRowOverscan={25}
/>
```


# License
Distributed under the ISC license. See [LICENSE](https://github.com/FabienDeborde/react-simple-qr-scanner/blob/master/LICENSE) for more information.

# TODO
[] update readme
[] add tests
[] add autocomplete in string filter (use mantine component, withAutocomplete props?)
[] improve example project (use real API?)
