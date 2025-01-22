import React, { useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { StyledBox } from '../../../../styled/styles';
import { useTheme } from 'styled-components';
import FilterIcon from '../../../../../assets/icons/FilterIcon';
import { Check } from '@mui/icons-material';

export interface FilterGroupsProps {
  id: string;
  options: string[];
  selected: string | string[] | null;
  onSelect: (option: string) => void;
  open: boolean;
  onToggle: () => void;
}

const FilterGroups = ({ id, options, selected, onSelect, open, onToggle }: FilterGroupsProps) => {
  const theme = useTheme();

  const isSelected = (option: string) => {
    if (Array.isArray(selected)) {
      return selected.includes(option);
    }
    return selected === option;
  };

  return (
    <StyledBox>
      <IconButton
        aria-label={`filter-${id}`}
        onClick={(event) => {
          event.stopPropagation();
          onToggle(); // Maneja el toggle desde el padre
        }}
      >
        <FilterIcon color={theme.primary500} selected={open} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={document.querySelector(`[aria-label="filter-${id}"]`)}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8], // Desplaza el menú 8px debajo del botón
            },
          },
        ]}
      >
        <Paper>
          <MenuList dense>
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => {
                  onSelect(option);
                }}
              >
                {isSelected(option) && (
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                )}
                <ListItemText inset>{option}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </StyledBox>
  );
};

export default FilterGroups;
