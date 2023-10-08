import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
function BuyTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="buy-order"
        options={[
          { value: 'all', label: 'All' },
          { value: 'order-completed', label: 'Order Completed' },
          { value: 'add-payment', label: 'Add Payment' },
        ]}
      />
      <SortBy
        options={[
          { value: 'currency-asc', label: 'Sort by currency (A-Z)' },
          { value: 'currency-desc', label: 'Sort by currency (Z-A)' },
          { value: 'AmountUsd-asc', label: 'Sort by amountUsd (low first)' },
          { value: 'AmountUsd-desc', label: 'Sort by amountUsd (high first)' },
          { value: 'AmountGh-asc', label: 'Sort by amountGh (low first)' },
          { value: 'AmountGh-desc', label: 'Sort by amountGh (high first)' },
        ]}
      />
    </TableOperations>
  )
}

export default BuyTableOperations
