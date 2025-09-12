import { TextInput } from '../../styled/TextInput';
import Card from '../../Card';
import React from 'react';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { useLSelector, useLDispatch } from '../../../redux/hooks';
import { updateInstitutionInfo } from '../../../redux/slices/institution.slice';
import { usePermissions } from '../../../utils/permissions';
import { DEFAULT_IMAGE_URL } from '../../../utils/constants';

const InstitutionDetails = () => {
  const institution = useLSelector((state) => state.institution);
  const dispatch = useLDispatch();
  const { canUpdateInstitution } = usePermissions();

  const handleChange = (name: string, value: string) => {
    dispatch(updateInstitutionInfo({ ...institution, [name]: value }));
  };

  // Save handled by parent screen button

  return (
    <Card title={'Detalles de la institución'} height={'100%'}>
      <StyledRow style={{ gap: '24px', marginTop: '12px' }}>
        <img
          src={institution.picture || DEFAULT_IMAGE_URL}
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
            placeholder="Nombre de la institución..."
            title="Nombre de la institución"
            required
            value={institution.name}
            onChange={(value) => handleChange('name', value)}
            disabled={!canUpdateInstitution()}
          />
          <TextInput
            placeholder="Límite de estudiantes"
            title="Límite de estudiantes"
            required
            value={institution.studentLimit?.toString() || 'Sin límite'}
            onChange={(value) => handleChange('studentLimit', value.replace(/\D/g, ''))}
            disabled={!canUpdateInstitution()}
          />
          <TextInput
            placeholder="URL de la imagen (opcional)"
            title="Imagen"
            value={institution.picture}
            onChange={(value) => handleChange('picture', value)}
            disabled={!canUpdateInstitution()}
          />
        </StyledColumn>
      </StyledRow>
    </Card>
  );
};

export default InstitutionDetails;
