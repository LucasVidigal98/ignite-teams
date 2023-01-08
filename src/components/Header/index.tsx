import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Conatiner, Logo } from "./styles";

import logoImg from '@assets/logo.png';

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleGoHome() {
    navigation.navigate('groups');
  }

  return (
    <Conatiner>
      {showBackButton &&
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Conatiner>
  )
}