import React, { useEffect } from 'react';
import { RootContainer, StyledBox, StyledColumn, StyledText } from '../components/styled/styles';
import { useTheme } from 'styled-components';
import LerniMainIcon from '../assets/icons/LerniMainIcon';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../components/styled/TextInput';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import PasswordValidationDisplay from '../components/register/PasswordValidationDisplay';
import { useRegisterMutation } from '../redux/service/auth.service';
import BackArrow from '../assets/icons/BackArrow';
import { useNavigate } from 'react-router-dom';
import { CustomError } from '../redux/service/api';

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
  name: Yup.string()
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
    .min(3)
    .required('Required'),
  lastname: Yup.string()
    .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
    .min(3)
    .required('Required'),
});

const Login = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const customError = error as CustomError;
    const errorMessage = `${
      customError?.data.message ?? ''
    }, código de estado: ${customError?.status}`;
    error && alert(errorMessage);
  }, [error]);

  const handleSignIn = (values: {
    email: string;
    password: string;
    name: string;
    lastname: string;
  }) => {
    register(values);
  };

  return (
    <RootContainer
      css={{
        background: theme.primary500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '5%',
        minHeight: '100vh',
        paddingBottom: '5%',
      }}
    >
      <StyledBox
        css={{
          position: 'fixed',
          left: '40px',
          top: '40px',
          cursor: 'pointer',
          padding: '8px',
        }}
        onClick={() => navigate('/login')}
      >
        <BackArrow color="#000" />
      </StyledBox>
      <StyledColumn css={{ alignItems: 'center', width: '342px' }}>
        <LerniMainIcon />

        <Formik
          initialValues={{ email: '', password: '', name: '', lastname: '' }}
          onSubmit={(values) => handleSignIn(values)}
          validationSchema={SigninSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched }) => (
            <StyledColumn
              css={{
                marginTop: '20%',
                gap: '8px',
                width: '100%',
                paddingTop: '20px',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            >
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
              {errors.password && touched.password && (
                <StyledColumn>
                  <StyledText>{errors.password}</StyledText>
                </StyledColumn>
              )}
              {values.password.length > 0 && (
                <PasswordValidationDisplay password={values.password} />
              )}
              <TextInput
                title="Nombre"
                value={values.name}
                onChange={handleChange('name')}
                placeholder="Nombre"
                onBlur={() => handleBlur('name')}
                error={!!errors.name && touched.name}
                disabled={false}
                css={{
                  width: '100%',
                }}
              />
              <TextInput
                title="Apellido"
                value={values.lastname}
                onChange={handleChange('lastname')}
                placeholder="Apellido"
                onBlur={() => handleBlur('lastname')}
                error={!!errors.lastname && touched.lastname}
                disabled={false}
                css={{
                  width: '100%',
                }}
              />
              <Button
                disabled={!isValid || !values.email || !values.password}
                onClick={handleSubmit}
                variant={ComponentVariantType.DARK}
                loading={isLoading}
                labelSize="h4"
                css={{
                  marginTop: '8px',
                  width: '100%',
                }}
              >
                Crear cuenta
              </Button>
            </StyledColumn>
          )}
        </Formik>
      </StyledColumn>
    </RootContainer>
  );
};

export default Login;
