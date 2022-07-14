import { createStyles } from '@mantine/core'

type StyleProps = {
  rowClickHandler?: boolean
}

export default createStyles((theme, props?: StyleProps) => ({
  table: {},
  cell: {},
  row: {
    cursor: props?.rowClickHandler ? 'pointer' : 'inherit',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1]
    },
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    }
  },
  header: {
    position: 'sticky',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]

    },
    '&.sort': {
      userSelect: 'none'
    }
  },
  slot: {
    // text overflow
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  pageSize: {
    width: 72
  },
  paginationDivider: {
    height: 24,
    alignSelf: 'center',
    borderLeftColor: theme.colors.teal[8]
  }
}))
