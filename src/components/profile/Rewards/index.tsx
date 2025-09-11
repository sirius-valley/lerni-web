import React, { useState } from 'react';
import Card from '../../Card';
import { StyledBox, StyledImage, StyledText } from '../../styled/styles';
import { useLSelector } from '../../../redux/hooks';
import { useTheme } from 'styled-components';

const Rewards = () => {
  const profile = useLSelector((state) => state.profile);
  const rewards = profile.rewards ?? [];
  const theme = useTheme();
  const [hoveredAchievementKey, setHoveredAchievementKey] = useState<string | null>(null);

  return (
    <Card title={'Logros'} height={'100%'}>
      {rewards.length !== 0 ? (
        <StyledBox
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {rewards.map((achievement, index) => (
            <div
              key={achievement.id + index}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredAchievementKey(achievement.id + index)}
              onMouseLeave={() => setHoveredAchievementKey(null)}
            >
              <StyledImage
                src={achievement.icon}
                alt={achievement.name}
                width={'80px'}
                height={'80px'}
                style={{ borderRadius: '8px', objectFit: 'cover', cursor: 'pointer' }}
              />

              {/* Hover Tooltip */}
              {hoveredAchievementKey === achievement.id + index && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    marginBottom: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{achievement.name}</div>
                  <div style={{ opacity: 0.9 }}>{achievement.description}</div>

                  {/* Arrow pointing down */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: '6px solid rgba(0, 0, 0, 0.9)',
                    }}
                  />
                </div>
              )}
            </div>
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
