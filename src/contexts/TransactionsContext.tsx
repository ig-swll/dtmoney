import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
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
  fetchTransactions: (queryParams?: { [key: string]: string }) => Promise<void>
  addTransaction: (data: Omit<Transaction, 'createdAt' | 'id'>) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async (queryParams?: { [key: string]: string }) => {
      const response = await api.get<Transaction[]>('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          ...queryParams,
        },
      })

      setTransactions(response.data)
    },
    [],
  )

  const addTransaction = useCallback(
    async (data: Omit<Transaction, 'createdAt' | 'id'>) => {
      const response = await api.post('/transactions', {
        ...data,
        createdAt: new Date().toISOString(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, addTransaction }}
    >
      {props.children}
    </TransactionsContext.Provider>
  )
}
