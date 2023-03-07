import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styled, { keyframes } from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;

  background: #00000075;
  backdrop-filter: blur(0.25rem);
`

const LoadingSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const LoadingOpacity = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      background: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;
      transition: background-color 0.1s;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background: ${({ theme }) => theme['green-700']};
      }

      &:disabled {
        opacity: 0.7;
        cursor: progress;
        svg {
          animation: ${LoadingSpin} 1.1s linear infinite,
            ${LoadingOpacity} 1s infinite;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    min-width: calc(100% - 1rem);
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  aspect-ratio: 1/1;
  cursor: pointer;
  line-height: 0;
  color: ${({ theme }) => theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`

interface TransactionTypeButtonProps {
  value: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${({ theme }) => theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${({ theme }) => theme['gray-300']};

  svg {
    color: ${({ value, theme }) =>
      value === 'income' ? theme['green-300'] : theme['red-300']};
  }

  &[data-state='unchecked'] {
    &:hover {
      background: ${({ theme }) => theme['gray-600']};
    }
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.white};
    background: ${({ theme, value }) =>
      theme[value === 'income' ? 'green-500' : 'red-500']};

    svg {
      color: ${({ theme }) => theme.white};
    }
  }
`
