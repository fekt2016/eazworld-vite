import { useState } from 'react'
import CreateBuyForm from './CreateBuyForm'
import Modal from '../../ui/Modal'
import Row from '../../ui/Row'
import OrderCompleted from '../../ui/OrderCompleted'

function CompleteBuyOrder() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
      <Row>
        <CreateBuyForm openModal={() => setIsOpenModal(true)} />
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <OrderCompleted />
          </Modal>
        )}
      </Row>
    </>
  )
}

export default CompleteBuyOrder
