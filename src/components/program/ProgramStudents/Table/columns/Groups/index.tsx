import { Chip } from '@mui/material';
import { StyledRow } from '../../../../../styled/styles';
import { Tooltip } from 'react-tooltip';
import React, { useCallback } from 'react';
import { useTheme } from 'styled-components';

interface GroupsProps {
  studentId: string;
  groups: { name: string }[];
  maxGroups: number;
  visibleGroups: { name: string }[];
  extraGroups: number;
  expanded: boolean;
  onExpand: (id: string) => void;
}

const Groups = React.memo(
  ({
    studentId,
    groups,
    maxGroups,
    visibleGroups,
    extraGroups,
    expanded,
    onExpand,
  }: GroupsProps) => {
    const theme = useTheme();

    // Memorizar la función de expansión para evitar renders innecesarios
    const handleExpand = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        onExpand(studentId);
      },
      [studentId, onExpand],
    );

    return (
      <StyledRow style={{ alignItems: 'center' }}>
        {/* Mostrar solo los grupos visibles */}
        {visibleGroups.map((group, index) => (
          <Chip key={index} label={group.name} style={{ margin: '2px', fontSize: '12px' }} />
        ))}

        {/* Botón para expandir más grupos */}
        {extraGroups > 0 && !expanded && (
          <Chip
            style={{ cursor: 'pointer' }}
            onClick={handleExpand}
            label={`+${extraGroups}`}
            data-tooltip-id={'table-tooltip'}
            data-tooltip-content={groups
              .slice(maxGroups)
              .map((group) => group.name)
              .join(', ')}
          />
        )}

        {/* Mostrar los grupos adicionales solo si está expandido */}
        {expanded &&
          groups.slice(maxGroups).map((group, index) => (
            <StyledRow key={index} style={{ margin: '0 4px' }}>
              <Chip label={group.name} style={{ fontSize: '12px' }} />
            </StyledRow>
          ))}
      </StyledRow>
    );
  },
);

export default Groups;
