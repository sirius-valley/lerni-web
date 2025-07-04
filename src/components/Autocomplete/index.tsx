import React, { useEffect, useState } from 'react';
import { FormControl, Autocomplete } from '@mui/material';
import { StyledColumn, StyledRow, StyledText } from '../styled/styles';
import { DownArrowIcon } from '../../assets/icons/DownArrowIcon';
import { UpArrowIcon } from '../../assets/icons/UpArrowIcon';
import { StyledTextField } from './style';

export type Option = { id: string; text: string };

export interface AutocompleteProps {
  css?: any;
  content: Option[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: Option | Option[] | null;
  multiple?: boolean;
  onChange?: (value: string) => void;
  setMultipleValues?: (values: Option[]) => void;
  allowNewOptions?: boolean;
  disabled?: boolean;
  limitTags?: number;
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
  allowNewOptions = false,
  disabled = false,
  limitTags = -1,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto

  useEffect(() => {
    console.log('autocomplete', value);
  }, [value]);

  const handleSelect = (value: string | Option | (string | Option)[] | null) => {
    console.log(value);
    if (!value) {
      onChange && onChange('');
      setMultipleValues && setMultipleValues([]);
      return;
    }

    if (multiple && Array.isArray(value)) {
      const options = value.map((val) => handleValue(val));
      setMultipleValues && setMultipleValues(options);
      onChange && onChange(options[options.length - 1]?.id);
    } else if (!Array.isArray(value)) {
      const option = handleValue(value);
      onChange && onChange(option ? option.id : `new-${value}-${Date.now()}`);
    }
  };

  const handleGetOption = (value: string | Option) => {
    const option = handleValue(value);
    return option.text;
  };

  const handleValue = (value: string | Option) => {
    if (typeof value === 'string') {
      const option = content.find((opt) => opt.text === value);
      if (option) return option;
      return { id: `new-${value}-${Date.now()}`, text: value };
    }
    return value;
  };

  const handleIcon = () => (isOpen ? <UpArrowIcon size={20} /> : <DownArrowIcon size={20} />);

  return (
    <StyledColumn css={{ minWidth: '120px', gap: '8px' }}>
      {label && (
        <StyledRow css={{ gap: '4px' }}>
          <StyledText variant="body2" color={disabled ? 'gray400' : 'gray950'}>
            {label}
          </StyledText>
          {required && (
            <StyledText variant="body2" color={disabled ? 'gray200' : 'error500'}>
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
          disabled={disabled}
          autoComplete
          multiple={multiple}
          freeSolo={allowNewOptions}
          limitTags={limitTags}
          id="multiple-limit-tags"
          options={content}
          value={value}
          getOptionLabel={handleGetOption}
          getOptionKey={(option) =>
            typeof option === 'string' ? `new-${option}-${Date.now()}` : option.id
          }
          fullWidth
          onClick={() => setIsOpen(!isOpen)}
          popupIcon={handleIcon()}
          renderInput={(params) => (
            <StyledTextField {...params} placeholder={placeholder} variant="outlined" />
          )}
          onChange={(event, value) => handleSelect(value)}
          componentsProps={{
            popper: {
              sx: {
                '& .MuiAutocomplete-listbox': {
                  fontSize: '14px',
                },
              },
            },
          }}
        />
      </FormControl>
    </StyledColumn>
  );
};
