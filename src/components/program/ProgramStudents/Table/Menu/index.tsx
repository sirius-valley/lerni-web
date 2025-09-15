import React, { useCallback, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useIsAdmin } from '../../../../../hooks/useIsAdmin';

interface TableMenuProps {
  onClick: (action: 'view' | 'delete' | 'edit') => void;
  onClose: () => void;
  menuAnchor: HTMLElement | null;
  canEdit?: boolean;
}

const TableMenu = ({ onClick, onClose, menuAnchor, canEdit = false }: TableMenuProps) => {
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
      {canEdit && [
        <MenuItem
          key={'edit'}
          onClick={() => {
            onClick('edit');
            onClose();
          }}
        >
          Editar grupos
        </MenuItem>,
        <MenuItem
          key={'delete'}
          onClick={() => {
            onClick('delete');
            onClose();
          }}
        >
          Eliminar
        </MenuItem>,
      ]}
    </Menu>
  );
};

export default TableMenu;
