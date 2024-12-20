import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateSellForm from "../features/sell/CreateSellForm";
import { useState } from "react";
import Modal from "../ui/Modal";

function Sell() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">You are Selling </Heading>
      </Row>
      <Row>
        <CreateSellForm openModal={() => setIsOpenModal(true)} />
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <div>send bitcoin</div>
          </Modal>
        )}
      </Row>
    </>
  );
}

export default Sell;
