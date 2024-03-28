import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

function AdminTableOperations() {
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
          { value: 'currency-asc', label: 'Sort by Currency (A-Z)' },
          { value: 'currency-desc', label: 'Sort by Currency (Z-A)' },
          { value: 'amountUSD-asc', label: 'Sort by AmountUsd (low first)' },
          { value: 'amountUSD-desc', label: 'Sort by AmountUsd (high first)' },
          { value: 'amountGh-asc', label: 'Sort by AmountGh (low first)' },
          { value: 'amountGh-desc', label: 'Sort by AmountGh (high first)' },
        ]}
      />
    </TableOperations>
  )
}

export default AdminTableOperations
