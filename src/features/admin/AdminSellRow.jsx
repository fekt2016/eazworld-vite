/* eslint react/prop-types: 0 */
import styled from "styled-components";
import { formatDate } from "../../utils/helpers";

import Table from "../../ui/Table";
import { devicesMax } from "../../styles/breakpoint";
import { Link } from "react-router-dom";
import { updateSell } from "../../services/apiSell";
// import emailjs from "@emailjs/browser";
import SpinnerMini from "../../ui/SpinnerMini";
import { TiDelete } from "react-icons/ti";
import { useDeleteSell } from "./useDeleteSell";

const Status = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";
  color: white;
  border: none;
  background-color: ${(props) =>
    props.status === "processing" ? "#000" : "#ffc337"};
  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
`;

const Sell = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  text-transform: capitalize;

  @media ${devicesMax.md} {
    font-size: 1.2rem;
    display: none;
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  @media ${devicesMax.md} {
    display: none;
  }
`;

const Date = styled.div``;
const SellId = styled.div`
  /* display: none; */
`;
const DelIcon = styled(TiDelete)`
  font-size: 3rem;
`;
function SellRow({ sell }) {
  const { isDeleting, deleteSell } = useDeleteSell();
  const {
    id,
    created_at: date,
    orderId: sellId,
    currency,
    amountUSD,
    // amountGh,
    mobile,
    status,
    email,
    payment,
    // name,
  } = sell;

  function statusHandler() {
    updateSell(id);
    // emailjs
    //   .send(
    //     import.meta.env.VITE_YOUR_SERVICE_ID,
    //     import.meta.env.VITE_YOUR_SELL_TEMPLATE_ID,
    //     {
    //       recipient: email,
    //       orderId: sellId,
    //       currency: currency,
    //       amountGh: amountGh,
    //       amountUSD: amountUSD,
    //       mobile: mobile,
    //       name: name,
    //     }
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  }

  function handleDelete() {
    deleteSell(id);
  }
  return (
    <>
      <Table.Row columns="repeat(8, 1fr)">
        <Date>{formatDate(date)}</Date>
        <SellId>{sellId}</SellId>
        <Sell>{currency}</Sell>
        <Price>{amountUSD}</Price>
        <Price>{payment}</Price>
        <div>{mobile}</div>
        <div>{email}</div>

        <Status onClick={statusHandler}>
          <Link>{status}</Link>
        </Status>
        {isDeleting ? <SpinnerMini /> : <DelIcon onClick={handleDelete} />}
      </Table.Row>
    </>
  );
}

export default SellRow;
