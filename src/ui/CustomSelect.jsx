/* eslint react/prop-types: 0 */

import Select, { components } from 'react-select'
import { styled } from 'styled-components'

const StyledSelect = styled(Select)`
  flex: 1;
  font-size: 1.6rem;
  text-transform: capitalize;
  width: 100%;
`
const Img = styled.img`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
`

const Option = (props) => {
  return (
    <components.Option {...props}>
      <Img src={props.data.icon} alt="logo" />
      {props.data.label}
    </components.Option>
  )
}

const CustomSelect = (props) => {
  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>{children}</components.SingleValue>
  )
  return (
    <div>
      <label htmlFor="currency">{props.label}</label>
      <StyledSelect
        Id={props.id}
        options={props.options}
        styles={{
          singleValue: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
          }),
        }}
        components={{
          Option,
          SingleValue,
        }}
      />
    </div>
  )
}

export default CustomSelect
