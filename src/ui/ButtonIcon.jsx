import styled, { css } from 'styled-components'

const ButtonIcon = styled.button`

  /* background: none; */
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-300);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-black-900);
  }
  ${(props) =>
    props.type === 'slideIconLeft' &&
    css`
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      left: 3rem;
      z-index: 1;
      cursor: pointer;
    `}
  ${(props) =>
    props.type === 'slideIconRight' &&
    css`
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      right: 3rem;
      z-index: 1;
      cursor: pointer;
    `}
    ${(props) =>
      props.type === 'navIcon' &&
      css`
        margin: -6rem;
        background-color: var(--color-black-900);
        z-index: 5000;
      `}
`

export default ButtonIcon
