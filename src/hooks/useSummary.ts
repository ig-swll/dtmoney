import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
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
  )

  return summary
}
