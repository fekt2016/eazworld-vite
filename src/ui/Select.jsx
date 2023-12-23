/* eslint react/prop-types:0 */
import styled from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

// const StyledSelect = styled.select`
//   font-size: 1.4rem;
//   padding: 0.8rem 1.2rem;
//   border: 1px solid
//     ${(props) =>
//       props.type === 'white'
//         ? 'var(--color-grey-100)'
//         : 'var(--color-grey-300)'};
//   border-radius: var(--border-radius-sm);
//   background-color: var(--color-grey-0);
//   font-weight: 500;
//   box-shadow: var(--shadow-sm);
//   @media ${devicesMax.md} {
//     font-size: 1.2rem;
//     padding: 0.8rem;
//   }
// `

const Select = styled.select`
  flex-basis: 50rem;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  @media ${devicesMax.md} {
    width: 100%;
    flex-basis: auto;
  }
`
// function Select({ options, value, onChange, ...props }) {
//   return (
//     <StyledSelect value={value} {...props} onChange={onChange}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </StyledSelect>
//   )
// }

export default Select
