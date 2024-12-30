import React, { useState, useRef, useEffect } from 'react';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useTheme } from 'styled-components';
import { DownArrowIcon } from '../../assets/icons/DownArrowIcon';
import { UpArrowIcon } from '../../assets/icons/UpArrowIcon';
import { StyledColumn, StyledRow, StyledText } from '../styled/styles';
import { TextInput } from '../styled/TextInput';

export interface AutocompleteProps {
  css?: any;
  content: { id: string; text: string }[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

export const Autocomplete = ({
  css,
  label,
  required = true,
  placeholder,
  onChange,
  value,
  content,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [filteredContent, setFilteredContent] = useState(content);
  const theme = useTheme();

  const handleChange = (value: string) => {
    setIsSelected(false);
    setInputValue(value);
    checkIfValidValue(value);
  };

  const checkIfValidValue = (value: string) => {
    if (!content.map((option) => option.text).includes(value)) {
      setIsError(true);
      onChange('');
    } else setIsError(false);
  };

  const getMenuBackground = (index: number): string => {
    return index % 2 === 0 ? theme.gray100 : theme.white;
  };

  useEffect(() => {
    setFilteredContent(
      content.filter((option) => option.text.toLowerCase().includes(inputValue.toLowerCase())),
    );
    if (inputValue !== '' && !isSelected) setIsOpen(true);
    else setIsOpen(false);
  }, [inputValue, content]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredContent.length > 0) {
        const firstOption = filteredContent[0];
        setInputValue(firstOption.text);
        onChange(firstOption.id);
        setIsOpen(false);
        setIsSelected(true);
        checkIfValidValue(firstOption.text);
      }
    }
  };

  return (
    <StyledColumn css={{ minWidth: '120px', gap: '8px' }}>
      <FormControl
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
        onKeyDown={handleKeyDown}
      >
        <TextInput
          title={label}
          required={required}
          placeholder={placeholder}
          value={inputValue}
          onChange={(value) => handleChange(value)}
          error={isError}
        />
        {isOpen && filteredContent.length > 0 && (
          <StyledColumn
            css={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: theme.white,
              border: `1px solid ${theme.gray200}`,
              borderRadius: '8px',
              zIndex: 10,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {filteredContent.map((option, idx) => (
              <MenuItem
                key={idx}
                value={option.id}
                style={{
                  backgroundColor: getMenuBackground(idx),
                  gap: '8px',
                  padding: '12px 16px',
                  ...css,
                }}
                onClick={() => {
                  setIsSelected(true);
                  setInputValue(option.text);
                  onChange(option.id);
                  setIsOpen(false);
                }}
              >
                {option.text}
              </MenuItem>
            ))}
          </StyledColumn>
        )}
      </FormControl>
    </StyledColumn>
  );
};
