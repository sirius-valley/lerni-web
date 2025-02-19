import React, { useRef } from 'react';
import { StyledColumn, StyledRow, StyledText } from '../styles';
import { StyledFileUploadContainer } from './styles';
import { useTheme } from 'styled-components';
import { CSSProperties } from '../../../utils/utils';
import FileUploadIcon from '../../../assets/icons/FileUploadIcon';
import FileUploadedIcon from '../../../assets/icons/FileUploadedIcon';
import CircleCheckIcon from '../../../assets/icons/CircleCheckIcon';

export interface FileUploadProps {
  title?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  onChange: (value: any) => void;
  value: {
    name?: string;
    size?: number;
    type?: string;
  };
  css?: CSSProperties;
  fileExtensionAllowed?: string;
}

const FileUpload = ({
  title,
  disabled = false,
  required = false,
  error = false,
  onChange,
  value,
  css,
  fileExtensionAllowed = '',
}: FileUploadProps) => {
  const theme = useTheme();
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const hasCorrectValue = !!value?.name && !error;

  const handleStyledBoxClick = () => {
    if (uploadInputRef.current) uploadInputRef.current.click();
  };

  const handleInputFileChange = (e: any) => onChange(e.target.files[0]);
  const renderFileSize = () => {
    if (value?.size) {
      if (value?.size < 1048575) return `${(value?.size / 1000).toString().slice(0, 5)} kb`;
      return `${(value.size / 1000000).toString().slice(0, 4)} MB`;
    }
    return null;
  };

  return (
    <StyledColumn
      css={{
        gap: 8,
        justifyContent: 'flex-start',
      }}
    >
      <StyledRow style={{ alignContent: 'center', gap: 8, marginBottom: '8px' }}>
        <StyledText
          variant="body2"
          style={{ color: disabled ? theme.gray400 : theme.gray950, fontFamily: 'Roboto-Bold' }}
        >
          {title}
        </StyledText>
        <StyledText variant="body2" style={{ color: disabled ? theme.gray200 : theme.red500 }}>
          {required || (title && required) ? '*' : ''}
        </StyledText>
      </StyledRow>
      <StyledFileUploadContainer
        hasCorrectValue={hasCorrectValue}
        disabled={disabled}
        error={error}
        css={css}
      >
        <StyledRow css={{ justifyContent: 'space-between', width: '100%' }}>
          <StyledRow
            css={
              hasCorrectValue
                ? { justifyContent: 'flex-start', width: '90%' }
                : { justifyContent: 'center', width: '100%' }
            }
          >
            <input
              ref={uploadInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleInputFileChange}
              accept={fileExtensionAllowed}
            />
            <StyledColumn
              css={{
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px',
                height: '50px',
              }}
              onClick={handleStyledBoxClick}
            >
              {hasCorrectValue ? <FileUploadedIcon /> : <FileUploadIcon />}
            </StyledColumn>
            {hasCorrectValue && (
              <StyledColumn css={{ justifyContent: 'center' }}>
                {value?.name && <StyledText variant="body1">{value?.name}</StyledText>}
                {value?.size && (
                  <StyledText variant="body3" color="gray400">
                    {renderFileSize()}
                  </StyledText>
                )}
              </StyledColumn>
            )}
          </StyledRow>
          {hasCorrectValue && (
            <StyledColumn css={{ justifyContent: 'center' }}>
              <CircleCheckIcon />
            </StyledColumn>
          )}
        </StyledRow>
        {error && (
          <StyledRow css={{ justifyContent: 'center', position: 'absolute', top: '70px' }}>
            <StyledText variant="body3" color="red500">
              {error && 'Archivo no compatible. Intenta de nuevo.'}
            </StyledText>
          </StyledRow>
        )}
      </StyledFileUploadContainer>
    </StyledColumn>
  );
};

export default FileUpload;
