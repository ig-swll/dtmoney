import * as Dialog from '@radix-ui/react-dialog'

import logoSrc from '../../assets/logo.svg'
import { TransactionModal } from '../TransactionModal'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoSrc} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <TransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
