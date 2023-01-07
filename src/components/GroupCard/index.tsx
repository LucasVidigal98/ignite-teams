import { TouchableOpacityProps } from "react-native";
import { Conatiner, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Conatiner {...rest}>
      <Icon />

      <Title>{title}</Title>
    </Conatiner>
  );
}