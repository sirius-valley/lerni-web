import { CreateProgramState } from '../redux/slices/program.slice';
import { isValidUrl } from './utils';

export const validateProgram = (program: CreateProgramState) => {
  const validations = [
    {
      condition: !program.title.trim(),
      message: 'El nombre del programa es requerido',
    },
    {
      condition: !program.image.trim(),
      message: 'La URL de la imagen es requerida',
    },
    {
      condition: program.image && !isValidUrl(program.image),
      message:
        'Por favor ingresa una URL válida para la imagen (debe comenzar con http:// o https://)',
    },
    {
      condition: !program.professor,
      message: 'Debes seleccionar un profesor para el programa',
    },
    {
      condition: !program.institution,
      message: 'Debes seleccionar una institución para el programa',
    },
    {
      condition: !program.description.trim(),
      message: 'La descripción del programa es requerida',
    },
    {
      condition: !program.startDate,
      message: 'La fecha de inicio es requerida',
    },
    {
      condition: !program.endDate,
      message: 'La fecha de finalización es requerida',
    },
    {
      condition:
        program.startDate &&
        program.endDate &&
        new Date(program.endDate) <= new Date(program.startDate),
      message: 'La fecha de finalización debe ser posterior a la fecha de inicio',
    },
    {
      condition: !program.pills || program.pills.length === 0,
      message: 'Debes agregar al menos una píldora de contenido al programa',
    },
    {
      condition: !program.questionnaire,
      message: 'Debes agregar un cuestionario al programa',
    },
    {
      condition: !program.trivia,
      message: 'Debes agregar un trivia al programa',
    },
  ];

  const firstError = validations.find((validation) => validation.condition);
  return firstError ? firstError.message : null;
};
