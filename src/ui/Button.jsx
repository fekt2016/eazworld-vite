import styled, { css } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
}

const variations = {
  primary: css`
    color: var(--color-white-0);
    background-color: var(--color-black-900);
    border-radius: var(--Border-radius-cir);

    &:hover {
      border: 1px solid var(--color-white-0);
    }
  `,
  secondary: css`
    color: var(--color-white-0);
    background: var(--color-black-900);

    &:hover {
      background-color: var(--color-grey-50);
      color: var(--color-black-900);
    }
  `,

  buy: css`
    color: var(--color-white-0);
    background-color: var(--color-primary-300);

    &:hover {
      background-color: var(--color-primary-700);
    }
  `,
  sell: css`
    color: var(--color-white-0);
    background-color: var(--color-black-300);

    &:hover {
      background-color: var(--color-black-950);
    }
  `,
}

const Button = styled.button`
  border: none;
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
  @media ${devicesMax.lg} {
margin-bottom: 2rem ;
  }
`

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
}

export default Button
