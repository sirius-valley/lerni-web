import React from 'react';
import { StyledBox } from '../../../../../styled/styles';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setModalOpen } from '../../../../../../redux/slices/utils.slice';
import { useLDispatch } from '../../../../../../redux/hooks';
import { StudentDTO } from '../../../../../../redux/service/types/students.response';

interface ActionsProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  programVersionId: string;
  expandedGroups: { [key: string]: boolean };
  onExpand: (id: string) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onMenuClick: (action: 'view' | 'delete' | 'edit', student: StudentDTO) => void;
  student: StudentDTO;
}

const Actions = ({
  open,
  anchorEl,
  programVersionId,
  expandedGroups,
  onExpand,
  onClick,
  onClose,
  onMenuClick,
  student,
}: ActionsProps) => {
  const dispatch = useLDispatch();

  return (
    <StyledBox style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
      <IconButton
        aria-label="more"
        onClick={(event) => {
          event.stopPropagation();
          onClick(event);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          onClose();
        }}
      >
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            onMenuClick('view', student);
            onClose();
          }}
        >
          Ver
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            onMenuClick('edit', student);
            onClose();
          }}
        >
          Editar grupos
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            onExpand(student.id);
            onClose();
          }}
        >
          {expandedGroups[student.id] ? 'Colapsar' : 'Expandir'} grupos
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            onMenuClick('delete', student);
            onClose();
          }}
        >
          Eliminar
        </MenuItem>
      </Menu>
    </StyledBox>
  );
};

export default Actions;
