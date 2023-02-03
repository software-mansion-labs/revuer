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
    cell(info) {
      return <Text value={info.getValue()} />
    },
  }),
  columnHelper.accessor('reviewsCount', {
    cell(info) {
      return <Text value={info.getValue().toString()} />
    },
  }),
  columnHelper.accessor('requestingChangesProbability', {
    cell(info) {
      return <Text value={info.getValue().toString()} />
    },
  }),
  columnHelper.accessor('notApprovingProbability', {
    cell(info) {
      return <Text value={info.getValue().toString()} />
    },
  }),
  columnHelper.accessor('medianReviewedPRSizeInLOC', {
    cell(info) {
      return <Text value={info.getValue().toString()} />
    },
  }),
  columnHelper.accessor('averageCommentsInReviewCount', {
    cell(info) {
      return <Text value={info.getValue().toString()} />
    },
  }),
  columnHelper.accessor('averageTotalReviewedPRCommentsCount', {
    cell(info) {
      return <Text value={info.getValue().toString()} />
    },
  }),
]

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
