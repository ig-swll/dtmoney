import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

import { useSummary } from '../../hooks/useSummary'
import { defaultTheme } from '../../styles/themes/default'
import { formatCurrency } from '../../utils/formatCurrency'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={defaultTheme['green-300']} />
        </header>
        <strong>{formatCurrency(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={defaultTheme['red-300']} />
        </header>
        <strong>{formatCurrency(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={defaultTheme.white} />
        </header>
        <strong>{formatCurrency(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
