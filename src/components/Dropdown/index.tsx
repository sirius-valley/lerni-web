import React, { useEffect, useRef } from 'react';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { DownArrowIcon } from '../../assets/icons/DownArrowIcon';
import { UpArrowIcon } from '../../assets/icons/UpArrowIcon';
import { StyledColumn, StyledRow, StyledText } from '../styled/styles';

export interface DropdownProps {
  css?: any;
  content: string[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

export const Dropdown = ({
  css,
  label,
  required = true,
  placeholder,
  onChange,
  value,
  content,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rowWidth, setRowWidth] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleDropdownStatus = () => {
    setIsOpen(!isOpen);
  };

  const handleIcon = () => {
    if (isOpen) {
      return <UpArrowIcon size={20} />;
    } else {
      return <DownArrowIcon size={20} />;
    }
  };

  const getMenuBackground = (index: number): string => {
    return index % 2 === 0 ? theme.gray100 : theme.white;
  };

  useEffect(() => {
    if (rowRef.current) {
      setRowWidth(rowRef.current.offsetWidth);
    }
  }, [isOpen]);

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
      <StyledRow
        css={{
          border: `1px solid ${theme.gray200}`,
          borderRadius: '8px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.white,
        }}
        ref={rowRef}
      >
        <FormControl
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 16px',
          }}
        >
          {!value && (
            <InputLabel
              style={{ width: '100%', color: theme.gray300, position: 'absolute', top: -3 }}
              shrink={false}
            >
              {placeholder}
            </InputLabel>
          )}
          <Select
            placeholder={placeholder}
            title={placeholder}
            id="demo-simple-select"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onOpen={handleDropdownStatus}
            onClose={handleDropdownStatus}
            IconComponent={handleIcon}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: theme.white,
              border: `none`,
              ...css,
            }}
            MenuProps={{
              MenuListProps: {
                disablePadding: true,
              },
              PaperProps: {
                style: {
                  maxHeight: 300,
                  marginTop: 7,
                  width: rowWidth ?? '100%',
                  backgroundColor: theme.white,
                },
              },
            }}
            margin="none"
            sx={{
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: `none`,
              },
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '& .MuiSelect-select': {
                padding: '0px',
              },
              '& .MuiMenu-list': {
                padding: '0px',
              },
            }}
          >
            {content.map((option, idx) => (
              <MenuItem
                key={idx}
                value={option}
                style={{
                  backgroundColor: getMenuBackground(idx),
                  gap: '8px',
                  padding: '12px 16px',
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledRow>
    </StyledColumn>
  );
};
