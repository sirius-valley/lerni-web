import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../styled/styles';
import { useTheme } from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ShowIcon } from '../../../../assets/icons/ShowIcon';
import TrashIcon from '../../../../assets/icons/TrashIcon';

interface PillRowProps {
  handleShowQuestionnaire: (id: string) => void;
  handleRemove: (id: string) => void;
  title: string;
  id: string;
  index: number;
  edit: boolean;
}

const PillRow = ({
  handleShowQuestionnaire,
  handleRemove,
  title,
  id,
  index,
  edit,
}: PillRowProps) => {
  const theme = useTheme();
  return (
    <StyledRow
      key={index}
      css={{
        justifyContent: 'space-between',
        padding: '8px 0px 4px 0px',
        marginLeft: '6px',
        borderBottom: `1px solid ${theme.gray200}`,
      }}
    >
      <StyledRow
        style={{
          gap: '6px',
          alignItems: 'center',
        }}
      >
        <StyledBox
          css={{
            height: '24px',
            width: '24px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgressbar
            styles={{
              root: {
                display: 'flex',
              },
              path: {
                stroke: '#18BAC8', // check with ceci
                strokeLinecap: 'butt',
                transition: 'none',
              },
              trail: {
                stroke: '#D3DDEB',
                strokeLinecap: 'butt',
              },
              text: {
                fontFamily: 'Roboto-bold',
                fill: '#000000',
                fontSize: '60px',
                fontWeight: 600,
              },
            }}
            maxValue={1}
            strokeWidth={12}
            value={0}
            text={String(index + 1)}
          />
        </StyledBox>
        <StyledText
          variant="h4"
          css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {title}
        </StyledText>
      </StyledRow>
      <StyledRow
        css={{
          padding: '8px',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <StyledColumn
          onClick={() => handleShowQuestionnaire(id)}
          css={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <ShowIcon size={20} color={theme.gray400} />
        </StyledColumn>
        {edit && (
          <StyledColumn
            onClick={() => handleRemove(id)}
            css={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <TrashIcon size={20} color={theme.gray400} />
          </StyledColumn>
        )}
      </StyledRow>
    </StyledRow>
  );
};

export default PillRow;
