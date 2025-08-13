import React, { useEffect } from 'react';
import { StyledBox, StyledColumn } from '../components/styled/styles';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useTheme } from 'styled-components';
import ProfileDetailsComponent from '../components/profile/ProfileDetails';
import { useParams } from 'react-router-dom';
import { useLDispatch } from '../redux/hooks';
import { api } from '../redux/service/api';
import { resetProfileSlice } from '../redux/slices/profile.slice';
import { useStudentProfileQuery } from '../redux/service/students.service';
import { usePermissions } from '../utils/permissions';
import UserPrograms from '../components/profile/UserPrograms';
import Rewards from '../components/profile/Rewards';

const ProfileDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useLDispatch();

  const { data } = useStudentProfileQuery(id as string);
  const handleSave = () => {
    null;
  };

  const { canUpdateProfile } = usePermissions();
  const canUpdate = canUpdateProfile();

  useEffect(() => {
    return () => {
      dispatch(api.util.invalidateTags(['ProfileDetails']));
      dispatch(resetProfileSlice());
    };
  }, []);
  return (
    <StyledBox css={{ height: '100%' }}>
      <StyledColumn
        css={{
          background: theme.gray200,
          minHeight: '90vh',
          width: '100vw',
        }}
      >
        <StyledColumn
          css={{
            marginTop: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '32px',
          }}
        >
          <ProfileDetailsComponent />
          <Rewards />
          <UserPrograms />

          {canUpdate && (
            <Button
              variant={ComponentVariantType.PRIMARY}
              onClick={handleSave}
              labelSize={'body3'}
              css={{
                marginTop: '8px',
                width: 'auto',
                height: '30px',
                padding: '8px 16px 8px 16px',
                fontFamily: 'Roboto-Bold',
                cursor: 'pointer',
              }}
            >
              Guardar
            </Button>
          )}
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default ProfileDetails;
