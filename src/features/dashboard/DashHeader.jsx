import { styled } from 'styled-components'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  height: 7rem;
`
function DashHeader() {
  return <StyledHeader>header</StyledHeader>
}

export default DashHeader
