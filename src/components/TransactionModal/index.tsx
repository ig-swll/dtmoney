import { zodResolver } from '@hookform/resolvers/zod'
import { Portal, Title } from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, Spinner, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function TransactionModal() {
  const addTransaction = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.addTransaction,
  )

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data

    addTransaction({ category, description, price, type })

    reset()
  }

  return (
    <Portal>
      <Overlay />

      <Content>
        <Title>Nova transação</Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <TransactionType onValueChange={onChange} value={value}>
                <TransactionTypeButton type="button" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton type="button" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner size={22} />}
            Cadastrar
          </button>
        </form>
      </Content>
    </Portal>
  )
}
