import React, { useMemo } from 'react';
import { ButtonLabelSize, ButtonState, StyledButton } from './styles';
import { ThemeFonts, theme } from '../../utils/theme';
import Spinner from '../../components/Spinner/Spinner';
import { ComponentVariantType } from '../../utils/constants';

export interface ButtonProps {
  onClick: () => void;
  children: string;
  labelSize?: keyof ThemeFonts;
  icon?: (arg: any) => JSX.Element;
  variant?: ComponentVariantType;
  disabled?: boolean;
  loading?: boolean;
  css?: { [key in string]: string | number | boolean };
}
const Button = ({
  onClick,
  children,
  labelSize = 'body1',
  variant = ComponentVariantType.PRIMARY,
  disabled = false,
  loading = false,
  icon,
  css,
}: ButtonProps) => {
  const isDisabled = useMemo(
    () => (disabled ? ButtonState.DISABLED : ButtonState.DEFAULT),
    [disabled],
  );

  const renderLabel = () => {
    if (loading) return <Spinner variant={variant} size={24} />;
    return children;
  };

  return (
    <StyledButton
      type={variant}
      state={isDisabled}
      disabled={disabled}
      onClick={() => (disabled || loading ? undefined : onClick())}
      css={{
        ...theme[labelSize],
        ...css,
      }}
    >
      {icon &&
        !loading &&
        icon({
          color: '#eee',
          size: 18,
        })}
      {renderLabel()}
    </StyledButton>
  );
};

export default Button;
