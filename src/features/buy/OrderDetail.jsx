import styled from "styled-components";
import { devicesMax } from "../../styles/breakpoint";
import Modal from "../../ui/Modal";
import { Link, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
// import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";
import { useCreatePayment } from "../payment/useCreatePayment";
import { getCurrentBuy } from "../../services/apibuy";
import Form from "../../ui/Form";
import supabase from "../../services/supabase";
import { updateBuy } from "../../services/apibuy";

const OrderDetails = styled.div`
  flex: 2;
  border-radius: 7px;
  overflow: hidden;
  background-color: var(--color-black-200);

  @media ${devicesMax.lg} {
    width: 100%;
  }
`;
const HeadingBox = styled.div`
  background-color: var(--color-black-950);
  padding: 1rem;
`;
const H4 = styled.h4`
  color: var(--color-white-0);
`;

const DetailBox = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  @media ${devicesMax.md} {
    padding: 1rem;
  }
  @media ${devicesMax.md} {
    padding: 0.5rem;
  }
`;
const TextBox = styled.div`
  background-color: var(--color-litecoin-500);
  width: 80%;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  text-transform: capitalize;

  @media ${devicesMax.md} {
    width: 95%;
  }
  @media ${devicesMax.sm} {
    width: 100%;
  }
`;
const StyledSpan = styled.span`
  /* padding: 1rem; */
  text-transform: capitalize;
  @media ${devicesMax.md} {
    width: 100%;
  }
`;
const Ps = styled.p`
  transition: all 0.4s;
`;
const StyledDetail = styled.div`
  width: 80%;
  border-radius: 7px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  box-shadow: var(--shadow-md);
  color: var(--color-green-700);

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-green-100);
  transition: all 0.4s;
  &:hover {
    /* transform: scale(1.3); */
    ${Ps} {
      transform: scale(1.1);
      background-color: var(--color-red-500);
      padding: 0.5rem;
      border-radius: 10px;
    }
  }
  @media ${devicesMax.md} {
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media ${devicesMax.sm} {
    font-size: 1.2rem;
  }
`;

const StyledPay = styled.div`
  background-color: var(--color-doge-500);
  /* width: 70%; */
  margin: 2rem auto;
  text-align: center;
  padding: 1rem;
  border-radius: 20px;
  @media ${devicesMax.md} {
    width: 95%;
  }
`;
const StyledBtn = styled.div`
  margin: 4rem;
  padding: 2rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ToPay = styled.span`
  color: var(--color-white-0);
  background-color: var(--color-black-950);
  padding: 1rem;
  border-radius: 10px;
  margin: 0.5rem;

  transition: all 0.3s;
  display: inline-block;
  &:hover {
    transform: scale(1.5);
  }
`;
const SpanNum = styled.span`
  background-color: var(--color-black-900);
  padding: 1rem;
  border-radius: 100px;
  color: var(--color-white-0);
  transition: all 0.3s;
  display: inline-block;
  &:hover {
    transform: scale(1.5);
  }

  @media ${devicesMax.md} {
    font-size: 1.3rem;
  }
`;
const P = styled.p`
  color: var(--color-red-700);
`;

const Error = styled.p`
  color: var(--color-red-700);
  text-align: center;
`;
const H5 = styled.h5`
  text-align: center;
  text-transform: capitalize;
`;

function OrderDetail({ onPayment }) {
  const [phoneNum, setPhoneNum] = useState("");
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState("");
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const [orderId, setOrderId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const fetchRate = async function () {
      const { data, error } = await supabase
        .from("rate")
        .select("*")
        .eq("currency", "bitcoin");
      if (error) {
        console.log(error);
      }
      const rate = data[0];
      if (rate) setRate(rate.buy);
    };

    fetchRate();
  }, []);

  // useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), []);

  const { orderId: order_id } = useParams();

  const { isLoading, data: buy } = useQuery({
    queryKey: ["buy"],
    queryFn: () => getCurrentBuy(order_id),
  });
  const { createPayment, isCreating } = useCreatePayment();

  // const { user } = useUser();

  if (isLoading) return <Spinner />;

  const { data: currentData } = buy;

  const pay = currentData[0];

  onPayment(pay.payment);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(phoneNum, amount, transaction, account, name, orderId);
    console.log(account);
    if (!phoneNum || !amount || !transaction || !account || !name || !orderId) {
      setError({
        title: "Invalid input",
        message: "Please enter the credentials",
      });
      return;
    }

    createPayment(
      { phoneNum, amount, transaction, account, name, orderId },

      {
        onSettled: () => {
          setPhoneNum("");
          setAmount("");
          setTransaction("");
          setAccount("");
          setName("");
          setOrderId("");
        },
      }
    );
    updateBuy(pay.id, "paid");

    // emailjs
    //   .send(
    //     import.meta.env.VITE_YOUR_SERVICE_ID,
    //     import.meta.env.VITE_YOUR_PAY_TEMPLATE_ID,
    //     {
    //       from_name: user.user_metadata.firstName,
    //       recipient: user.email,
    //       orderId: order_id,
    //       currency: pay.currency,
    //       amountGh: pay.amountGh,
    //       amountUSD: pay.amountUSD,
    //       Payment: pay.payment,
    //       wallet: pay.wallet,
    //       total: pay.totalToPay,
    //       phoneNum,
    //       amount,
    //       transaction,
    //       account,
    //       name,
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
    setIsDisabled(true);
  }
  return (
    <OrderDetails>
      <HeadingBox>
        <H4>Buying preview</H4>
      </HeadingBox>
      {currentData?.map((item) => (
        <DetailBox key={item?.orderId}>
          <TextBox>
            <h5>Thank you for your order!</h5>
            <p>The order confirmation has been sent to your email address.</p>
          </TextBox>
          <StyledDetail>
            <StyledSpan>Order Number: </StyledSpan>
            <Ps>{item?.orderId}</Ps>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Currency: </StyledSpan>
            <Ps>{item?.currency}</Ps>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Amount USD: </StyledSpan>
            <Ps>${item?.amountUSD}</Ps>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Amount Gh: </StyledSpan>
            <Ps>&#8373;{item?.amountGh}</Ps>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Sending fee: </StyledSpan>&#8373;
            <Ps>{(item?.miner * rate).toFixed(2)}</Ps>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>payment Type: </StyledSpan>
            <Ps>{item?.payment}</Ps>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Wallet </StyledSpan>
            <Ps> {item?.wallet}</Ps>
          </StyledDetail>
          <StyledPay>
            Send payment to the Number:
            <SpanNum>
              {item.payment === "Mtn Momo"
                ? "0542011274 Easyworldpc(Merchant)"
                : "G79398 Easyworldpc (Agent)"}
            </SpanNum>
            Total To pay: <ToPay>&#8373;{item?.totalToPay}</ToPay>
          </StyledPay>
          <P>
            Make your order Number {item?.orderId} the reference when you are
            sending the momo payment.
          </P>
          <P>For any other assistance contact 0244388190</P>
        </DetailBox>
      ))}

      <StyledBtn>
        <Link to="/history">
          <Button>Order history</Button>
        </Link>

        <Modal>
          <Modal.Open opens="pay">
            <Button>Add Payment</Button>
          </Modal.Open>
          <Modal.Window name="pay">
            <div>
              <H5>payment for order Id: {order_id}</H5>
              {error && <Error>{error.message}</Error>}
              <Form onSubmit={handleSubmit}>
                <FormRow label="Momo Number">
                  <Input
                    type="tel"
                    onChange={(e) => setPhoneNum(e.target.value)}
                  />
                </FormRow>
                <FormRow label="Momo Name">
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormRow>
                <FormRow label="Account Type">
                  <Select onChange={(e) => setAccount(e.target.value)}>
                    <option selected>select Acc type</option>
                    <option>Merchant</option>
                    <option>Subscriber</option>
                  </Select>
                </FormRow>
                <FormRow label="Amount sent">
                  <Input
                    type="number"
                    step="any"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormRow>
                <FormRow label="Transaction No.">
                  <Input
                    type="number"
                    onChange={(e) => setTransaction(e.target.value)}
                    maxLength="11"
                  />
                </FormRow>
                <FormRow label="Order Id">
                  <Input
                    type="text"
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </FormRow>

                <FormRow>
                  <Button disabled={isDisabled}>
                    {isCreating ? <SpinnerMini /> : "Submit"}
                  </Button>
                </FormRow>
              </Form>
            </div>
          </Modal.Window>
        </Modal>
      </StyledBtn>
    </OrderDetails>
  );
}

export default OrderDetail;
