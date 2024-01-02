import React, { useMemo } from 'react';
import { ButtonSizeEnum, ButtonState, StyledButton } from './styles';
import { useTheme } from 'styled-components';
import { ComponentVariantType } from '../../../utils/constants';
// import { DefaultTheme, useTheme } from "rn-css"
// import HomeIcon from "../../assets/icons/HomeIcon";

const ButtonSizeText: { [key in ButtonSizeEnum]: string } = {
  [ButtonSizeEnum.SMALL]: 'buttonSmall',
  [ButtonSizeEnum.MEDIUM]: 'buttonStandard',
  [ButtonSizeEnum.LARGE]: 'buttonLarge',
};

const ButtonSizeIcon: { [key in ButtonSizeEnum]: number } = {
  [ButtonSizeEnum.SMALL]: 20,
  [ButtonSizeEnum.MEDIUM]: 24,
  [ButtonSizeEnum.LARGE]: 28,
};

export interface ButtonProps {
  onClick: () => void;
  title: string;
  icon?: (arg: any) => JSX.Element;
  variant?: ComponentVariantType;
  size?: ButtonSizeEnum;
  disabled?: boolean;
  css?: { [key in string]: string | number | boolean };
}
const Button = ({
  onClick,
  title = '',
  variant = ComponentVariantType.PRIMARY,
  size = ButtonSizeEnum.MEDIUM,
  disabled = false,
  icon,
  css,
}: ButtonProps) => {
  const theme = useTheme();
  const isDisabled = useMemo(
    () => (disabled ? ButtonState.DISABLED : ButtonState.DEFAULT),
    [disabled],
  );
  return (
    <StyledButton
      type={variant}
      state={isDisabled}
      disabled={disabled}
      onClick={() => (disabled ? undefined : onClick())}
      css={css}
    >
      {icon &&
        icon({
          // color: getIconColor(theme)[variant][isDisabled],
          size: ButtonSizeIcon[size],
        })}
      {title}
    </StyledButton>
  );
};

export default Button;
