import styled from 'styled-components';
import { jsToCss } from '../../../utils/utils';
// import { ButtonState, ButtonType } from './Button';
import { MyTheme, theme } from '../../../utils/theme';

export interface StyledProps {
  css?: { [x: string]: any };
}

type styleProps = {
  [key: string]: string | number | { [key in string]: string | number };
};

type StyleByOptionsProps = {
  [key in ButtonType]: {
    [state in ButtonState]: styleProps;
  };
};

export enum ButtonType {
  DARK = 'dark',
  PRIMARY = 'primary',
  RED = 'red',
  GHOST = 'ghost',
}

export enum ButtonSizeEnum {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ButtonState {
  DEFAULT = 'default',
  DISABLED = 'disabled',
}

const getButtonStyles = (theme: MyTheme): StyleByOptionsProps => {
  return {
    [ButtonType.PRIMARY]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: theme.primary500,
        color: theme.white,
        hover: {
          backgroundColor: theme.primary600,
        },
      },
      [ButtonState.DISABLED]: {
        backgroundColor: theme.gray300,
        color: theme.gray500,
      },
    },
    [ButtonType.DARK]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: theme.primary800,
        color: theme.white,
        border: `1px solid ${theme.primary800}`,
        hover: {
          backgroundColor: theme.primary900,
          color: theme.white,
          border: `1px solid ${theme.primary900}`,
        },
      },

      [ButtonState.DISABLED]: {
        backgroundColor: theme.gray300,
        color: theme.gray300,
        border: `1px solid ${theme.gray300}`,
      },
    },
    [ButtonType.GHOST]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: 'none',
        color: theme.primary500,
        hover: {
          backgroundColor: theme.primary200,
          color: theme.primary400,
        },
      },
      [ButtonState.DISABLED]: {
        backgroundColor: theme.gray300,
        color: theme.gray300,
      },
    },
    [ButtonType.RED]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: theme.red500,
        color: theme.white,
        hover: {
          backgroundColor: theme.red600,
        },
      },
      [ButtonState.DISABLED]: {
        backgroundColor: theme.gray300,
        color: theme.gray300,
      },
    },
  };
};
console.log(getButtonStyles(theme)['dark']['default']);
interface ButtonProps {
  type: ButtonType;
  state: ButtonState;
  css?: { [x: string]: any };
}

export const StyledButton = styled.button.attrs<ButtonProps>((props) => ({
  type: props.type ?? 'filled',
  state: props.state ?? 'default',
}))`
  border-radius: 6px;
  padding: 8px 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  ${(props) => {
    if (props.type) {
      const { hover, ...restStyles } = getButtonStyles(theme)[props.type][props.state];
      console.log('restStyles: ', restStyles);
      const styleHover: { [key: string]: string | number } = typeof hover === 'object' ? hover : {};
      return `
      ${jsToCss(restStyles)}
      &:hover {
        ${hover ? jsToCss(styleHover) : ''}
      }
      `;
    }
  }}
  ${(props) => props.css && jsToCss(props.css)}
`;
// ${jsToCss(restStyles)}

// export const StyledButton = styled.button<StyledProps>`
//   height: 40px;
//   width: 100px;
//   border-radius: 8px;
//   ${(props) => props.css && jsToCss(props.css)}
// `;
