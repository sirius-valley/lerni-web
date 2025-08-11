import React, { useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../styled/styles';
import Button from '../styled/Button';
import { ComponentVariantType } from '../../utils/constants';
import { ButtonLabelSize } from '../styled/Button/styles';
import FileUploadIcon from '../../assets/icons/FileUploadIcon';
import CheckIcon from '../../assets/icons/CheckIcon';

interface CsvUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  description?: string;
  loading?: boolean;
  disabled?: boolean;
}

const CsvUpload: React.FC<CsvUploadProps> = ({
  onFileSelect,
  accept = '.csv',
  label = 'Cargar archivo CSV',
  description = 'Selecciona un archivo CSV (.csv)',
  loading = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    const validTypes = ['text/csv', 'application/csv', 'text/plain'];

    if (!validTypes.includes(file.type) && !file.name.match(/\.csv$/)) {
      alert('Por favor selecciona un archivo CSV válido (.csv)');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClick = () => {
    if (!disabled && !loading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled || loading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <StyledColumn css={{ gap: '8px', width: '100%' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled || loading}
      />

      <StyledBox
        css={{
          border: `2px dashed ${dragActive ? theme.primary400 : theme.gray300}`,
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          background: dragActive ? `${theme.primary400}10` : theme.white,
          transition: 'all 0.2s ease',
          opacity: disabled || loading ? 0.6 : 1,
          '&:hover':
            !disabled && !loading
              ? {
                  borderColor: theme.primary400,
                  background: `${theme.primary400}05`,
                }
              : {},
        }}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <StyledColumn css={{ gap: '16px', alignItems: 'center' }}>
          {selectedFile ? (
            <>
              <CheckIcon color={theme.success} size={32} />
              <StyledColumn css={{ gap: '4px', alignItems: 'center' }}>
                <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.success }}>
                  Archivo seleccionado
                </StyledText>
                <StyledText variant="body3" css={{ color: theme.gray600 }}>
                  {selectedFile.name}
                </StyledText>
                <StyledText variant="body3" css={{ color: theme.gray500 }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </StyledText>
              </StyledColumn>
            </>
          ) : (
            <>
              <FileUploadIcon color={theme.gray400} size={32} />
              <StyledColumn css={{ gap: '4px', alignItems: 'center' }}>
                <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.gray600 }}>
                  {label}
                </StyledText>
                <StyledText variant="body3" css={{ color: theme.gray500 }}>
                  {description}
                </StyledText>
                <StyledText variant="body3" css={{ color: theme.gray400 }}>
                  Haz clic aquí o arrastra el archivo
                </StyledText>
              </StyledColumn>
            </>
          )}
        </StyledColumn>
      </StyledBox>

      {selectedFile && (
        <StyledRow css={{ justifyContent: 'center', gap: '12px' }}>
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            labelSize={ButtonLabelSize.BODY3}
            css={{
              height: '32px',
              padding: '6px 12px',
              fontSize: '12px',
            }}
            disabled={loading}
          >
            Cambiar archivo
          </Button>
        </StyledRow>
      )}
    </StyledColumn>
  );
};

export default CsvUpload;
