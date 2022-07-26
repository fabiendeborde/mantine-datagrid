import { ComponentType, CSSProperties, MutableRefObject } from 'react'
import {
  ColumnDef,
  FilterFn,
  Table,
  // ReactTableGenerics,
  // TableInstance,
  Overwrite,
  Row
} from '@tanstack/react-table'
import { MantineNumberSize, ScrollAreaProps } from '@mantine/core'

// export type DataTableGenerics<T> = Overwrite<
//   ReactTableGenerics,
//   {
//       Row: T;
//       FilterFns: {
//           stringFilterFn: FilterFn<any>;
//       };
//   }
// >;

export type DataTableProps<T> = {
  loading: boolean;
  debug?: boolean;
  columns: ColumnDef<T, unknown>[];
  data: T[];
  onRowClick?: (row: T) => void;
  containerProps?: ScrollAreaProps;
  withPagination?: boolean;
  withGlobalFilter?: boolean;
  containerStyle?: CSSProperties;
  containerRef?: MutableRefObject<HTMLDivElement>;
  striped?: boolean;
  highlightOnHover?: boolean;
  horizontalSpacing?: MantineNumberSize;
  verticalSpacing?: MantineNumberSize;
  fontSize?: MantineNumberSize;
};
