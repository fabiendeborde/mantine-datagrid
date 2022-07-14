import { ComponentType } from 'react'
import {
  ColumnDef,
  FilterFn,
  Table,
  // ReactTableGenerics,
  // TableInstance,
  Overwrite,
  Row
} from '@tanstack/react-table'
import { ScrollAreaProps } from '@mantine/core';

export type DatagridProps = {};

export type DataTableGenerics<T> = Overwrite<
  ReactTableGenerics,
  {
      Row: T;
      FilterFns: {
          stringFilterFn: FilterFn<any>;
      };
  }
>;

export type DataTableInstance<T = any> = TableInstance<DataTableGenerics<T>>;

export type ColumnsFactory<T> = (
  table: Table<DataTableGenerics<T>>
) => ColumnDef<DataTableGenerics<T>>[];

export type DataTableProps<T> = {
  loading: boolean;
  columns: ColumnsFactory<T>;
  data: T[];
  onRowClick?: (row: Row<DataTableGenerics<T>>) => void;
  containerProps?: ScrollAreaProps;
  withPagination?: boolean;
  withGlobalFilter?: boolean;
};

export type DataTableFilterProps<T = any> = {
  value: T;
  onChange(value: T): void;
};

export type DataTableFilterComponent<T = any> = ComponentType<
  DataTableFilterProps<T>
>;
