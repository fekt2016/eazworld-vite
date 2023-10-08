import { styled } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const Input = styled.input`
  border: 1px solid var(--color-gray-300);
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  @media ${devicesMax.lg} {
    width: 100%;
  }
`
export default Input
