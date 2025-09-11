import React from 'react';
import Card from '../../Card';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { TextInput } from '../../styled/TextInput';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { AutocompleteComponent } from '../../Autocomplete';
import { updateProfile } from '../../../redux/slices/profile.slice';
import { usePermissions } from '../../../utils/permissions';

const ProfileDetails = () => {
  const profile = useLSelector((state) => state.profile);

  const dispatch = useLDispatch();

  const { canUpdateProfile } = usePermissions();
  const canUpdate = canUpdateProfile();

  const imageUrl = 'https://lerni-images-2024.s3.amazonaws.com/default_image_program.jpg';

  const handleChange = (name: string, value: string) => {
    dispatch(updateProfile({ ...profile, [name]: value }));
  };

  return (
    <Card title={'Detalles de usuario'} height={'100%'}>
      <StyledRow style={{ gap: '24px', marginTop: '12px' }}>
        <img
          src={profile.image ? profile.image : imageUrl}
          style={{
            height: '180px',
            width: '180px',
            minWidth: 180,
            minHeight: 180,
            borderRadius: '6px',
            objectFit: 'cover',
          }}
        />

        <StyledColumn style={{ width: '-webkit-fill-available', gap: 8 }}>
          <TextInput
            placeholder="No se registró nombre"
            title="Nombre y Apellido"
            required
            value={profile.fullname || ''}
            onChange={(value) => handleChange('fullname', value)}
            disabled={!canUpdate}
          ></TextInput>
          <TextInput
            placeholder="No se registró email"
            title="Email"
            required
            value={profile.email || ''}
            onChange={(value) => handleChange('email', value)}
            disabled={!canUpdate}
          ></TextInput>
          <TextInput
            placeholder="Sin profesión"
            title="Profesión"
            required
            value={profile.career || ''}
            onChange={(value) => handleChange('career', value)}
            disabled={!canUpdate}
          ></TextInput>
          <TextInput
            placeholder="No especificado"
            title="Ubicación"
            required
            value={profile.city || ''}
            onChange={(value) => handleChange('city', value)}
            disabled={!canUpdate}
          ></TextInput>
          <AutocompleteComponent
            label={'Grupos'}
            required
            multiple
            content={[]}
            value={profile.groups.map((group) => ({ id: group, text: group }))}
            onChange={(value) => handleChange('groups', value)}
            disabled={!canUpdate}
          />

          <TextInput
            placeholder="0"
            title="Puntos"
            required
            value={profile.points?.toString() || '0'}
            onChange={(value) => handleChange('points', value)}
            disabled={!canUpdate}
          ></TextInput>
        </StyledColumn>
      </StyledRow>
    </Card>
  );
};
export default ProfileDetails;
