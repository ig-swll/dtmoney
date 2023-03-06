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
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const data = await api.get<Transaction[]>('transactions')
    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {props.children}
    </TransactionsContext.Provider>
  )
}
