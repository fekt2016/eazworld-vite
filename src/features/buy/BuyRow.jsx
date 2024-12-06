/* eslint react/prop-types: 0 */
import styled from "styled-components";
import { formatTime } from "../../utils/helpers";
import Table from "../../ui/Table";
import { devicesMax } from "../../styles/breakpoint";
import { Link } from "react-router-dom";
// import { updateBuy } from "../../services/apibuy";

const Status = styled.button`
  background-color: ${(props) =>
    props.status === "add payment" ? "#fcc" : "#25D366"};
  font-size: 1rem;
  padding: 0.4rem;
  font-weight: 600;
  font-family: "Sono";
  text-transform: capitalize;
  color: black;
  border-radius: 100px;
  box-shadow: var(--shadow-md);
  border: none;

  @media ${devicesMax.sm} {
    font-size: 0.4rem;
    padding: 0.2rem;
  }
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
    @media ${devicesMax.sm} {
      transform: scale(1.5);
    }
  }

  @media ${devicesMax.sm} {
    font-size: 0.7rem;
  }
`;

const Buy = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  text-transform: capitalize;
  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  /* @media ${devicesMax.md} {
    display: none;
  } */
`;

const Payment = styled.div`
  /* text-overflow: ellipsis; */
  /* @media ${devicesMax.md} {
    display: none;
  } */

  overflow: hidden;

  &:hover {
    overflow: visible;
  }
`;
const Date = styled.div``;
const BuyId = styled.div`
  text-transform: capitalize;
`;
const Wallet = styled.div`
  transition: all 0.4s;
  overflow: hidden;

  &:hover {
    overflow: visible;
  }
`;

function BuyRow({ buy }) {
  const {
    created_at: date,
    orderId: buyId,
    amountUSD,
    amountGh,
    currency,
    totalToPay,
    wallet,
    payment,
    status,
  } = buy;

  return (
    <>
      <Table.Row type="row">
        <Date>{formatTime(date)}</Date>
        <BuyId>
          <Link to={`/currentOrder/${buyId}`}>{buyId}</Link>
        </BuyId>
        <Buy>{currency}</Buy>
        <Wallet>{wallet}</Wallet>
        <div>&#36;{amountUSD}</div>
        <Price>&#8373;{amountGh}</Price>
        <div>&#8373;{totalToPay}</div>
        <Payment>{payment}</Payment>

        <Status disabled={status === "order completed"} status={status}>
          <Link
            disabled={status === "order completed"}
            to={`/buy-currentOrder/${buyId}`}
          >
            {status}
          </Link>
        </Status>
      </Table.Row>
    </>
  );
}

export default BuyRow;
