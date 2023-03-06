import { TagSimple } from 'phosphor-react'
import { useContext } from 'react'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { formatCurrency } from '../../utils/formatCurrency'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { formatDate } from '../../utils/formatDate'

export function Transactions() {
  const { transactions } = useContext(TransactionsContext)

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
                    {item.type === 'outcome' && '- '}
                    {formatCurrency(item.price)}
                  </PriceHighlight>
                </td>
                <td>
                  <TagSimple size={16} /> {item.category}
                </td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
