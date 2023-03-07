import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (queryParams?: { [key: string]: string }) => void
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(queryParams?: { [key: string]: string }) {
    console.log(queryParams)
    const data = await api.get<Transaction[]>('transactions', {
      queryParams: queryParams ?? undefined,
    })
    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {props.children}
    </TransactionsContext.Provider>
  )
}
