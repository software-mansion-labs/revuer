import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { FC, useState } from 'react'
import { styled } from '~/styling'
import { palette } from '~/styling/palette'
import { Text } from '~/ui'
import { ReviewerStatistics } from './code-review-stats-use-case'

const columnHelper = createColumnHelper<ReviewerStatistics>()

const columns = [
  columnHelper.accessor('author.username', {
    header: () => <HeaderText value='Username' />,
    cell(info) {
      return <Text.Button value={info.getValue()} align='center' />
    },
  }),
  columnHelper.accessor('reviewsCount', {
    header: () => <HeaderText value='Reviews' />,
    cell(info) {
      return <CellText value={info.getValue().toString()} align='center' />
    },
  }),
  columnHelper.accessor('linesOfCodePerComment', {
    header: () => <HeaderText value='LOC / Comment' />,
    cell(info) {
      return <CellText value={info.getValue().toFixed(0)} align='center' />
    },
  }),
  columnHelper.accessor('notApprovingProbability', {
    header: () => <HeaderText value='Not Approving Probability' />,
    cell(info) {
      return (
        <CellText value={formatPercentage(info.getValue())} align='center' />
      )
    },
  }),
  columnHelper.accessor('requestingChangesProbability', {
    header: () => <HeaderText value='Requesting Changes Probability' />,
    cell(info) {
      return (
        <CellText value={formatPercentage(info.getValue())} align='center' />
      )
    },
  }),
  columnHelper.accessor('averageReviewedPRSizeInLOC', {
    header: () => <HeaderText value='Average Reviewed PR Size [LOC]' />,
    cell(info) {
      return <CellText value={info.getValue().toFixed(0)} align='center' />
    },
  }),
  columnHelper.accessor('averageCommentsInReviewCount', {
    header: () => <HeaderText value='Comments / Review' />,
    cell(info) {
      return (
        <CellText
          value={info.getValue().toFixed(1).toString()}
          align='center'
        />
      )
    },
  }),
]

export const HeaderText = Text.Label
export const CellText = Text.Body

function formatPercentage(value: number) {
  return (value * 100).toFixed(0) + '%'
}

export const ReviewersStatisticsTable: FC<{
  statistics: ReviewerStatistics[]
}> = ({ statistics }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data: statistics,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <SortableColumnHeader
                    onPress={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </SortableColumnHeader>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const SortableColumnHeader: FC<{
  children: any
  onPress?: (event: any) => void
}> = ({ children, onPress }) => {
  return <HeaderContainer onClick={onPress}>{children}</HeaderContainer>
}

const Table = styled('table', {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$background90',
  boxShadow: `0px 0px 16px ${palette.yellow25}`,
  borderRadius: 8,

  td: {
    padding: 8,
  },

  'tbody>tr:nth-child(odd)': {
    backgroundColor: 'rgba(255,255,255, 0.03)',
  },
})

const HeaderContainer = styled('div', {
  cursor: 'pointer',
  height: '100%',
  padding: 16,
  paddingLeft: 8,
  paddingRight: 8,
  userSelect: 'none',
  color: '$primary50',

  '&:hover': {
    color: '$secondary50',
  },
})
