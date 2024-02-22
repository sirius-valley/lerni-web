import styled, { css as styledComponent } from 'styled-components';
import { jsToCss } from '../../utils/utils';
import { MyTheme, theme } from '../../utils/theme';
import { ComponentVariantType } from '../../utils/constants';

export interface StyledProps {
  css?: { [x: string]: any };
}

type styleProps = {
  [key: string]: string | number | { [key in string]: string | number };
};

type StyleByOptionsProps = {
  [key in ComponentVariantType]: {
    [state in ButtonState]: styleProps;
  };
};

export enum ButtonSizeEnum {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ButtonState {
  DEFAULT = 'default',
  DISABLED = 'disabled',
}

export enum ButtonLabelSize {
  BODY1 = 'body1',
  BODY2 = 'body2',
  BODY3 = 'body3',
}

const getButtonStyles = (theme: MyTheme): StyleByOptionsProps => {
  return {
    [ComponentVariantType.PRIMARY]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: theme.primary500,
        color: theme.white,
        border: 'none',
        hover: {
          backgroundColor: theme.primary600,
          cursor: 'pointer',
          color: theme.blue500,
        },
      },
      [ButtonState.DISABLED]: {
        border: 'none',
        backgroundColor: theme.gray300,
        color: theme.gray500,
      },
    },
    [ComponentVariantType.DARK]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: theme.primary800,
        color: theme.white,
        border: 'none',
        hover: {
          backgroundColor: theme.primary900,
          color: theme.white,
          cursor: 'pointer',
        },
      },

      [ButtonState.DISABLED]: {
        border: 'none',
        backgroundColor: theme.gray300,
        color: theme.gray500,
      },
    },
    [ComponentVariantType.GHOST]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: 'transparent',
        color: theme.primary500,
        border: 'none',
        hover: {
          backgroundColor: theme.primary200,
          color: theme.primary400,
          cursor: 'pointer',
        },
      },
      [ButtonState.DISABLED]: {
        border: 'none',
        backgroundColor: theme.gray300,
        color: theme.gray500,
      },
    },
    [ComponentVariantType.RED]: {
      [ButtonState.DEFAULT]: {
        backgroundColor: theme.red500,
        color: theme.white,
        border: 'none',
        hover: {
          backgroundColor: theme.red600,
          cursor: 'pointer',
        },
      },
      [ButtonState.DISABLED]: {
        border: 'none',
        backgroundColor: theme.gray300,
        color: theme.gray500,
      },
    },
  };
};

interface ButtonProps {
  type: ComponentVariantType;
  state: ButtonState;
  css?: { [x: string]: any };
}

export const StyledButton = styled.button<ButtonProps>`
  width: 96px;
  height: 42px;
  border-radius: 6px;
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  font-weight: 700;
  transition: all 100ms ease-in-out;
  ${(props) => {
    if (props.type) {
      const { hover, ...restStyles } = getButtonStyles(theme)[props.type][props.state];
      const styleHover: { [key: string]: string | number } = typeof hover === 'object' ? hover : {};
      console.log(props.css);
      return `
      ${jsToCss(restStyles)}
      &:hover {
        ${hover ? jsToCss(styleHover) : ''}
      }
      `;
    }
  }}
  ${({ css }) => css && jsToCss(css)};
`;
