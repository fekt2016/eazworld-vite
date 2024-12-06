/*eslint react/prop-types : 0 */
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import emailjs from "@emailjs/browser";
import Select from "../../ui/Select";
import supabase from "../../services/supabase";
import Checkbox from "../../ui/Checkbox";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useCreateBuy } from "../buy/useCreateBuy";
import { devicesMax } from "../../styles/breakpoint";
import { useEffect, useState } from "react";
import { useUser } from "../authentication/useUser";
import { randomOrderId } from "../../utils/helpers";
import { useMiner } from "../miner/useMiner";

import Button from "../../ui/Button";
import TermBox from "../../ui/TermBox";

const BuyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 10px;

  @media ${devicesMax.md} {
    /* padding: 3rem; */
    flex-direction: column;
  }
  @media ${devicesMax.sm} {
    padding: 1rem;
  }
`;

const P = styled.p`
  flex: 2;
`;

function CreateBuyForm() {
  const { createBuy, isCreating } = useCreateBuy();
  const [rate, setRate] = useState(0);
  const { user } = useUser();
  const [isChecked, setIsChecked] = useState(false);
  
  function checkHandler(e) {
    e.preventDefault();
    setIsChecked(e.target.checked);
  }

  const { isLoading, data } = useMiner();

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
      if (rate) setRate(rate.buy);
    };

    fetchRate();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState,
    reset,
    setValue,
    getValues,
  } = useForm();
  const { errors } = formState;
  useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), []);

  function onSubmit(data) {
    if (!isChecked) return;
    createBuy(
      { ...data },
      {
        onSuccess: () => {
          reset();
          navigate(`/buy-currentOrder/${data.orderId}`);
        },
      }
    );
    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_BUY_TEMPLATE_ID,
        {
          from_name: user.user_metadata.firstName,
          recipient: user?.email,
          orderId: data.orderId,
          currency: data.currency,
          amountGh: data.amountGh,
          amountUSD: data.amountUSD,
          Payment: data.payment,
          TotaltoPay: data.totalToPay,
          wallet: data.wallet,
          miner: data.miner,
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
  if (isLoading) return <Spinner />;

  const { normal, priority } = data[0];

  return (
    <BuyContainer>
      <Form type="buy" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency" error={errors?.currency?.message}>
          <Select
            {...register("currency", {
              required: "select currency",
            })}
          >
            <option value="" disabled selected>
              Select Currency
            </option>
            <option>Bitcoin</option>
          </Select>
        </FormRow>
        <FormRow error={errors?.amountUSD?.message} label="AmountUSD">
          <Input
            autoFocus
            type="number"
            step="any"
            min="10"
            id="amountUSD"
            {...register("amountUSD", {
              required: "Dollar amount is required",
              valueAsNumber: true,
              min: 10,
              onChange: (evt) => {
                const miner = getValues("miner") * rate;
                const cedis = evt.target.value * rate;
                const total = cedis + miner;
                if (!isNaN(cedis && total)) {
                  setValue("amountGh", cedis.toFixed(2));
                  setValue("totalToPay", total.toFixed(2));
                }
              },
            })}
          />
        </FormRow>
        <FormRow label="AmountGh" error={errors?.amountGh?.message}>
          <Input
            type="number"
            id="amountGh"
            step="any"
            {...register("amountGh", {
              required: "Cedis amount is required",
              valueAsNumber: true,
              min: 125,
              onChange: (evt) => {
                const dollar = evt.target.value / rate;
                const miner = getValues("miner") * rate;
                const total = dollar + miner;
                if (!isNaN(dollar)) {
                  setValue("amountUSD", dollar.toFixed(2));
                  setValue("totalToPay", total.toFixed(2));
                }
                if (evt.target.value === 0) {
                  setValue("amountUSD", 0);
                }
              },
            })}
          />
        </FormRow>
        <FormRow label="Miner" error={errors?.miner?.message}>
          <Select
            {...register("miner", {
              required: "select miners fee",
              onChange: (evt) => {
                const miner = evt.target.value * rate;
                const cedis = getValues("amountGh");
                const total = miner + cedis;

                if (!isNaN(miner && cedis)) {
                  setValue("totalToPay", total.toFixed(2));
                }
              },
            })}
          >
            <option value="" disabled selected>
              Select Miners fee
            </option>
            <option>{normal}</option>
            <option>{priority}</option>
          </Select>
        </FormRow>
        <FormRow label="TotalTopay">
          <Input
            type="number"
            step="any"
            id="totalToPay"
            {...register("totalToPay", {
              required: "total is required",
            })}
          />
        </FormRow>
        <FormRow label="Payment method" error={errors?.payment?.message}>
          <Select
            {...register("payment", {
              required: "select payment method",
            })}
          >
            <option value="" disabled selected>
              Select Payment Method
            </option>
            <option value="Mtn Momo">MTN Momo</option>
            <option value="Vodafone Cash">Vodafone Cash</option>
          </Select>
        </FormRow>
        <FormRow label="Wallet address" error={errors?.wallet?.message}>
          <Input
            error={errors?.wallet?.message}
            type="text"
            id="wallet"
            {...register("wallet", {
              required: "Wallet address required",
              pattern: {
                value: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/s,
                message: "check your wallet address",
              },
            })}
          />
        </FormRow>

        <Input
          type="hidden"
          id="status"
          {...register("status")}
          defaultValue={"add payment"}
        />

        <Input
          type="hidden"
          id="orderId"
          {...register("orderId")}
          defaultValue={randomOrderId()}
        />

        <Input
          type="hidden"
          id="email"
          {...register("email")}
          defaultValue={user?.email}
        />

        <TermBox>
          <Checkbox onChange={checkHandler} />
          <strong>Buying Terms: </strong>
          <P>
            By clicking the order button, You have agreed that all information
            provide are correct and you should be held liable for payment
            details submitted
          </P>
        </TermBox>
        <FormRow>
          <div>
            {rate === 0 ? (
              ""
            ) : (
              <Button disabled={isCreating}>
                {isCreating ? "Submitting" : "Place an Order"}
              </Button>
            )}
          </div>
        </FormRow>
      </Form>

      <DevTool control={control} />
    </BuyContainer>
  );
}

export default CreateBuyForm;
