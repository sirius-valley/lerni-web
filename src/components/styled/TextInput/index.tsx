import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../styles';
import React, { ChangeEvent, useState } from 'react';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { StyledInput, StyledTextInput } from './styles';
import { HideIcon } from '../../../assets/icons/HideIcon';

export interface TextInputProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
  error?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
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
  value,
  css,
}: TextInputProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState<'text' | 'password'>('text');

  const handleShowPassword = () => {
    if (showPassword === 'password') {
      setShowPassword('text');
    } else {
      setShowPassword('password');
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <StyledColumn
      style={{
        gap: 8,
        justifyContent: 'flex-start',
        width: 306,
        background: theme.white,
        padding: 8,
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
      <StyledTextInput
        disabled={disabled}
        error={error}
        css={css}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <StyledInput
          onChange={onChange}
          value={value}
          type={type === 'password' ? showPassword : type}
          disabled={disabled}
          placeholder={placeholder}
        />
        <StyledBox
          style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
          onClick={handleShowPassword}
        >
          {type === 'password' ? (
            showPassword === 'password' ? (
              <ShowIcon
                size={20}
                color={
                  error
                    ? theme.red500
                    : disabled
                      ? theme.gray400
                      : focused
                        ? theme.black
                        : theme.gray300
                }
              />
            ) : (
              <HideIcon
                size={20}
                color={
                  error
                    ? theme.red500
                    : disabled
                      ? theme.gray400
                      : focused
                        ? theme.black
                        : theme.gray300
                }
              />
            )
          ) : null}
        </StyledBox>
      </StyledTextInput>
      <StyledText
        variant="body3"
        style={{ color: error ? theme.red400 : disabled ? theme.gray300 : theme.black }}
      >
        {subtitle}
      </StyledText>
    </StyledColumn>
  );
};
