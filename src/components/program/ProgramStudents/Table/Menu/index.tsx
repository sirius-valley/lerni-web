import React, { useCallback, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

interface TableMenuProps {
  onClick: (action: 'view' | 'delete' | 'edit') => void;
  onClose: () => void;
  menuAnchor: HTMLElement | null;
}

const TableMenu = ({ onClick, onClose, menuAnchor }: TableMenuProps) => {
  return (
    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={onClose}>
      <MenuItem
        onClick={() => {
          onClick('view');
          onClose();
        }}
      >
        Ver
      </MenuItem>
      <MenuItem
        onClick={() => {
          onClick('edit');
          onClose();
        }}
      >
        Editar grupos
      </MenuItem>
      <MenuItem
        onClick={() => {
          onClick('delete');
          onClose();
        }}
      >
        Eliminar
      </MenuItem>
    </Menu>
  );
};

export default TableMenu;
