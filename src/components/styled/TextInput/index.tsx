import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../styles';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { StyledInput, StyledTextInputBox } from './styles';
import { HideIcon } from '../../../assets/icons/HideIcon';
export interface TextInputProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'password';
  error?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  value: string;
  css?: { [key in string]: string | number | boolean };
}
type PasswordType = 'text' | 'password';
export interface InputBoxProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: PasswordType;
  error?: boolean;
  focused?: boolean;
  css?: { [key in string]: string | number | boolean };
}
export const TextInput = ({
  title,
  subtitle,
  placeholder = 'Input Label Text',
  type = 'text',
  disabled = false,
  required = false,
  error = false,
  onChange,
  onBlur,
  value,
  css,
}: TextInputProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(type === 'text');
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
    onBlur && onBlur();
  };
  const getShowIconColor = () => {
    if (error) return theme.red500;
    if (disabled) return theme.gray400;
    return theme.primary950;
  };
  return (
    <StyledColumn
      style={{
        gap: 8,
        justifyContent: 'flex-start',
      }}
    >
      <StyledRow style={{ alignContent: 'center', gap: 4 }}>
        <StyledText variant="body2" style={{ color: disabled ? theme.gray400 : theme.gray950 }}>
          {title}
        </StyledText>
        <StyledText variant="body2" style={{ color: disabled ? theme.gray200 : theme.red500 }}>
          {required || (title && required) ? '*' : ''}
        </StyledText>
      </StyledRow>
      <StyledTextInputBox
        disabled={disabled}
        error={error}
        css={css}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focused={focused}
      >
        <StyledInput
          onChange={(event) => onChange(event.target.value)}
          value={value}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          placeholder={placeholder}
        />
        <StyledBox
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleShowPassword}
        >
          {type === 'password' ? (
            showPassword ? (
              <ShowIcon size={20} color={getShowIconColor()} />
            ) : (
              <HideIcon size={20} color={getShowIconColor()} />
            )
          ) : null}
        </StyledBox>
      </StyledTextInputBox>
      <StyledText
        variant="body3"
        style={{ color: error ? theme.red400 : disabled ? theme.gray300 : theme.primary950 }}
      >
        {subtitle}
      </StyledText>
    </StyledColumn>
  );
};
