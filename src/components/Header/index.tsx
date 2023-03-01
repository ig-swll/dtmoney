import logoSrc from '../../assets/logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoSrc} alt="" />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
