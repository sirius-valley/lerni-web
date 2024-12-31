import React, { useState, useEffect } from 'react';
import { Chip, FormControl, MenuItem, Tooltip } from '@mui/material';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow } from '../styled/styles';
import { TextInput } from '../styled/TextInput';
import { DownArrowIcon } from '../../assets/icons/DownArrowIcon';
import { UpArrowIcon } from '../../assets/icons/UpArrowIcon';

export interface AutocompleteProps {
  css?: any;
  content: { id: string; text: string }[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  multiple?: boolean;
  onChange: (value: string) => void;
  setMultipleValues?: (values: string[]) => void;
}

export const Autocomplete = ({
  css,
  label,
  required = true,
  placeholder,
  onChange,
  value,
  content,
  multiple = false,
  setMultipleValues,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [filteredContent, setFilteredContent] = useState(content);
  const [selectedValues, setSelectedValues] = useState<{ id: string; text: string }[]>([]);
  const theme = useTheme();

  const maxVisibleChips = 2;
  const visibleChips = selectedValues.slice(0, maxVisibleChips);
  const hiddenChips = selectedValues.slice(maxVisibleChips);

  const handleChange = (value: string) => {
    setIsSelected(false);
    setInputValue(value);
    checkIfValidValue(value);
  };

  const checkIfValidValue = (value: string) => {
    const matchingOption = content.find((option) => option.text === value);
    if (matchingOption) {
      handleSelect(matchingOption);
    } else {
      setIsError(true);
      onChange('');
    }
  };

  const getMenuBackground = (index: number): string => {
    return index % 2 === 0 ? theme.gray100 : theme.white;
  };

  const handleSelect = (option: { id: string; text: string }) => {
    if (multiple) {
      if (!selectedValues.some((item) => item.id === option.id)) {
        const updatedValues = [...selectedValues, option];
        setSelectedValues(updatedValues);
        setMultipleValues?.(updatedValues.map((item) => item.id));
      }
      setInputValue('');
    } else {
      setInputValue(option.text);
    }
    onChange(option.id);
    setIsOpen(false);
    setIsSelected(true);
    setIsError(false);
  };

  const handleIcon = () => (isOpen ? <UpArrowIcon size={20} /> : <DownArrowIcon size={20} />);

  useEffect(() => {
    setFilteredContent(
      content.filter((option) => option.text.toLowerCase().includes(inputValue.toLowerCase())),
    );
    if (inputValue !== '' && (!isSelected || multiple)) setIsOpen(true);
    else setIsOpen(false);
  }, [inputValue, content]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredContent.length > 0) {
        const firstOption = filteredContent[0];
        handleSelect(firstOption);
      }
    }
  };

  const handleDelete = (option: { id: string; text: string }) => {
    const newValues = selectedValues.filter((item) => item.id !== option.id);
    setSelectedValues(newValues);
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
          onFocus={() => setIsOpen(true)}
          css={{
            border: isError ? `1px solid ${theme.error500}` : `1px solid ${theme.gray200}`,
            borderRadius: '8px',
          }}
          preText={
            multiple &&
            selectedValues.length > 0 && (
              <StyledRow css={{ gap: '8px', flexWrap: 'nowrap', overflow: 'hidden' }}>
                {visibleChips.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.text}
                    onDelete={() => handleDelete(option)}
                    style={{ backgroundColor: theme.gray200 }}
                  />
                ))}
                {hiddenChips.length > 0 && (
                  <Tooltip title={hiddenChips.map((chip) => chip.text).join(', ')} arrow>
                    <Chip
                      label={`+${hiddenChips.length}`}
                      style={{ backgroundColor: theme.gray300, cursor: 'pointer' }}
                    />
                  </Tooltip>
                )}
              </StyledRow>
            )
          }
          postText={
            <StyledBox
              onClick={() => setIsOpen(!isOpen)}
              css={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {handleIcon()}
            </StyledBox>
          }
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
                onClick={() => handleSelect(option)}
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
