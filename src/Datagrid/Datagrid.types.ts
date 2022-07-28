import { CSSProperties, MutableRefObject } from 'react'
import { ColumnDef, RowSelectionState } from '@tanstack/react-table'
import { DefaultMantineColor, GroupPosition, MantineNumberSize, ScrollAreaProps } from '@mantine/core'

export type DataGridProps<T> = {
  /** Show a loader on loading */
  loading: boolean;
  /** Enable React Table debug logging */
  debug?: boolean;
  /** Table columns definitions */
  columns: ColumnDef<T, unknown>[];
  /** Table data */
  data: T[];
  /** Callback on Table row click (with row values) */
  onRowClick?: (row: T) => void;
  /** Table container props (https://mantine.dev/core/scroll-area/) */
  containerProps?: ScrollAreaProps;
  /** Table container style */
  containerStyle?: CSSProperties;
  /** Table container ref */
  containerRef?: MutableRefObject<HTMLDivElement>;
  /** Table container max height in pixel */
  containerMaxHeight?: number;
  /** Enable pagination */
  withPagination?: boolean;
  /** Enable pagination above the Table */
  withTopPagination?: boolean;
  /** Pagination options */
  paginationOptions?: {
    /**
     * Initial page index
     * Default is `0` */
    initialPageIndex?: number;
    /**
     * Initial page size (rows per page)
     * Default is `10`  */
    initialPageSize?: number;
    /**
     * Sets of string for page size (rows per page) selections.
     * Default is `["10", "25", "50", "100"]`
     * */
    pageSizes?: string[];
    /** Pagination position */
    position?: GroupPosition;
    /** Pagination focus / active color */
    color?: DefaultMantineColor;
  };
  /** Table pagination ref */
  paginationRef?: MutableRefObject<HTMLDivElement>;
  /** Callback on page index change (with new page index) */
  onPageChange?: (page: number) => void;
  /** Callback on page size change (with new page size) */
  onPageSizeChange?: (size: number) => void;
  /** Enable global filter */
  withGlobalFilter?: boolean;
  /** If true every odd row of table will have gray background color */
  striped?: boolean;
  /** If true row will have hover color */
  highlightOnHover?: boolean;
  /** Horizontal cells spacing from theme.spacing or number to set value in px */
  horizontalSpacing?: MantineNumberSize;
  /** Vertical cells spacing from theme.spacing or number to set value in px */
  verticalSpacing?: MantineNumberSize;
  /** Sets font size of all text inside table */
  fontSize?: MantineNumberSize;
  /** Enable Row selection */
  withRowSelection?: boolean;
  /** Callback on row selection (with selection state) */
  onRowSelection?: (selection: RowSelectionState) => void;
};
