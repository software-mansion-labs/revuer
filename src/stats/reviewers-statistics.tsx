import { FC } from 'react'
import { ReviewerStatistic } from './code-review-stats-use-case'

export const ReviewersStatisticsTable: FC<{
  statistics: ReviewerStatistic[]
}> = ({ statistics }) => {
  return <div>{JSON.stringify(statistics, undefined, 4)}</div>
}
