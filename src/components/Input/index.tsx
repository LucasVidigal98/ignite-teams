import { TextInputProps } from "react-native";
import { Conatiner } from "./styles";
import { useTheme } from "styled-components/native";

export function Input({ ...rest }: TextInputProps) {
  const theme = useTheme();

  return (
    <Conatiner
      placeholderTextColor={theme.COLORS.GRAY_300}
      {...rest}
    />
  );
}