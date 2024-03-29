import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.transactions,
  )

  const summary = useMemo(
    () =>
      transactions.reduce(
        (acc, curr) => {
          if (curr.type === 'income') {
            acc.income += curr.price
            acc.total += curr.price
          } else {
            acc.outcome += curr.price
            acc.total -= curr.price
          }

          return acc
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      ),
    [transactions],
  )

  return summary
}
