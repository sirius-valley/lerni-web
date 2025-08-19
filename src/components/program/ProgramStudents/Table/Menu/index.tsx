import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useIsAdmin } from '../../../../../hooks/useIsAdmin';
import { EntityType } from '../../../../../utils/permissions';

interface TableMenuProps {
  onClick: (action: 'view' | 'delete' | 'edit' | 'reset') => void;
  onClose: () => void;
  menuAnchor: HTMLElement | null;
  canEdit?: boolean;
  entityType?: EntityType;
}

const TableMenu = ({
  onClick,
  onClose,
  menuAnchor,
  canEdit = false,
  entityType,
}: TableMenuProps) => {
  const { isAdmin } = useIsAdmin();

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
      {canEdit &&
        isAdmin && [
          <MenuItem
            key={'edit'}
            onClick={() => {
              onClick('edit');
              onClose();
            }}
          >
            Editar grupos
          </MenuItem>,
          entityType === EntityType.PROGRAM && (
            <MenuItem
              key={'reset'}
              onClick={() => {
                onClick('reset');
                onClose();
              }}
            >
              Resetear progreso
            </MenuItem>
          ),
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
