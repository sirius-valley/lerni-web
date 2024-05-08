import React, { useEffect, useState } from 'react';
import Card from '../../Card';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { TextInput } from '../../styled/TextInput';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { updatePillInfo } from '../../../redux/slices/program.slice';
import { useGetProfessorsQuery } from '../../../redux/service/professor.service';
import { Dropdown } from '../../Dropdown';
import { DateTimePicker } from './DateTimePicker';
import dayjs from 'dayjs';

const ProgramDetails = () => {
  const program = useLSelector((state) => state.program);
  const { edit } = program;
  const dispatch = useLDispatch();

  const { data: professors } = useGetProfessorsQuery(undefined, {
    selectFromResult: (res: any) => {
      return {
        ...res,
        data: {
          ...res.data,
          result: res?.data?.result.map((prof: any) => ({
            id: prof.id,
            text: `${prof.name} ${prof.lastname}`,
          })),
        },
      };
    },
  });

  const handleChange = (name: string, value: string) => {
    dispatch(updatePillInfo({ ...program, [name]: value }));
  };

  useEffect(() => {
    if (program.endDate < program.startDate) {
      handleChange('endDate', program.startDate);
    }
  }, [program.startDate]);

  const imageUrl = 'https://lerni-images-2024.s3.amazonaws.com/default_image_program.jpg';

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
            disabled={!edit}
          ></TextInput>
          <TextInput
            placeholder="https://www.pixels.com/321423534ng43g432g4f443f4545"
            title="URL de la imagen"
            required
            value={program.image}
            onChange={(value) => handleChange('image', value)}
            disabled={!edit}
          ></TextInput>
          <Dropdown
            label={'Profesor'}
            value={program.professor}
            placeholder={'Profesor del programa'}
            content={professors.result ?? []}
            onChange={(val) => {
              handleChange('professor', val);
            }}
            css={{ fontSize: 14 }}
          />
          <TextInput
            css={{ height: '120px' }}
            placeholder="Descripcion del programa..."
            title="Descripcion"
            required
            value={program.description}
            onChange={(value) => handleChange('description', value)}
            multiline
            disabled={!edit}
          ></TextInput>
          <StyledRow css={{ gap: '16px' }}>
            <DateTimePicker
              label="Comienzo"
              value={dayjs(program.startDate)}
              handleChange={(date) => handleChange('startDate', date.toISOString())}
              disable={!program.edit}
              defaultValue={dayjs(program.startDate)}
              minDate={dayjs()}
            />
            <DateTimePicker
              label="Finalización"
              value={dayjs(program.endDate)}
              handleChange={(date) => handleChange('endDate', date.toISOString())}
              disable={!program.edit}
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
