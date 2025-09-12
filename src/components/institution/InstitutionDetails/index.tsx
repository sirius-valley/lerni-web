import { TextInput } from '../../styled/TextInput';
import Card from '../../Card';
import React from 'react';
import { useTheme } from 'styled-components';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { useLSelector, useLDispatch } from '../../../redux/hooks';
import { updateInstitutionInfo, setEdit } from '../../../redux/slices/institution.slice';
import { useUpdateInstitutionMutation } from '../../../redux/service/institution.service';
import { successToast, errorToast } from '../../Toasts';
import { usePermissions } from '../../../utils/permissions';
import { DEFAULT_IMAGE_URL } from '../../../utils/constants';

const InstitutionDetails = () => {
  const theme = useTheme();
  const institution = useLSelector((state) => state.institution);
  const { edit, isLoading } = institution;
  const dispatch = useLDispatch();
  const { canUpdateInstitution } = usePermissions();
  const [updateInstitution, { isError, isSuccess }] = useUpdateInstitutionMutation();

  const handleChange = (name: string, value: string) => {
    dispatch(updateInstitutionInfo({ ...institution, [name]: value }));
  };

  const handleEdit = () => {
    dispatch(setEdit(true));
  };

  const handleSave = () => {
    updateInstitution({
      id: institution.id,
      name: institution.name,
      studentLimit: institution.studentLimit,
      picture: institution.picture,
    });
  };

  const handleCancel = () => {
    dispatch(setEdit(false));
  };

  React.useEffect(() => {
    if (isSuccess) {
      successToast('La institución se ha actualizado con éxito!');
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (isError) {
      errorToast('Algo salió mal, revisa los campos nuevamente');
    }
  }, [isError]);

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
            disabled={!edit || !canUpdateInstitution()}
          />
          <TextInput
            placeholder="Límite de estudiantes"
            title="Límite de estudiantes"
            required
            value={institution.studentLimit?.toString() || 'Sin límite'}
            onChange={(value) => handleChange('studentLimit', value.replace(/\D/g, ''))}
            disabled={!edit || !canUpdateInstitution()}
          />
          <TextInput
            placeholder="URL de la imagen (opcional)"
            title="Imagen"
            value={institution.picture}
            onChange={(value) => handleChange('picture', value)}
            disabled={!edit || !canUpdateInstitution()}
          />
        </StyledColumn>
      </StyledRow>
      {edit && canUpdateInstitution() && (
        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}
        >
          <button
            onClick={handleCancel}
            disabled={isLoading}
            style={{
              padding: '8px 24px',
              border: 'none',
              background: 'transparent',
              color: theme.primary400,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              padding: '8px 24px',
              border: 'none',
              background: theme.primary500,
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      )}
      {!edit && canUpdateInstitution() && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button
            onClick={handleEdit}
            style={{
              padding: '8px 24px',
              border: 'none',
              background: theme.primary500,
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Editar
          </button>
        </div>
      )}
    </Card>
  );
};

export default InstitutionDetails;
