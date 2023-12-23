import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import Stat from './Stat'

// import Spinner from './Spinner'
import { useAllBuy } from '../features/buy/useAllBuy'
// import { useAllSell } from '../features/sell/useAllSell'
// import { useSearchParams } from 'react-router-dom'

// import { formatCurrency } from '../../utils/helpers'

function Stats() {
  // const [searchParams] = useSearchParams()
  // console.log(searchParams)

  // const { data: sell, isLoading } = useAllSell()
  const x = useAllBuy()
  console.log(x)
  // const {
  //   data: { buy },
  //   isLoading: buyLoading,
  //   error,
  // } = useAllBuy()

  // if (isLoading) return <Spinner />
  // console.log(count)
  // if (error) return 'An error has occured: ' + error.message
  // const { buy } = data
  // if (isLoading) return <Spinner />

  // const { buy } = data

  // const buyCount = buy.length
  // const sellCount = sell.length

  return (
    <>
      <Stat
        title="buy orders"
        svgColor="#0369a1"
        color="#e0f2fe"
        icon={<HiOutlineBriefcase />}
        // value={count}
      />
      <Stat
        title="sell order"
        svgColor="#15803d"
        color="#dcfce7"
        icon={<HiOutlineBanknotes />}
        // value={sellCount}
      />
      <Stat
        svgColor="#4338ca"
        title="users"
        color="#e0e7ff"
        icon={<HiOutlineCalendarDays />}
        // value={checkins}
      />
      <Stat
        svgColor="#a16207"
        title="user"
        color="#fef9c3"
        icon={<HiOutlineChartBar />}
        // value={Math.round(occupation * 100) + '%'}
      />
    </>
  )
}

export default Stats
