import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { FC } from 'react'
import { Text } from '~/ui'
import { ReviewerStatistic } from './code-review-stats-use-case'

const columnHelper = createColumnHelper<ReviewerStatistic>()

const columns = [
  columnHelper.accessor('author.username', {
    header: () => <HeaderText value='Username' />,
    cell(info) {
      return <Text value={info.getValue()} />
    },
  }),
  columnHelper.accessor('reviewsCount', {
    header: () => <HeaderText value='Reviews' />,
    cell(info) {
      return <Text value={info.getValue().toString()} align='end' />
    },
  }),
  columnHelper.accessor('linesOfCodePerComment', {
    header: () => <HeaderText value='LOC / Comment' />,
    cell(info) {
      return <Text value={info.getValue().toFixed(0)} align='end' />
    },
  }),
  columnHelper.accessor('notApprovingProbability', {
    header: () => <HeaderText value='Not Approving Probability' />,
    cell(info) {
      return <Text value={formatPercentage(info.getValue())} align='end' />
    },
  }),
  columnHelper.accessor('requestingChangesProbability', {
    header: () => <HeaderText value='Requesting Changes Probability' />,
    cell(info) {
      return <Text value={formatPercentage(info.getValue())} align='end' />
    },
  }),
  columnHelper.accessor('medianReviewedPRSizeInLOC', {
    header: () => <HeaderText value='Median Reviewed PR Size [LOC]' />,
    cell(info) {
      return <Text value={info.getValue().toFixed(0)} align='end' />
    },
  }),
  columnHelper.accessor('averageCommentsInReviewCount', {
    header: () => <HeaderText value='Comments / Review' />,
    cell(info) {
      return <Text value={info.getValue().toFixed(1).toString()} align='end' />
    },
  }),
]

export const HeaderText = Text

function formatPercentage(value: number) {
  return (value * 100).toFixed(0) + '%'
}

export const ReviewersStatisticsTable: FC<{
  statistics: ReviewerStatistic[]
}> = ({ statistics }) => {
  const table = useReactTable({
    data: statistics,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
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
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => {
          return (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </tfoot>
    </table>
  )
}
