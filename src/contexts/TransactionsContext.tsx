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
    const response = await api.get<Transaction[]>('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        ...queryParams,
      },
    })

    setTransactions(response.data)
  }

  async function addTransaction(data: Omit<Transaction, 'createdAt' | 'id'>) {
    await api.post('/transactions', {
      ...data,
      createdAt: new Date().toISOString(),
    })
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
