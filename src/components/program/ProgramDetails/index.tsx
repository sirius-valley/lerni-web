import React, { useState } from 'react';
import Card from '../../Card';
import { StyledColumn, StyledRow } from '../../styled/styles';
import { TextInput } from '../../styled/TextInput';

const ProgramDetails = () => {
  const initialState = {
    name: '',
    url: '',
    description: '',
  };
  const [program, setProgram] = useState(initialState);

  const handleChange = (name: string, value: string) => {
    setProgram((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const imageUrl =
    'https://digital55.com/wp-content/uploads/2022/01/%C2%BFQue%CC%81-cualidades-debe-tener-un-desarrollador-especialista-en-React.png';

  const ProgramTitle = 'Detalles del programa';
  const ProgramBody = (
    <StyledRow style={{ gap: '24px', marginTop: '12px' }}>
      <img src={imageUrl} style={{ height: '180px', width: '180px', borderRadius: '6px' }} />

      <StyledColumn style={{ width: '-webkit-fill-available' }}>
        <TextInput
          placeholder="Introducción a la Historia Argentina..."
          title="Nombre del programa"
          required
          value={program.name}
          onChange={(value) => handleChange('name', value)}
        ></TextInput>
        <TextInput
          placeholder="https://www.pixels.com/321423534ng43g432g4f443f4545"
          title="Url del programa"
          required
          value={program.url}
          onChange={(value) => handleChange('url', value)}
        ></TextInput>
        <TextInput
          css={{ height: '145px' }}
          placeholder="Descripcion del programa..."
          title="Descripcion"
          required
          value={program.description}
          onChange={(value) => handleChange('description', value)}
        ></TextInput>
      </StyledColumn>
    </StyledRow>
  );
  return <Card title={ProgramTitle}> {ProgramBody} </Card>;
};
export default ProgramDetails;
