import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Card from '../../Card';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CollectionIcon } from '../../../assets/icons/CollectionIcon';
import { TextInput } from '../../styled/TextInput';
import Button from '../../styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useLSelector } from '../../../redux/hooks';

const InstitutionCollections = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const institution = useLSelector((state) => state.institution);
  const collections = institution.collections;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCollections, setFilteredCollections] = useState(collections);

  useEffect(() => {
    const filtered = collections.filter(
      (collection) =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCollections(filtered);
  }, [searchTerm, collections]);

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/details/collection/${collectionId}`);
  };

  return (
    <Card
      height="auto"
      css={{ gap: '12px' }}
      headerComponent={
        <StyledRow
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            paddingBottom: '12px',
            borderBottom: `1px solid ${theme.gray200}`,
          }}
        >
          <StyledText variant="h2">{'Colecciones'}</StyledText>
          <StyledBox style={{ marginBottom: '6px', width: '250px' }}>
            <TextInput
              placeholder="Buscar colecciones..."
              value={searchTerm}
              onChange={(value: string) => setSearchTerm(value)}
            />
          </StyledBox>
        </StyledRow>
      }
    >
      {filteredCollections.length !== 0 ? (
        <>
          <StyledColumn css={{ gap: '0px', maxHeight: '262px', overflowY: 'auto' }}>
            {filteredCollections.map((collection, index) => (
              <StyledColumn
                key={collection.id}
                style={{
                  borderBottom:
                    index !== filteredCollections.length - 1
                      ? `1px solid ${theme.gray200}`
                      : 'none',
                  paddingBottom: '16px',
                }}
              >
                <StyledRow
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '40px',
                    marginTop: '12px',
                  }}
                >
                  <StyledRow style={{ gap: '8px', alignItems: 'center', height: '100%' }}>
                    <StyledBox
                      style={{
                        borderRadius: 4,
                        height: '40px',
                        width: '40px',
                        background: theme.gray200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CollectionIcon />
                    </StyledBox>
                    <StyledColumn
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        height: '100%',
                        padding: '2px 0',
                      }}
                    >
                      <StyledText
                        variant="body2"
                        style={{
                          color: theme.gray950,
                          fontFamily: 'Roboto',
                          fontWeight: 500,
                        }}
                      >
                        {collection.name}
                      </StyledText>
                      <StyledText
                        variant="body3"
                        style={{
                          color: theme.gray400,
                          fontFamily: 'Roboto',
                        }}
                      >
                        {collection.id}
                      </StyledText>
                    </StyledColumn>
                  </StyledRow>
                  <Button
                    variant={ComponentVariantType.GHOST}
                    onClick={() => handleCollectionClick(collection.id)}
                    labelSize={'body3'}
                    css={{ color: theme.primary400 }}
                  >
                    Ver detalles
                  </Button>
                </StyledRow>
              </StyledColumn>
            ))}
          </StyledColumn>
          <StyledRow css={{ justifyContent: 'flex-end', marginTop: '8px' }}>
            <StyledText variant="body2" css={{ color: theme.gray400 }}>
              {filteredCollections.length} colecciones
            </StyledText>
          </StyledRow>
        </>
      ) : (
        <StyledBox
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0px 16px 0px',
          }}
        >
          <StyledText variant="body3" style={{ textAlign: 'center', color: theme.gray400 }}>
            {searchTerm ? 'No se encontraron colecciones' : 'No hay colecciones asociadas'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};

export default InstitutionCollections;
