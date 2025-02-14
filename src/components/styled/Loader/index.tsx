import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <span className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; /* Para ocupar toda la pantalla */

  .loader {
    position: relative;
    width: 60px;
    height: 60px;
    background: #93a2b7;
    transform: rotateX(65deg) rotate(45deg);
    color: #cad4e0;
    animation: layers1 1s linear infinite alternate;
  }

  .loader:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgb(202, 212, 224);
    animation: layerTr 1s linear infinite alternate;
  }

  @keyframes layers1 {
    0% {
      box-shadow: 0px 0px 0 0px;
    }
    90%,
    100% {
      box-shadow: 20px 20px 0 -4px;
    }
  }
  @keyframes layerTr {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(-25px, -25px) scale(1);
    }
  }
`;

export default Loader;
