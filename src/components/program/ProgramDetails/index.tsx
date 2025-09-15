import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../Card';
import { StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { TextInput } from '../../styled/TextInput';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { updatePillInfo } from '../../../redux/slices/program.slice';
import {
  useGetProfessorsQuery,
  useLazyGetProfessorsQuery,
} from '../../../redux/service/professor.service';
import { Dropdown } from '../../Dropdown';
import { DateTimePicker } from './DateTimePicker';
import dayjs from 'dayjs';
import { AutocompleteComponent } from '../../Autocomplete';
import { usePermissions } from '../../../utils/permissions';
import ProgramDetailsSkeleton from './Skeleton';
import { DEFAULT_IMAGE_URL } from '../../../utils/constants';
import { useGetInstitutionsListQuery } from '../../../redux/service/institution.service';
import { isValidUrl } from '../../../utils/utils';

const ProgramDetails = () => {
  const program = useLSelector((state) => state.program);
  const { edit, isLoading } = program;
  const dispatch = useLDispatch();

  const { canUpdateProgram } = usePermissions();
  const canUpdate = canUpdateProgram() || edit;

  const [refetch, { data: profData, isLoading: isLoadingProf }] = useLazyGetProfessorsQuery();
  const [professors, setProfessorsList] = useState<{ id: string; text: string }[]>([]);
  const [imageUrlError, setImageUrlError] = useState<string>('');
  const { data: institutionsListResponse } = useGetInstitutionsListQuery();

  const institutionOptions = useMemo(
    () =>
      (institutionsListResponse?.institutions || []).map((inst) => ({
        id: inst.id,
        text: inst.name,
      })),
    [institutionsListResponse?.institutions],
  );

  useEffect(() => {
    refetch({ page: 1 });
  }, []);

  useEffect(() => {
    if (profData?.total) {
      [...Array(profData.total - 1)].forEach((_, index) => {
        refetch({ page: index + 1 }).then((res) => {
          if (res.data?.result) {
            setProfessorsList((prev) => [
              ...prev,
              ...res.data.result.map((prof: any) => ({
                id: prof.id,
                text: `${prof.name} ${prof.lastname}`,
              })),
            ]);
          }
        });
      });
    }
  }, [profData?.total]);

  const handleChange = (name: string, value: string) => {
    dispatch(updatePillInfo({ ...program, [name]: value }));

    // Validar URL de imagen en tiempo real
    if (name === 'image') {
      if (value && !isValidUrl(value)) {
        setImageUrlError('Por favor ingresa una URL válida (debe comenzar con http:// o https://)');
      } else {
        setImageUrlError('');
      }
    }
  };

  useEffect(() => {
    if (program.endDate < program.startDate) {
      handleChange('endDate', program.startDate);
    }
  }, [program.startDate, program.endDate]);

  const imageUrl = DEFAULT_IMAGE_URL;

  if (isLoading) return <ProgramDetailsSkeleton />;

  return (
    <Card title={'Detalles del programa'} height={'100%'}>
      <StyledRow style={{ gap: '24px', marginTop: '12px' }}>
        <img
          src={program.image ? program.image : imageUrl}
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
            placeholder="Introducción a la Historia Argentina..."
            title="Nombre del programa"
            required
            value={program.title}
            onChange={(value) => handleChange('title', value)}
            disabled={!canUpdate}
          />
          <TextInput
            placeholder="https://www.pixels.com/321423534ng43g432g4f443f4545"
            title="URL de la imagen"
            required
            value={program.image}
            onChange={(value) => handleChange('image', value)}
            disabled={!canUpdate}
            error={!!imageUrlError}
            subtitle={imageUrlError}
          />
          <AutocompleteComponent
            label={'Profesor'}
            value={professors.find((prof) => prof.id === program.professor) ?? null}
            placeholder={'Profesor del programa'}
            content={professors ?? []}
            multiple={false}
            onChange={(val) => {
              handleChange('professor', val);
            }}
            css={{ fontSize: 14 }}
            disabled={!canUpdate}
          />
          <AutocompleteComponent
            label={'Institución'}
            value={institutionOptions.find((opt) => opt.id === program.institution) ?? null}
            placeholder={'Seleccionar institución'}
            content={institutionOptions}
            multiple={false}
            onChange={(val) => {
              handleChange('institution', val);
            }}
            css={{ fontSize: 14 }}
            disabled={!canUpdate}
          />
          <TextInput
            css={{ height: '120px' }}
            placeholder="Descripción del programa..."
            title="Descripción"
            required
            value={program.description}
            onChange={(value) => handleChange('description', value)}
            multiline
            maxLength={2000}
            disabled={!canUpdate}
          />
          <StyledRow css={{ gap: '16px' }}>
            <DateTimePicker
              label="Comienzo"
              value={dayjs(program.startDate)}
              handleChange={(date) => handleChange('startDate', date.toISOString())}
              disable={!canUpdate}
              defaultValue={dayjs(program.startDate)}
              minDate={dayjs()}
            />
            <DateTimePicker
              label="Finalización"
              value={dayjs(program.endDate)}
              handleChange={(date) => handleChange('endDate', date.toISOString())}
              disable={!canUpdate}
              defaultValue={dayjs(program.endDate)}
              minDate={dayjs(program.startDate)}
            />
          </StyledRow>
        </StyledColumn>
      </StyledRow>
    </Card>
  );
};
export default ProgramDetails;
