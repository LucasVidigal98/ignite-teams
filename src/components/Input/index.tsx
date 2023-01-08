import { TextInput, TextInputProps } from "react-native";
import { Conatiner } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Conatiner
      ref={inputRef}
      placeholderTextColor={theme.COLORS.GRAY_300}
      {...rest}
    />
  );
}