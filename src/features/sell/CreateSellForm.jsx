import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useCreateSell } from "./useCreateSell";
import FormRow from "../../ui/FormRow";
import { devicesMax } from "../../styles/breakpoint";
import { useNavigate } from "react-router-dom";
import Select from "../../ui/Select";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useUser } from "../authentication/useUser";
import { randomOrderId } from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";
// import News from "../../ui/News";
import supabase from "../../services/supabase";

const SellContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: stretch;
  // gap: 10px;

  @media ${devicesMax.md} {
    flex-direction: column;
  }
`;

const StyledTerm = styled.div`
  margin-top: 2rem;
  width: 50%;
  text-align: center;
  padding: 1rem;
  align-self: start;
  box-shadow: var(--shadow-sm);
  background-color: var(--color-primary-300);
  border-radius: var(--border-radius-lg);

  @media ${devicesMax.md} {
    width: 100%;
  }
`;
const wallet = import.meta.env.VITE_BITCOIN_WALLET;

function CreateSellForm() {
  const { createSell, isCreating } = useCreateSell();
  const { user } = useUser();
  const [rate, setRate] = useState(0);

  const navigate = useNavigate();
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
      if (rate) setRate(rate.sell);
    };

    fetchRate();
  }, []);

  const { register, control, handleSubmit, reset, setValue, formState } =
    useForm();

  const { errors } = formState;
  useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), []);

  function onSubmit(data) {
    createSell(
      { ...data },
      {
        onSuccess: () => {
          reset();
          navigate(`/sell-currentOrder/${data.orderId}`);
        },
      }
    );
    console.log(user.email);
    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_SELL_TEMPLATE_ID,
        {
          from_name: user.user_metadata.firstName,
          recipient: user.email,
          orderId: data.orderId,
          currency: data.currency,
          amountGh: data.amountGh,
          amountUSD: data.amountUSD,
          Payment: data.payment,
          wallet: data.wallet,
        }
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <SellContainer>
      <Form type="buy" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency" error={errors?.currency?.message}>
          <Select {...register("currency", { required: "select currency" })}>
            <option value="" disabled selected>
              Select Currency
            </option>
            <option>Bitcoin</option>
            <option>USDT</option>
          </Select>
        </FormRow>

        <FormRow label="Amount Usd" error={errors?.amountUSD?.message}>
          <Input
            type="number"
            id="amountUSD"
            {...register("amountUSD", {
              required: "Dollar amount is required",
              valueAsNumber: true,
              onChange: (e) => {
                const cedis = e.target.value * rate;
                if (!isNaN(cedis)) {
                  setValue("amountGh", Math.ceil(cedis));
                }
              },
            })}
          />
        </FormRow>

        <FormRow label="Amount Gh" error={errors?.amountGh?.message}>
          <Input
            autoFocus
            type="number"
            id="amountGh"
            {...register("amountGh", {
              required: "Cedis amount is required",
              valueAsNumber: true,
              onChange: (e) => {
                const dollar = e.target.value / rate;
                if (!isNaN(dollar)) {
                  setValue("amountUSD", dollar.toFixed(2));
                }
              },
            })}
          />
        </FormRow>

        <FormRow label="Payment Method" error={errors?.payment?.message}>
          <Select
            {...register("payment", { required: "payment method required" })}
          >
            <option value="" disabled selected>
              Select Payment Method
            </option>
            <option value="MTN Momo">MTN Momo</option>
            <option value="Vodafone cash">Vodafone cash</option>
            <option value="At Money">At Money</option>
          </Select>
        </FormRow>
        <FormRow label="Payment Number" error={errors?.mobile?.message}>
          <Input
            type="tel"
            id="mobile"
            {...register("mobile", {
              required: "Your mobile number is required",
            })}
          />
        </FormRow>
        <FormRow label="Mobile Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "name on momo is required",
              pattern: {
                value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                message: "check your first and last name",
              },
            })}
          />
        </FormRow>
        <FormRow label="Payment Type" error={errors?.name?.message}>
          <Select
            {...register("paymentType", {
              required: "select account type",
            })}
          >
            <option value="" disabled selected>
              Payment type
            </option>
            <option>Subscriber</option>
            <option>Merchant</option>
          </Select>
        </FormRow>

        <Input
          type="hidden"
          id="status"
          {...register("status")}
          defaultValue={"processing"}
        />

        <Input
          type="hidden"
          id="orderId"
          {...register("orderId")}
          defaultValue={randomOrderId()}
        />

        <Input
          type="hidden"
          id="wallet"
          {...register("wallet")}
          defaultValue={wallet}
        />

        <Input
          type="hidden"
          id="email"
          {...register("email")}
          defaultValue={user?.email}
        />

        <StyledTerm>
          <strong>Selling Terms: </strong>By clicking the order button, you have
          agreed that all information provide are correct and you should be held
          liable detail s submitted
        </StyledTerm>

        <FormRow>
          <Button disabled={isCreating}>
            {isCreating ? <SpinnerMini /> : "Place an Order"}
          </Button>
        </FormRow>
      </Form>
      {/* <News /> */}

      <DevTool control={control} />
    </SellContainer>
  );
}

export default CreateSellForm;
