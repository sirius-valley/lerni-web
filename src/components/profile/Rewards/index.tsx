import React from 'react';
import Card from '../../Card';
import { StyledBox, StyledImage, StyledText } from '../../styled/styles';
import { useLSelector } from '../../../redux/hooks';
import { useTheme } from 'styled-components';

const Rewards = () => {
  const profile = useLSelector((state) => state.profile);
  const rewards = profile.rewards ?? [];
  const theme = useTheme();

  return (
    <Card title={'Logros'} height={'100%'}>
      {rewards.length !== 0 ? (
        <StyledBox>
          {rewards.map((reward, index) => (
            <StyledImage key={index} src={reward} alt={'Logros'} width={'100%'} height={'100%'} />
          ))}
        </StyledBox>
      ) : (
        <StyledBox
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0px 16px 0px',
          }}
        >
          <StyledText variant="body3" style={{ textAlign: 'center', color: theme.gray400 }}>
            {'No hay logros todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};

export default Rewards;
