/* eslint react/prop-types: 0 */
import { styled } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'
const StyledFormRow = styled.div`
  display: flex;

  gap: 2.4rem;

  padding: 0.5rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  @media ${devicesMax.md} {
    width: 100%;
    flex-direction: column;
  }
`
const Label = styled.label`
  font-weight: 500;
`
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRow
