import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Card from '../../../components/Card';
import Button from '../../../components/styled/Button';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { useLDispatch } from '../../../redux/hooks';
import { useConvertToLerniPillMutation } from '../../../redux/service/program.service';
import { ComponentVariantType } from '../../../utils/constants';
import { ModalProps } from '../interfaces';
import { removeHtmlTags } from '../../../utils/utils';
import EllipseIcon from '../../../assets/icons/EllipseIcon';

enum bubbleType {
  ACTION = 'ACTION',
  QUESTION = 'QUESTION',
}
enum metadataType {
  SINGLECHOICE = 'SINGLE_CHOICE',
  MULTIPLECHOICE = 'MULTIPLE_CHOICE',
  IMAGE = 'IMAGE',
  FREETEXT = 'FREE_TEXT',
}

const bubbles = [
  {
    type: bubbleType.ACTION,
    id: '1',
    content: 'Hola, ¿como estas?',
  },
  {
    type: bubbleType.QUESTION,
    id: '2',
    metadata: {
      type: metadataType.SINGLECHOICE,
    },
    content: [
      {
        id: '1',
        content: 'Muy bien',
      },
      {
        id: '2',
        content: 'Acá andamos',
      },
    ],
  },
  {
    type: bubbleType.ACTION,
    id: '3',
    content: 'Arranquemos con la clase entonces!',
  },
];

interface BubbleProps {
  type: bubbleType;
  id: string;
  metadata?: {
    type: metadataType;
  };
  content: any;
}

const RenderBubble = ({ type, id, metadata, content }: BubbleProps) => {
  console.log(id, content);
  if (type === bubbleType.ACTION) {
    console.log('action');
    return (
      <StyledColumn css={{ justifyContent: 'center', alignItems: 'left', gap: '4px' }}>
        <StyledText variant="body3" color="primary500" css={{ fontFamily: 'Roboto-Bold' }}>
          {'Text'}
        </StyledText>
        <StyledText variant="body2" color="gray950">
          {removeHtmlTags(content)}
        </StyledText>
      </StyledColumn>
    );
  } else if (metadata?.type === metadataType.SINGLECHOICE) {
    console.log('question');
    return (
      <StyledColumn css={{ justifyContent: 'left', alignItems: 'left', gap: '4px' }}>
        <StyledText variant="body3" css={{ fontFamily: 'Roboto-Bold', color: '#C642A9' }}>
          {'Single Choice'}
        </StyledText>
        {content.map((option: any, idx: number) => (
          <StyledRow css={{ gap: '4px', alignItems: 'left' }} key={idx}>
            <EllipseIcon />
            <StyledText variant="body2" color="gray950">
              {option.content}
            </StyledText>
          </StyledRow>
        ))}
      </StyledColumn>
    );
  }
};

interface CreateQuestionnaireModalProps extends ModalProps {
  openModal?: boolean;
}

const ReadPillModal = ({ handleOnClose }: CreateQuestionnaireModalProps) => {
  const [convertQuery, { data, isLoading, error: convertError, isSuccess }] =
    useConvertToLerniPillMutation();
  const [inputValues, setInputValues] = useState<{
    file: any;
  }>({
    file: null,
  });
  const [errors, setErrors] = useState(false);
  const dispatch = useLDispatch();
  const theme = useTheme();

  // useEffect(() => {
  //   if (convertError) errorToast('Algo salió mal, revisa el formato del JSON');
  // }, [convertError]);
  // useEffect(() => {
  //   if (isSuccess) successToast('El archivo JSON se ha cargado con exito!');
  // }, [isSuccess]);

  const handleInputFileChange = (value: any) => {
    if (value?.type !== 'application/json') setErrors(true);
    else setErrors(false);
    setInputValues({
      file: value,
    });
  };

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '12px',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold' }}>
          {'Visuzalizar JSON'}
        </StyledText>
        <StyledText variant="body2">
          {'En esta sección, se puede visualizar el contenido que se consumirán en la aplicación.'}
        </StyledText>
      </StyledColumn>
      <StyledBox onClick={() => handleOnClose()} css={{ padding: 8, cursor: 'pointer' }}>
        <CloseIcon />
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card
      headerComponent={cardHeader()}
      onClick={(event) => {
        event.stopPropagation();
      }}
      css={{
        height: 'fit-content',
        width: '568px',
        zIndex: 30,
      }}
    >
      <StyledColumn css={{ width: '100%' }}>
        <StyledColumn
          css={{
            width: '100%',
            justifyContent: 'left',
            alignItems: 'left',
            borderRadius: '8px',
            padding: '8px',
            gap: '24px',
            backgroundColor: theme.gray100,
          }}
        >
          <StyledColumn
            css={{
              maxHeight: 600,
              overflowY: 'auto',
              gap: '24px',
              justifyContent: 'center',
              alignItems: 'left',
            }}
          >
            {bubbles.map((bubble, idx) => (
              <RenderBubble
                key={idx}
                type={bubble.type}
                id={bubble.id}
                content={bubble.content}
                metadata={bubble.metadata}
              />
            ))}
          </StyledColumn>
          {/* Acá se debe renderizar cada pill */}
        </StyledColumn>
        <StyledRow
          css={{
            marginTop: '24px',
            width: '100%',
            gap: '16px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={handleOnClose}
            disabled={isLoading}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Cancelar
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default ReadPillModal;
