import styled, { keyframes } from 'styled-components'

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

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
    padding: 1rem;
    min-width: 0;

    &::placeholder {
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${({ theme }) => theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: transparent;
    border: 1px solid ${({ theme }) => theme['green-300']};
    color: ${({ theme }) => theme['green-300']};
    cursor: pointer;
    font-weight: bold;
    border-radius: 6px;
    padding: 1rem;
    transition: background-color 0.15s ease-in, border-color 0.15s ease-in,
      color 0.15s ease-in;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme['green-500']};
      border-color: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
    }

    &:disabled {
      opacity: 0.7;
      cursor: progress;
      svg {
        animation: ${LoadingSpin} 1.1s linear infinite,
          ${LoadingOpacity} 1s infinite;
      }
    }

    @media screen and (max-width: 425px) {
      span {
        display: none;
      }
    }
  }
`
