import { BackButton, BackIcon, Conatiner, Logo } from "./styles";

import logoImg from '@assets/logo.png';

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  return (
    <Conatiner>
      {showBackButton &&
        <BackButton>
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Conatiner>
  )
}