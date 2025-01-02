import React, { useState } from 'react';
import { FormControl, Autocomplete } from '@mui/material';
import { StyledColumn, StyledRow, StyledText } from '../styled/styles';
import { DownArrowIcon } from '../../assets/icons/DownArrowIcon';
import { UpArrowIcon } from '../../assets/icons/UpArrowIcon';
import { StyledTextField } from './style';

type Option = { id: string; text: string };

export interface AutocompleteProps {
  css?: any;
  content: Option[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: Option | Option[] | null | undefined;
  multiple?: boolean;
  onChange: (value: string) => void;
  setMultipleValues?: (values: string[]) => void;
}

export const AutocompleteComponent = ({
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
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto

  const handleSelect = (value: Option | Option[] | null) => {
    if (multiple && Array.isArray(value)) {
      setMultipleValues && setMultipleValues(value.map((v) => v.text));
      onChange(value[value.length - 1]?.id);
    } else if (!Array.isArray(value)) {
      onChange(value ? value.id : '');
    }
  };

  const handleIcon = () => (isOpen ? <UpArrowIcon size={20} /> : <DownArrowIcon size={20} />);

  return (
    <StyledColumn css={{ minWidth: '120px', gap: '8px' }}>
      {label && (
        <StyledRow css={{ gap: '4px' }}>
          <StyledText variant="body2" color="gray950">
            {label}
          </StyledText>
          {required && (
            <StyledText variant="body2" color="error500">
              {' *'}
            </StyledText>
          )}
        </StyledRow>
      )}
      <FormControl
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Autocomplete
          multiple={multiple}
          limitTags={2}
          id="multiple-limit-tags"
          options={content}
          value={value}
          getOptionLabel={(option: Option) => option.text}
          fullWidth
          onClick={() => setIsOpen(!isOpen)}
          popupIcon={handleIcon()}
          renderInput={(params) => (
            <StyledTextField {...params} placeholder={placeholder} variant="outlined" />
          )}
          onChange={(event, value) => handleSelect(value)}
        />
      </FormControl>
    </StyledColumn>
  );
};
