import styled from "styled-components";
import { devicesMax } from "../styles/breakpoint";
import { useParams } from "react-router-dom";
import Button from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getCurrentSell } from "../services/apiSell";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";

const StyledOrder = styled.div`
  // background-color: var(--color-black-200);
  border-radius: 7px;
  overflow: hidden;
`;
const HeadingBox = styled.div`
  background-color: var(--color-black-950);
  padding: 1rem;
  margin: 2rem;

  @media ${devicesMax.md} {
    padding: 0.2rem;
    margin: 1rem;
  }
`;
const H4 = styled.h4`
  color: var(--color-white-0);
  font-family: "Courier New", Courier, monospace;
  text-transform: capitalize;
`;

const DetailBox = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devicesMax.md} {
    padding: 0.5rem;
  }
`;
const TextBox = styled.div`
  background-color: var(--color-litecoin-500);
  width: 50%;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;

  @media ${devicesMax.md} {
    width: 95%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`;
const StyledSpan = styled.span`
  background-color: var(--color-black-950);
  padding: 0.3rem;
  color: var(--color-white-0);
  width: 15rem;
  text-transform: capitalize;
  margin-right: 5rem;

  @media ${devicesMax.md} {
    width: 100%;
    padding: 0.2rem;
  }
`;
const StyledDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  @media ${devicesMax.md} {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.2rem;
  }
`;
const Img = styled.img`
  height: 15rem;
  @media ${devicesMax.md} {
    height: 10rem;
  }
`;

const P = styled.p`
  color: var(--color-red-700);
`;
const Ps = styled.p`
  width: 50%;
  margin: 0 auto;
  background-color: aliceblue;
  border-radius: 10px;
  padding: 1rem;
  @media ${devicesMax.md} {
    width: 90%;
    padding: 0.5rem;
  }
`;
const StyledP = styled.span`
  color: var(--color-bitcoin-900);
`;

function SellCurrentOrder() {
  const { orderId: order_id } = useParams();
  const [value, setValue] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [btcValue, setBtcValue] = useState();
  const [rate, setRate] = useState(0);

  const { data: sell } = useQuery({
    queryKey: ["sell"],
    queryFn: () => getCurrentSell(order_id),
  });

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

  useEffect(() => {
    if (sell) {
      const { data: currentData1 } = sell;
      setCurrentData(currentData1);

      const value = currentData1[0];

      setValue(value.amountUSD);
    }
    async function btcRate() {
      let rate = await fetch(
        `https://blockchain.info/tobtc?currency=USD&value=${value}`
      );
      let data = await rate.json();
      setBtcValue(data);
    }
    btcRate();
  }, [sell, value]);

  const handleCopy = debounce((text) => {
    toast.success(text);
  }, 500);

  return (
    <>
      <StyledOrder>
        <HeadingBox>
          <H4>Selling preview</H4>
        </HeadingBox>
        {currentData?.map((sell) => (
          <DetailBox key={sell?.orderId}>
            <TextBox>
              <h5>Thank you for your order!</h5>
              <p>The order confirmation has been sent to your email address.</p>
            </TextBox>
            <TextBox>
              <p>
                You are selling <StyledP>{sell?.amountUSD}USD</StyledP>
                And will receive <StyledP>{sell?.amountGh}GHS</StyledP> At
                <StyledP>{rate}</StyledP> per <StyledP>1 USD</StyledP>
              </p>
            </TextBox>
            <StyledDetail>
              <StyledSpan>Order Number: </StyledSpan>
              {sell?.orderId}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>SEND Amount</StyledSpan>
              <span style={{ margin: "1rem" }}>{btcValue} BTC</span>
              <CopyToClipboard
                onCopy={() => handleCopy("Amount copied")}
                text={btcValue}
              >
                <Button>Copy Code</Button>
              </CopyToClipboard>
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>to wallet address</StyledSpan>
              <span style={{ margin: "1rem" }}>{sell?.wallet}</span>
              <CopyToClipboard
                onCopy={() => handleCopy("Address copied")}
                text={sell?.wallet}
              >
                <Button>Copy Address</Button>
              </CopyToClipboard>
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Account Type: </StyledSpan>
              {sell?.paymentType}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Phone Number: </StyledSpan>
              {sell?.mobile}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Name: </StyledSpan>
              {sell?.name}
            </StyledDetail>
            <StyledDetail>
              <div>
                <Img src="../../wallet.png" alt="wallet" />
                <P>Scan the address to send </P>
              </div>
            </StyledDetail>
            <Ps>
              Please make sure you provide the right mobile money number and
              name. Also, note that mobile money payments take up to 30 minutes
              to get processed.
            </Ps>
          </DetailBox>
        ))}
      </StyledOrder>
    </>
  );
}

export default SellCurrentOrder;
