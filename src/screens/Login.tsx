import React from 'react';
import { RootContainer, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import LerniMainIcon from '../assets/icons/LerniMainIcon';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../components/styled/TextInput';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/@[^.]*\./)
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+|~=\`{}\[\]:;"'<>,.?/\\-]).+$/,
      'Password must contain at least one uppercase letter and one number or symbol',
    )
    .required('Password is required'),
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = (values: any) => {
    // login(values).then(() => fetch());
    alert(JSON.stringify(values, null, 3));
  };

  const handleGoToRegisterScreen = () => navigate('/register');

  return (
    <RootContainer
      css={{
        background: theme.primary500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '10%',
        minHeight: '100vh',
      }}
    >
      <StyledColumn css={{ alignItems: 'center', width: '342px' }}>
        <LerniMainIcon />
        <StyledColumn
          css={{
            marginTop: '20%',
            gap: '8px',
            width: '100%',
            paddingTop: '20px',
          }}
        >
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={SigninSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched }) => (
              <>
                <TextInput
                  title="Email"
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder="Email"
                  onBlur={() => handleBlur('email')}
                  error={!!errors.email && touched.email}
                  disabled={false}
                  css={{
                    width: '100%',
                  }}
                />
                <StyledColumn>
                  <TextInput
                    title="Contraseña"
                    value={values.password}
                    onChange={handleChange('password')}
                    placeholder="Contraseña"
                    onBlur={() => handleBlur('password')}
                    type="password"
                    disabled={false}
                    css={{
                      width: '100%',
                    }}
                  />
                  <StyledText
                    css={{
                      textAlign: 'right',
                      marginTop: '2px',
                      textDecorationLine: 'underline',
                    }}
                    color="white"
                    variant="body2"
                    onClick={() => alert('to be defined')}
                  >
                    Olvidaste tu contraseña?
                  </StyledText>
                </StyledColumn>
                <Button
                  disabled={!isValid || !values.email || !values.password}
                  onClick={handleSubmit}
                  variant={ComponentVariantType.DARK}
                  loading={false}
                  labelSize="h4"
                  css={{
                    marginTop: '8px',
                    width: '100%',
                  }}
                >
                  Iniciar Sesión
                </Button>
                <StyledRow css={{ justifyContent: 'center', marginTop: '8px' }}>
                  <StyledText variant="body1">No tenés cuenta?&nbsp;</StyledText>
                  <StyledText
                    css={{ textDecorationLine: 'underline' }}
                    onClick={handleGoToRegisterScreen}
                  >
                    Crear una ahora
                  </StyledText>
                </StyledRow>
              </>
            )}
          </Formik>
        </StyledColumn>
      </StyledColumn>
    </RootContainer>
  );
};

export default Login;
