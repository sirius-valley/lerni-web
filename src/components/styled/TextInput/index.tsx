import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StyledColumn, StyledRow, StyledText } from '../styles';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { StyledInput, StyledTextArea, StyledTextInputBox } from './styles';
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
  multiline?: boolean;
  maxLength?: number;
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
  multiline = false,
  maxLength = 400,
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
        width: '100%',
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
        {multiline ? (
          <StyledTextArea
            onChange={(event) => onChange(event.target.value)}
            value={value}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        ) : (
          <StyledInput
            onChange={(event) => onChange(event.target.value)}
            value={value}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        )}
        <StyledRow
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            height: '100%',
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
        </StyledRow>
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
