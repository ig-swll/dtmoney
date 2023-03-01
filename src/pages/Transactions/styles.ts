import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  /* margin-top: 1.5rem; */

  td {
    background: ${({ theme }) => theme['gray-700']};
    padding: 1.25rem 2rem;
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      width: calc(50% -1px);
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    svg {
      display: none;
    }

    &:first-of-type {
      width: 50%;
    }
  }

  @media screen and (max-width: 768px) {
    tr {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      border-radius: 6px;
    }
    td {
      padding: 1.25rem 1.5rem;
      &:first-of-type {
        width: 100%;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
        padding-bottom: 0;
      }
      &:nth-of-type(2) {
        width: 100%;
        padding-top: 0;
      }
      &:nth-of-type(3) {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        width: 50%;
        border-bottom-left-radius: 6px;
        padding-top: 0;
        vertical-align: middle;
        color: ${({ theme }) => theme['gray-500']};

        svg {
          display: inline;
        }
      }
      &:last-of-type {
        width: 50%;
        text-align: right;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 6px;
        padding-top: 0;
        color: ${({ theme }) => theme['gray-500']};
      }
    }
  }
`
interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`
