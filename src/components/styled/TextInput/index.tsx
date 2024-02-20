import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../styles';
import React, { ChangeEvent, useState } from 'react';
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
  value: string;
  css?: { [key in string]: string | number | boolean };
}

export interface InputBoxProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'password';
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
                        ? theme.primary950
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
                        ? theme.primary950
                        : theme.gray300
                }
              />
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
