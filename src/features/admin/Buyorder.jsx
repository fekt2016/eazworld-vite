// import Spinner from '../../ui/Spinner'
import styled from 'styled-components'

// import { formatDate } from '../../utils/helpers'

// import { useBuyOrder } from './useBuyOrder'

const StyledUl = styled.ul`
  /* display: flex; */
`
const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
`

function Buyorder() {
  // const { data: buy, isLoading } = useBuyOrder()

  // if (isLoading) return <Spinner />
  // console.log(buy)
  return (
    <div>
      <StyledUl>
        <StyledLi>
          <div>12/11/23</div>
          <div>123</div>
          <div>bitcoin</div>
          <div>$100</div>
          <div>1200</div>
          <div>Ew67484</div>
          <div>1206</div>
          <div>add payment</div>
        </StyledLi>
      </StyledUl>
    </div>
  )
}

export default Buyorder
