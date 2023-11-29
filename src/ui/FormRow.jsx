/* eslint react/prop-types: 0 */
import { styled } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'
const StyledFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 1rem;

  /* gap: 2rem; */

  /* &:first-child {
    padding-top: 0;
  } */

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
  width: 15rem;
  margin-bottom: 1rem;
`
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`
const InputBox = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
`

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label>{label}</Label>}
      <InputBox>
        {children}
        <div>{error && <Error>{error}</Error>}</div>
      </InputBox>
    </StyledFormRow>
  )
}

export default FormRow
