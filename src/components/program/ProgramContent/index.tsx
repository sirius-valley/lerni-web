import React from 'react';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTheme } from 'styled-components';

const ProgramContent = () => {
  const theme = useTheme();
  const emptyPills = false;
  const pills = [
    { name: 'Pildora 1', percentageDone: 0, pillNumber: '1' },
    { name: 'Pildora 2', percentageDone: 0, pillNumber: '2' },
    { name: 'Pildora 3', percentageDone: 0, pillNumber: '3' },
    { name: 'Pildora 4', percentageDone: 0, pillNumber: '4' },
    { name: 'Pildora 5', percentageDone: 0, pillNumber: '5' },
  ];
  const ProgramHeader = (
    <StyledRow style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        Contenido
      </StyledText>
      <Button
        labelSize={ButtonLabelSize.BODY3}
        variant={ComponentVariantType.PRIMARY}
        onClick={() => console.log('hola')}
        label="Agregar pildora"
        css={{ maxHeight: '30px', maxWidth: '114px' }}
      />
    </StyledRow>
  );
  const ProgramBody = emptyPills ? (
    <StyledRow
      style={{
        gap: '24px',
        marginTop: '36px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText color="gray400" variant="body3">
        No se agregó ninguna píldora todavía
      </StyledText>
    </StyledRow>
  ) : (
    <StyledColumn css={{ gap: '6px', marginTop: '12px', overflowY: 'scroll', height: '230px' }}>
      {pills.map(({ name, percentageDone, pillNumber }, index) => (
        <StyledRow
          key={index}
          css={{
            justifyContent: 'space-between',
            padding: '12px 0px 0px 0px',
            marginLeft: '6px',
            borderBottom: `1px solid ${theme.gray200}`,
          }}
        >
          <StyledRow
            style={{
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <StyledBox
              style={{
                height: '18px',
                width: '18px',
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
                    fill: '#000000',
                    fontSize: '56px',
                    fontWeight: 600,
                  },
                }}
                maxValue={1}
                strokeWidth={15}
                value={percentageDone}
                text={pillNumber}
              />
            </StyledBox>
            <StyledText variant="h5"> {name} </StyledText>
          </StyledRow>
          <ShowIcon size={18} color={theme.gray400} />
        </StyledRow>
      ))}
    </StyledColumn>
  );
  return (
    <Card height={'325px'} headerComponent={ProgramHeader}>
      {ProgramBody}
    </Card>
  );
};
export default ProgramContent;
