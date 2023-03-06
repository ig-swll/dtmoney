import { TagSimple } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { api } from '../../services/api'
import { formatCurrency } from '../../utils/formatCurrency'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const data = await api.get<Transaction[]>('transactions')
    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <div>
      <Header />

      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>
                  <PriceHighlight variant={item.type}>
                    {formatCurrency(item.price)}
                  </PriceHighlight>
                </td>
                <td>
                  <TagSimple size={16} /> Alimentação
                </td>
                <td>13/04/2022</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
