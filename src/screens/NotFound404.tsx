import React from 'react';
import { RootContainer, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import Lernito from '../assets/icons/Lernito';
import Button from '../components/styled/Button';
import { useNavigate } from 'react-router-dom';
import { ComponentVariantType } from '../utils/constants';
import styled from 'styled-components';

const GradientText = styled(StyledText)`
  font-family: 'Roboto-Bold';
  font-size: 300px;
  background: ${({ theme }) => `linear-gradient(45deg, ${theme.primary800}, ${theme.primary700})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 300px;
    height: 30px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(10px);
  }
`;

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <RootContainer>
      <StyledColumn
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: theme.primary700,
          gap: '24px',
        }}
      >
        <StyledRow style={{ alignItems: 'end' }}>
          <GradientText variant={'h1'}>4</GradientText>
          <IconContainer>
            <Lernito size={1.5} />
          </IconContainer>
          <GradientText variant={'h1'}>4</GradientText>
        </StyledRow>
        <StyledText style={{ fontFamily: 'Roboto' }} variant={'h3'} color={'white'}>
          ¡Ups, te perdiste, no encontramos la página!
        </StyledText>
        <Button
          onClick={() => navigate('/')}
          variant={ComponentVariantType.PRIMARY}
          css={{ width: 'fit-content', padding: '8px 16px' }}
        >
          Volver al inicio
        </Button>
      </StyledColumn>
    </RootContainer>
  );
};

export default NotFound;
