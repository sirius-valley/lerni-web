import { Chip } from '@mui/material';
import { StyledRow } from '../../../../../styled/styles';
import { Tooltip } from 'react-tooltip';
import React from 'react';
import { useTheme } from 'styled-components';

interface GroupsProps {
  studentId: string;
  groups: { name: string }[];
  maxGroups: number;
  visibleGroups: { name: string }[];
  extraGroups: number;
  expandedGroups: { [key: string]: boolean };
  onExpand: (id: string) => void;
}

const Groups = ({
  studentId,
  groups,
  maxGroups,
  visibleGroups,
  extraGroups,
  expandedGroups,
  onExpand,
}: GroupsProps) => {
  const theme = useTheme();
  return (
    <StyledRow style={{ alignItems: 'center' }}>
      {visibleGroups.map((group, index) => (
        <Chip key={index} label={group.name} style={{ margin: '2px', fontSize: '12px' }} />
      ))}
      {extraGroups > 0 && !expandedGroups[studentId] && (
        <Chip
          style={{
            cursor: 'pointer',
          }}
          onClick={(event) => {
            event.stopPropagation();
            onExpand(studentId);
          }}
          label={`+${extraGroups}`}
          data-tooltip-id={'groups-tooltip'}
          data-tooltip-content={groups
            .slice(maxGroups)
            .map((group) => group.name)
            .join(', ')}
        />
      )}
      {expandedGroups[studentId] &&
        groups.slice(maxGroups).map((group, index) => (
          <StyledRow key={index} style={{ margin: '0 4px' }}>
            <Chip label={group.name} style={{ fontSize: '12px' }} />
          </StyledRow>
        ))}
      <Tooltip
        id="groups-tooltip"
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          backgroundColor: theme.gray600,
          color: 'white',
          fontSize: 14,
          fontFamily: 'Roboto',
        }}
        place="top"
      />
    </StyledRow>
  );
};

export default Groups;
