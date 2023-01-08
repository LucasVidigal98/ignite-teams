import { TouchableOpacityProps } from "react-native";
import { ButtonInconTypeStyleProps, Conatiner, Icon } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  type?: ButtonInconTypeStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({ type = 'PRIMARY', icon, ...rest }: Props) {
  return (
    <Conatiner {...rest} >
      <Icon name={icon} type={type} />
    </Conatiner>
  );
}