import React from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyledBox } from '../../../../../styled/styles';
import { StudentDTO } from '../../../../../../redux/service/types/students.response';

interface ActionsProps {
  student: StudentDTO;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, student: StudentDTO) => void;
}

const Actions = React.memo(({ student, onMenuOpen }: ActionsProps) => {
  return (
    <StyledBox style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
      <IconButton
        aria-label="more"
        onClick={(event) => {
          event.stopPropagation();
          onMenuOpen(event, student);
        }}
      >
        <MoreVertIcon />
      </IconButton>
    </StyledBox>
  );
});

export default Actions;
